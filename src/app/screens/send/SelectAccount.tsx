import React, { useState, useEffect } from "react";

// React Native components
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Navigation
import { useTheme, useFocusEffect } from "@react-navigation/native";
import { navigate } from "../../navigation/navigationService";

// Icons
import { Ionicons, FontAwesome } from "@expo/vector-icons";

// Firebase
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/store";

// Internal components
import PrimaryButton from "../../components/PrimaryButton";
import ActivityIndicator from "../../components/ActivityIndicator";

// Theme
import { CustomTheme } from "../../themes/Theme";

// Translation
import { useTranslation } from "react-i18next";


type Card = {
  id: string;
  lastFour: string;
  type: "visa" | "mastercard" | "amex" | "other";
  name: string;
  expiry: string;
};

const SelectAccount = ({ navigation, route }: any) => {
  const { t } = useTranslation();
  const { colors } = useTheme() as CustomTheme;
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const { recipient, amount, currency, purpose } = route.params;
  const [isProcessing, setIsProcessing] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const fetchCards = async () => {
    try {
      const user = auth().currentUser;
      if (!user) {
        return;
      }

      const cardsSnapshot = await firestore()
        .collection("cards")
        .doc(user.uid)
        .collection("userCards")
        .orderBy("createdAt", "desc")
        .get();

      const cardsData = cardsSnapshot.docs.map((doc) => ({
        id: doc.id,
        lastFour: doc.data().lastFour,
        type: doc.data().type || "other",
        name: doc.data().accountHolderName,
        expiry: doc.data().expiryDate,
      }));

      setCards(cardsData);
    } catch (error) {
      console.error("Error fetching cards:", error);
      Alert.alert(t("common.error"), t("cardList.alerts.loadFailed"));
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCards();
    }, [])
  );

  const handlePay = async () => {
    if (!selectedAccount) return;

    setIsProcessing(true);

    try {
      const user = auth().currentUser;
      if (!user) {
        Alert.alert(t("common.error"), t("selectAccount.errors.notLoggedIn"));
        return;
      }

      const paymentAmount = parseFloat(amount);
      if (isNaN(paymentAmount)) {
        Alert.alert(t("common.error"), t("selectAccount.errors.invalidAmount"));
        return;
      }

      await firestore()
        .collection("users")
        .doc(user.uid)
        .update({
          balance: firestore.FieldValue.increment(-paymentAmount),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      const selectedCard = cards.find((card) => card.id === selectedAccount);

      navigate("PaymentCompleted", {
        recipient,
        amount,
        currency,
        purpose,
        account: {
          type: t(`selectAccount.cardTypes.${selectedCard?.type || 'other'}`),
          number: t('selectAccount.cardNumber', { lastFour: selectedCard?.lastFour }),
          expiry: selectedCard?.expiry,
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert(t("common.error"), t("selectAccount.errors.paymentFailed"));
    } finally {
      setIsProcessing(false);
    }
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return <FontAwesome name="cc-visa" size={24} color={colors.textPrimary} />;
      case "mastercard":
        return <FontAwesome name="cc-mastercard" size={24} color={colors.textPrimary} />;
      case "amex":
        return <FontAwesome name="cc-amex" size={24} color={colors.textPrimary} />;
      default:
        return <FontAwesome name="credit-card" size={24} color={colors.textPrimary} />;
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, {
        backgroundColor: colors.backgroundinApp,
        justifyContent: "center",
        alignItems: "center",
      }]}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundinApp }]}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.heading, { color: colors.textPrimary }]}>
          {t('selectAccount.title')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Recipient Card */}
        <View style={[styles.recipientCard, { backgroundColor: colors.modalBackgroun }]}>
          <Image source={recipient.image} style={styles.recipientImage} />
          <Text style={[styles.recipientName, { color: colors.textPrimary }]}>
            {recipient.name}
          </Text>
          <Text style={[styles.recipientEmail, { color: colors.textSecondary }]}>
            {recipient.email}
          </Text>
        </View>

        {/* Choose Account Text */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          {t('selectAccount.chooseAccount')}
        </Text>

        {/* Account Options */}
        {cards.length === 0 ? (
          <Text style={[styles.noCardsText, { color: colors.textSecondary }]}>
            {t('selectAccount.noCards')}
          </Text>
        ) : (
          cards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.accountItem,
                { backgroundColor: colors.modalBackgroun },
                selectedAccount === card.id && { borderColor: colors.primary },
              ]}
              onPress={() => setSelectedAccount(card.id)}
            >
              <View style={styles.accountLeft}>
                <View style={styles.cardIcon}>{getCardIcon(card.type)}</View>
                <View>
                  <Text style={[styles.accountType, { color: colors.textPrimary }]}>
                    {t(`selectAccount.cardTypes.${card.type}`)} •••• {card.lastFour}
                  </Text>
                  <Text style={[styles.accountNumber, { color: colors.textSecondary }]}>
                    {t('selectAccount.cardDetails', { name: card.name, expiry: card.expiry })}
                  </Text>
                </View>
              </View>
              {selectedAccount === card.id ? (
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
              ) : (
                <View style={[styles.checkbox, { borderColor: colors.border }]} />
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          text={isProcessing ? t('selectAccount.processing') : t('selectAccount.payButton', { amount, currency })}
          onPress={handlePay}
          disabled={!selectedAccount || isProcessing || cards.length === 0}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 16,
  },
  backButton: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Poppins",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  recipientCard: {
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recipientImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  recipientName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "Poppins",
  },
  recipientEmail: {
    fontSize: 14,
    fontFamily: "Poppins",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    fontFamily: "Poppins",
  },
  accountItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  accountLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cardIcon: {
    marginRight: 16,
  },
  accountType: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    fontFamily: "Poppins",
  },
  accountNumber: {
    fontSize: 14,
    fontFamily: "Poppins",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
  noCardsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontFamily: "Poppins",
  },
});

export default SelectAccount;
