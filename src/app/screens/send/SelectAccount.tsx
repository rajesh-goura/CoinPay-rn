import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  
} from "react-native";
import { useTheme, useFocusEffect } from "@react-navigation/native";
import { CustomTheme } from "../../themes/Theme";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import PrimaryButton from "../../components/PrimaryButton";
import { navigate } from "../../navigation/navigationService";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import ActivityIndicator from "../../components/ActivityIndicator";

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

  // Mock data for recipient (you can replace with actual data from route.params)
  const recipientData = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: require("@/assets/images/user.png"),
  };

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
      Alert.alert(t("cardList.alerts.error"), t("cardList.alerts.loadFailed"));
    } finally {
      
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
        Alert.alert("Error", "You must be logged in to make payments");
        return;
      }

      // Convert amount to number
      const paymentAmount = parseFloat(amount);
      if (isNaN(paymentAmount)) {
        Alert.alert("Error", "Invalid amount");
        return;
      }

      // Deduct amount from user's balance in Firestore
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
          type:
            selectedCard?.type === "visa"
              ? "Visa"
              : selectedCard?.type === "mastercard"
              ? "Mastercard"
              : selectedCard?.type === "amex"
              ? "Amex"
              : "Card",
          number: `•••• •••• •••• ${selectedCard?.lastFour}`,
          expiry: selectedCard?.expiry,
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert("Error", "Failed to process payment");
    } finally {
      setIsProcessing(false);
    }
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return (
          <FontAwesome name="cc-visa" size={24} color={colors.textPrimary} />
        );
      case "mastercard":
        return (
          <FontAwesome
            name="cc-mastercard"
            size={24}
            color={colors.textPrimary}
          />
        );
      case "amex":
        return (
          <FontAwesome name="cc-amex" size={24} color={colors.textPrimary} />
        );
      default:
        return (
          <FontAwesome
            name="credit-card"
            size={24}
            color={colors.textPrimary}
          />
        );
    }
  };

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator  />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.heading, { color: colors.textPrimary }]}>
          Select Account
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Recipient Card */}
        <View
          style={[
            styles.recipientCard,
            { backgroundColor: colors.modalBackgroun },
          ]}
        >
          <Image source={recipient.image} style={styles.recipientImage} />
          <Text style={[styles.recipientName, { color: colors.textPrimary }]}>
            {recipient.name}
          </Text>
          <Text
            style={[styles.recipientEmail, { color: colors.textSecondary }]}
          >
            {recipient.email}
          </Text>
        </View>

        {/* Choose Account Text */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Choose Account
        </Text>

        {/* Account Options */}
        {cards.length === 0 ? (
          <Text style={[styles.noCardsText, { color: colors.textSecondary }]}>
            No cards available. Please add a card first.
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
                  <Text
                    style={[styles.accountType, { color: colors.textPrimary }]}
                  >
                    {card.type === "visa"
                      ? "Visa"
                      : card.type === "mastercard"
                      ? "Mastercard"
                      : card.type === "amex"
                      ? "Amex"
                      : "Card"}{" "}
                    •••• {card.lastFour}
                  </Text>
                  <Text
                    style={[
                      styles.accountNumber,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {card.name} • Expires {card.expiry}
                  </Text>
                </View>
              </View>
              {selectedAccount === card.id ? (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={colors.primary}
                />
              ) : (
                <View
                  style={[styles.checkbox, { borderColor: colors.border }]}
                />
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          text={isProcessing ? "Processing..." : `Pay ${currency} ${amount}`}
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
