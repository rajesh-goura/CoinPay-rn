// SelectAccount.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../themes/Theme";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import PrimaryButton from "../../components/PrimaryButton";
import { navigate } from "../../navigation/navigationService";

const SelectAccount = ({ navigation, route }: any) => {
  const { colors } = useTheme() as CustomTheme;
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const { recipient, amount, currency, purpose } = route.params;

  // Mock data for recipient (you can replace with actual data from route.params)
  const recipientData = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: require("@/assets/images/user.png"),
  };

  // Mock data for payment accounts
  const accounts = [
    {
      id: "acc1",
      type: "Credit Card",
      icon: "credit-card",
      number: "**** **** **** 4242",
    },
    {
      id: "acc2",
      type: "Debit Card",
      icon: "credit-card",
      number: "**** **** **** 5555",
    },
    {
      id: "acc3",
      type: "Bank Account",
      icon: "bank",
      number: "**** **** 1234",
    },
  ];

  const handlePay = () => {
    const selectedAccountObj = accounts.find(
      (acc) => acc.id === selectedAccount
    );
    navigate("PaymentCompleted", {
      recipient,
      amount,
      currency,
      purpose,
      account: selectedAccountObj,
    });
  };

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
          <Image source={recipientData.image} style={styles.recipientImage} />
          <Text style={[styles.recipientName, { color: colors.textPrimary }]}>
            {recipientData.name}
          </Text>
          <Text
            style={[styles.recipientEmail, { color: colors.textSecondary }]}
          >
            {recipientData.email}
          </Text>
        </View>

        {/* Choose Account Text */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Choose Account
        </Text>

        {/* Account Options */}
        {accounts.map((account) => (
          <TouchableOpacity
            key={account.id}
            style={[
              styles.accountItem,
              { backgroundColor: colors.modalBackgroun },
              selectedAccount === account.id && { borderColor: colors.primary },
            ]}
            onPress={() => setSelectedAccount(account.id)}
          >
            <View style={styles.accountLeft}>
              <FontAwesome
                name={account.icon as any}
                size={20}
                color={colors.textPrimary}
                style={styles.accountIcon}
              />
              <View>
                <Text
                  style={[styles.accountType, { color: colors.textPrimary }]}
                >
                  {account.type}
                </Text>
                <Text
                  style={[
                    styles.accountNumber,
                    { color: colors.textSecondary },
                  ]}
                >
                  {account.number}
                </Text>
              </View>
            </View>
            {selectedAccount === account.id ? (
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={colors.primary}
              />
            ) : (
              <View style={[styles.checkbox, { borderColor: colors.border }]} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          text={`Pay  ${currency}  ${amount}`}
          onPress={handlePay}
          disabled={!selectedAccount}
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
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  accountLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountIcon: {
    marginRight: 16,
  },
  accountType: {
    fontSize: 14,
    fontWeight: "500",
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
});

export default SelectAccount;
