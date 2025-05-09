// Core React
import React, { useEffect, useState } from "react";

// React Native Components
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Third-Party Libraries
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

// Navigation & Theming
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../themes/Theme";
import { navigate } from "../../navigation/navigationService";

// Custom Components
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";

// Firebase imports
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const PaymentCompleted = ({ navigation, route }: any) => {
  const { colors } = useTheme() as CustomTheme;
  const { t } = useTranslation();
  const { recipient, amount, currency, purpose, account } = route.params;
  const [recipientData, setRecipientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Get formatted date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Selected account data
  const selectedAccountData = {
    id: account.id,
    type: account.type,
    icon: account.icon,
    number: account.number,
  };

  useEffect(() => {
    const user = auth().currentUser;
    setCurrentUser(user);
  
    const fetchAndUpdateRecipient = async () => {
      try {
        // 1. Fetch recipient data
        const recipientRef = firestore().collection("users").doc(recipient.id);
        const recipientSnap = await recipientRef.get();
  
        if (!recipientSnap.exists) {
          throw new Error("Recipient not found");
        }
  
        const recipientData = recipientSnap.data();
        if (!recipientData) {
          throw new Error("Recipient data is undefined");
        }
        setRecipientData(recipientData);
  
        // 2. Update recipient's balance and record transaction
        setUpdating(true);
        const currentBalance = recipientData?.balance || 0;
        const newBalance = currentBalance + parseFloat(amount);
  
        // Get current timestamp
        const timestamp = new Date();
  
        // Create transaction record for recipient
        const recipientTransaction = {
          amount: parseFloat(amount),
          currency: currency,
          fromUserId: user?.uid,
          fromUserName: user?.displayName || t("common.unknown"),
          purpose: purpose,
          timestamp: timestamp,
          type: "received",
          status: "completed"
        };
  
        // Batch update for atomic operation
        const batch = firestore().batch();
        
        // Update recipient
        batch.update(recipientRef, {
          balance: newBalance,
          updatedAt: firestore.FieldValue.serverTimestamp(),
          received: firestore.FieldValue.arrayUnion(recipientTransaction)
        });
  
        // Update sender if exists
        if (user) {
          const senderRef = firestore().collection("users").doc(user.uid);
          const senderTransaction = {
            amount: parseFloat(amount),
            currency: currency,
            toUserId: recipient.id,
            toUserName: recipient.name,
            purpose: purpose,
            timestamp: timestamp,
            type: "sent",
            status: "completed",
            accountUsed: selectedAccountData.type
          };
  
          batch.update(senderRef, {
            sent: firestore.FieldValue.arrayUnion(senderTransaction)
          });
        }
  
        await batch.commit();
  
      } catch (error) {
        console.error("Error processing payment:", error);
        Alert.alert(
          t("common.error"),
          t("paymentCompleted.errors.transactionFailed")
        );
      } finally {
        setLoading(false);
        setUpdating(false);
      }
    };
  
    fetchAndUpdateRecipient();
  }, [recipient.id, amount]);

  const handleAnotherPayment = () => {
    navigate("SendMoney");
  };

  const handleContactUs = () => {
    Linking.openURL(`mailto:${t("paymentCompleted.contactEmail")}`);
  };

  if (loading || updating || !recipientData) {
    return (
      <View style={[styles.container2, { backgroundColor: colors.backgroundinApp }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textPrimary }]}>
          {updating ? t("paymentCompleted.updating") : t("paymentCompleted.processing")}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundinApp }]}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
      </TouchableOpacity>

      {/* Success Header */}
      <View
        style={[
          styles.successContainer,
          { backgroundColor: colors.modalBackgroun },
        ]}
      >
        <View
          style={[styles.successHeader, { backgroundColor: colors.success }]}
        >
          <Text style={styles.successText}>
            {t("paymentCompleted.successMessage", { date: formattedDate, time: formattedTime })}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Recipient Card */}
        <View
          style={[
            styles.recipientCard,
            { backgroundColor: colors.modalBackgroun },
          ]}
        >
          <Image
            source={
              recipientData.photoURL
                ? { uri: recipientData.photoURL }
                : require("@/assets/images/user.png")
            }
            style={styles.recipientImage}
          />
          <Text style={[styles.recipientName, { color: colors.textPrimary }]}>
            {recipient.name}
          </Text>
          <Text
            style={[styles.recipientEmail, { color: colors.textSecondary }]}
          >
            {recipient.email}
          </Text>
        </View>

        {/* Selected Account */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          {t("paymentCompleted.paymentMethod")}
        </Text>

        <View
          style={[
            styles.accountItem,
            { backgroundColor: colors.modalBackgroun },
          ]}
        >
          <View style={styles.accountLeft}>
            <FontAwesome
              name={selectedAccountData.icon as any}
              size={20}
              color={colors.textPrimary}
              style={styles.accountIcon}
            />
            <View>
              <Text style={[styles.accountType, { color: colors.textPrimary }]}>
                {selectedAccountData.type}
              </Text>
              <Text
                style={[styles.accountNumber, { color: colors.textSecondary }]}
              >
                {selectedAccountData.number}
              </Text>
            </View>
          </View>
          <Ionicons name="checkmark-circle" size={24} color={colors.success} />
        </View>

        {/* Payment Details */}
        <View
          style={[
            styles.paymentDetails,
            { backgroundColor: colors.modalBackgroun },
          ]}
        >
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
              {t("paymentCompleted.amount")}:
            </Text>
            <Text style={[styles.detailValue, { color: colors.textPrimary }]}>
              {currency} {amount}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
              {t("paymentCompleted.purpose")}:
            </Text>
            <Text style={[styles.detailValue, { color: colors.textPrimary }]}>
              {purpose}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Buttons Container */}
      <View style={styles.buttonsContainer}>
        <PrimaryButton
          text={t("paymentCompleted.backToHome")}
          onPress={() => navigate("MainApp")}
        />
        <SecondaryButton
          text={t("paymentCompleted.anotherPayment")}
          onPress={handleAnotherPayment}
        />
        <TouchableOpacity onPress={handleContactUs}>
          <Text style={[styles.contactText, { color: colors.textSecondary }]}>
            {t("paymentCompleted.thankYouMessage")}
            <Text style={{ color: colors.primary }}> {t("paymentCompleted.contactUs")}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  container2:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: "Poppins",
  },
  
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  successContainer: {
    marginHorizontal: 15,
    marginTop: 55,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  successHeader: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  successText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 0,
    fontFamily: "Poppins",
  },
  scrollContent: {
    width: "100%",
    
    paddingHorizontal: 20,
    paddingBottom: 150,
  },
  recipientCard: {
    
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    marginTop: 20,
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
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    fontFamily: "Poppins",
  },
  accountItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  accountLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountIcon: {
    marginRight: 16,
  },
  accountType: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Poppins",
  },
  accountNumber: {
    fontSize: 14,
    fontFamily: "Poppins",
  },
  paymentDetails: {
    borderRadius: 12,
    padding: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: "Poppins",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins",
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
  },
  contactText: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 12,
    fontFamily: "Poppins",
  },
});

export default PaymentCompleted;
