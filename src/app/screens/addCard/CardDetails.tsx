// Core React
import React, { useState } from "react";

// React Native Components
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

// Navigation
import { useNavigation, useTheme } from "@react-navigation/native";
import { navigate } from "../../navigation/navigationService";

// Firebase Services
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// Third-party Libraries
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

// Custom Components
import PrimaryButton from "../../components/PrimaryButton";
import ActivityIndicator from "../../components/ActivityIndicator";

// Redux Store
import { useAppDispatch, useAppSelector } from "../../redux/store";

// Theming
import { CustomTheme } from "../../themes/Theme";





const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const CardDetails = () => {
  const { t } = useTranslation();
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation();

  // Get loading state from Redux
  const { isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Form state
  const [accountHolderName, setAccountHolderName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setIsEmailValid(validateEmail(text));
  };

  const getCardType = (cardNumber: string) => {
    const cleanedNumber = cardNumber.replace(/\s/g, "");

    if (/^4/.test(cleanedNumber)) return "visa";
    if (/^5[1-5]/.test(cleanedNumber)) return "mastercard";
    if (/^3[47]/.test(cleanedNumber)) return "amex";
    return "other";
  };

  const handleVerify = async () => {
    if (
      !accountHolderName ||
      !isEmailValid ||
      !cardNumber ||
      !expiryDate ||
      !cvv
    ) {
      alert(t("cardDetails.alerts.fillAllFields"));
      return;
    }

    try {
      const currentUser = auth().currentUser;

      if (!currentUser) {
        Alert.alert(t("cardDetails.alerts.error"), t("cardDetails.alerts.noUser"));
        return;
      }

      const currentUserEmail = currentUser.email;

      if (email === currentUserEmail) {
        await saveCardDetails(currentUser.uid);
        Alert.alert(t("cardDetails.alerts.success"), t("cardDetails.alerts.cardAdded"));
        navigate("CardList");
      } else {
        Alert.alert(t("cardDetails.alerts.emailMismatch"));
      }
    } catch (error: any) {
      console.error("Error:", error);
      Alert.alert(t("cardDetails.alerts.error"), error.message || t("cardDetails.alerts.genericError"));
    }
  };

  const sendVerificationEmail = async (email: string) => {
    try {
      const tempPassword = "temporaryPassword123";
      let userCredential;

      // Check if the email is already registered
      try {
        userCredential = await auth().signInWithEmailAndPassword(
          email,
          tempPassword
        );
      } catch (error: any) {
        if (error.code === "auth/user-not-found") {
          // Create a new account for the provided email
          userCredential = await auth().createUserWithEmailAndPassword(
            email,
            tempPassword
          );
        } else {
          throw error;
        }
      }

      if (!userCredential.user.emailVerified) {
        await userCredential.user.sendEmailVerification();
      }
    } catch (error: any) {
      throw new Error(error.message || "Failed to send verification email");
    }
  };

  const saveCardDetails = async (userId: string) => {
    const cardData = {
      userId,
      accountHolderName,
      email,
      cardNumber: cardNumber.replace(/\s/g, ""),
      expiryDate,
      cvv,
      lastFour: cardNumber.slice(-4).replace(/\s/g, ""),
      type: getCardType(cardNumber),
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    await firestore()
      .collection("cards")
      .doc(userId)
      .collection("userCards")
      .add(cardData);
  };

  const formatCardNumber = (text: string) => {
    const cleanedText = text.replace(/\D/g, "");
    return cleanedText.replace(/(\d{4})(?=\d)/g, "$1 ").slice(0, 19);
  };

  const handleCardNumberChange = (text: string) => {
    setCardNumber(formatCardNumber(text));
  };

  const formatExpiryDate = (text: string) => {
    const cleanedText = text.replace(/\D/g, "");
    return cleanedText.length > 2
      ? `${cleanedText.slice(0, 2)}/${cleanedText.slice(2, 4)}`
      : cleanedText;
  };

  const handleExpiryDateChange = (text: string) => {
    setExpiryDate(formatExpiryDate(text));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View>
            <Text style={[styles.heading, { color: colors.textPrimary }]}>
              {t("cardDetails.title")}
            </Text>
            <Text style={[styles.subtext, { color: colors.textSecondary }]}>
              {t("cardDetails.subtitle")}
            </Text>

            <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
              {t("cardDetails.accountHolderName")}
            </Text>
            <View style={styles.inputWithIconContainer}>
              <Ionicons
                name="person"
                size={24}
                color={colors.textTertiary}
                style={styles.leftInputIcon}
              />
              <TextInput
                style={[
                  styles.inputWithIconField,
                  {
                    borderColor: colors.border,
                    color: colors.textPrimary,
                    backgroundColor: colors.modalBackgroun,
                  },
                ]}
                placeholder={t("cardDetails.placeholders.name")}
                placeholderTextColor={colors.textTertiary}
                value={accountHolderName}
                onChangeText={setAccountHolderName}
                autoCapitalize="words"
              />
            </View>

            <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
              {t("cardDetails.email")}
            </Text>
            <View style={styles.inputWithIconContainer}>
              <MaterialIcons
                name="email"
                size={24}
                color={colors.textTertiary}
                style={styles.leftInputIcon}
              />
              <TextInput
                style={[
                  styles.inputWithIconField,
                  {
                    borderColor: isEmailValid ? colors.border : colors.error,
                    color: colors.textPrimary,
                    backgroundColor: colors.modalBackgroun,
                  },
                ]}
                placeholder={t("cardDetails.placeholders.email")}
                placeholderTextColor={colors.textTertiary}
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
              {t("cardDetails.cardNumber")}
            </Text>
            <View style={styles.inputWithIconContainer}>
              <FontAwesome
                name="credit-card"
                size={24}
                color={colors.textTertiary}
                style={styles.leftInputIcon}
              />
              <TextInput
                style={[
                  styles.inputWithIconField,
                  {
                    borderColor: colors.border,
                    color: colors.textPrimary,
                    backgroundColor: colors.modalBackgroun,
                  },
                ]}
                placeholder={t("cardDetails.placeholders.cardNumber")}
                placeholderTextColor={colors.textTertiary}
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                keyboardType="number-pad"
                maxLength={19}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.halfInputContainer, { marginRight: 10 }]}>
                <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
                  {t("cardDetails.expiryDate")}
                </Text>
                <View style={styles.inputWithIconContainer}>
                  <Ionicons
                    name="calendar"
                    size={20}
                    color={colors.textTertiary}
                    style={styles.leftInputIcon}
                  />
                  <TextInput
                    style={[
                      styles.inputWithIconField,
                      {
                        borderColor: colors.border,
                        color: colors.textPrimary,
                        backgroundColor: colors.modalBackgroun,
                      },
                    ]}
                    placeholder={t("cardDetails.placeholders.expiryDate")}
                    placeholderTextColor={colors.textTertiary}
                    value={expiryDate}
                    onChangeText={handleExpiryDateChange}
                    keyboardType="number-pad"
                    maxLength={5}
                  />
                </View>
              </View>

              <View style={styles.halfInputContainer}>
                <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
                  {t("cardDetails.cvv")}
                </Text>
                <View style={styles.inputWithIconContainer}>
                  <Ionicons
                    name="lock-closed"
                    size={20}
                    color={colors.textTertiary}
                    style={styles.leftInputIcon}
                  />
                  <TextInput
                    style={[
                      styles.inputWithIconField,
                      {
                        borderColor: colors.border,
                        color: colors.textPrimary,
                        backgroundColor: colors.modalBackgroun,
                      },
                    ]}
                    placeholder={t("cardDetails.placeholders.cvv")}
                    placeholderTextColor={colors.textTertiary}
                    value={cvv}
                    onChangeText={(text) => setCvv(text.replace(/[^0-9]/g, ""))}
                    keyboardType="number-pad"
                    maxLength={4}
                    secureTextEntry={true}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator  />
            ) : (
              <PrimaryButton
                onPress={handleVerify}
                text={t("cardDetails.verifyButton")}
                disabled={
                  !accountHolderName ||
                  !email ||
                  !cardNumber ||
                  !expiryDate ||
                  !cvv
                }
              />
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  progressContainer: {
    width: "100%",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 20,
    minHeight: screenHeight * 0.7,
  },
  heading: {
    fontSize: screenWidth < 400 ? 28 : 32,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    marginBottom: 25,
  },
  subtext1: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 10,
  },
  inputWithIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  inputWithIconField: {
    flex: 1,
    padding: 15,
    paddingLeft: 50,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  leftInputIcon: {
    position: "absolute",
    left: 15,
    zIndex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInputContainer: {
    flex: 1,
  },
  buttonContainer: {
    marginBottom: 40,
  },
});

export default CardDetails;