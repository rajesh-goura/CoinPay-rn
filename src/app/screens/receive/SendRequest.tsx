import React from "react";

// React Native components
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Navigation
import { useTheme } from "@react-navigation/native";
import { navigate } from "../../navigation/navigationService";

// Icons
import { Ionicons } from "@expo/vector-icons";

// Internal components
import PrimaryButton from "../../components/PrimaryButton";

// Theme
import { CustomTheme } from "../../themes/Theme";


const { height } = Dimensions.get("window");

const SendRequest = ({ navigation, route }: any) => {
  const { colors } = useTheme() as CustomTheme;
  const { recipient, amount, currency, purpose } = route.params;

  const handleConfirmRequest = () => {
    // Handle the request confirmation logic here
    navigate("MainApp", {
      recipient,
      amount,
      currency,
      purpose,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundinApp }]}>
      {/* Header Section - Same as SendAmount */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.heading, { color: colors.textPrimary }]}>
          Confirm Request
        </Text>
        <Text style={[styles.subtext, { color: colors.textSecondary }]}>
          Review your request details
        </Text>
      </View>

      {/* Main Content */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Recipient Modal Card */}
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: colors.modalBackgroun,
                marginTop: height * 0.05,
                paddingVertical: 20,
              },
            ]}
          >
            {/* Recipient Info */}
            <Image source={recipient.image} style={styles.recipientImage} />
            <Text style={[styles.recipientName, { color: colors.textPrimary }]}>
              {recipient.name}
            </Text>
            <Text
              style={[styles.recipientEmail, { color: colors.textSecondary }]}
            >
              {recipient.email}
            </Text>

            {/* Request Details */}
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                  Amount
                </Text>
                <Text style={[styles.detailValue, { color: colors.textPrimary }]}>
                  {currency} {amount}
                </Text>
              </View>

              {purpose && (
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                    Purpose
                  </Text>
                  <Text style={[styles.detailValue, { color: colors.textPrimary }]}>
                    {purpose}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Fixed Request Button at Bottom */}
      <View style={[styles.buttonContainer, { backgroundColor: colors.backgroundinApp }]}>
        <PrimaryButton
          text={`Request ${amount} ${currency}`}
          onPress={handleConfirmRequest}
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
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    marginBottom: 6,
  },
  backButton: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
    fontFamily: "Poppins",
    textAlign: "left",
  },
  subtext: {
    fontSize: 14,
    marginBottom: 0,
    fontFamily: "Poppins",
    textAlign: "left",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  modalCard: {
    borderRadius: 20,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  recipientImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  recipientName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  recipientEmail: {
    fontSize: 14,
    marginBottom: 24,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  detailsContainer: {
    width: "100%",
    marginTop: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 8,
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
  buttonContainer: {
    width: "100%",
    alignSelf: "center",
    paddingBottom: Platform.OS === "ios" ? 20 : 20,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
});

export default SendRequest;