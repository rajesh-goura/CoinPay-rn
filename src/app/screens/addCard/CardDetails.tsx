import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native"; 
import { useNavigation, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AnimatedProgressBar from "@/src/app/components/ProgressBar";
import PrimaryButton from "../../components/PrimaryButton";
import { CustomTheme } from "../../themes/Theme";
import { navigate } from "../../navigation/navigationService";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const { width: screenWidth } = Dimensions.get("window");
const totalScreens = 5;
const currentScreen = 4;
const progress = currentScreen / totalScreens;

const CardDetails = () => {
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation();

  // Form state
  const [accountHolderName, setAccountHolderName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setIsEmailValid(validateEmail(text));
  };

  const getCardType = (cardNumber: string) => {
    const cleanedNumber = cardNumber.replace(/\s/g, '');
    
    // Visa
    if (/^4/.test(cleanedNumber)) {
      return "visa";
    }
    // Mastercard
    if (/^5[1-5]/.test(cleanedNumber)) {
      return "mastercard";
    }
    // Amex
    if (/^3[47]/.test(cleanedNumber)) {
      return "amex";
    }
    
    return "other";
  };

  const handleVerify = async () => {
    if (!accountHolderName || !isEmailValid || !cardNumber || !expiryDate || !cvv) {
      alert("Please fill in all fields correctly");
      return;
    }
  
    try {
      setIsLoading(true);
  
      // Check if the user is already signed in
      const existingUser = auth().currentUser;
  
      let userCredential;
      if (!existingUser) {
        // Try to sign in the existing user
        try {
          userCredential = await auth().signInWithEmailAndPassword(email, "temporaryPassword");
        } catch (error: any) {
          if (error.code === 'auth/user-not-found') {
            // If user does not exist, create a new account
            userCredential = await auth().createUserWithEmailAndPassword(email, "temporaryPassword");
            await userCredential.user.sendEmailVerification();
          } else {
            // Other errors
            throw error;
          }
        }
      } else {
        userCredential = { user: existingUser };
      }
  
      // Prepare card data
      const cardData = {
        userId: userCredential.user.uid,
        accountHolderName,
        email,
        cardNumber: cardNumber.replace(/\s/g, ''),
        expiryDate,
        cvv,
        lastFour: cardNumber.slice(-4).replace(/\s/g, ''),
        type: getCardType(cardNumber),
        createdAt: firestore.FieldValue.serverTimestamp(),
      };
  
      // Save the card data to Firestore
      await firestore()
        .collection('cards')
        .doc(userCredential.user.uid)
        .collection('userCards')
        .add(cardData);
  
      // Navigate to the card list or verification screen
      if (userCredential.user.emailVerified) {
        Alert.alert("Success", "Card added successfully!");
        navigate("CardList");
      } else {
        await userCredential.user.sendEmailVerification();
        navigate("CardVerify", {
          email,
          userId: userCredential.user.uid,
        });
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      Alert.alert("Error", error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCardNumber = (text: string) => {
    const cleanedText = text.replace(/\D/g, "");
    const formattedText = cleanedText.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formattedText.slice(0, 19);
  };

  const handleCardNumberChange = (text: string) => {
    const formattedText = formatCardNumber(text);
    setCardNumber(formattedText);
  };

  const formatExpiryDate = (text: string) => {
    const cleanedText = text.replace(/\D/g, "");
    if (cleanedText.length > 2) {
      return `${cleanedText.slice(0, 2)}/${cleanedText.slice(2, 4)}`;
    }
    return cleanedText;
  };

  const handleExpiryDateChange = (text: string) => {
    const formattedText = formatExpiryDate(text);
    setExpiryDate(formattedText);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with Back Button and Progress Bar */}
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <AnimatedProgressBar progress={progress} />
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <View>
          <Text style={[styles.heading, { color: colors.textPrimary }]}>
            Add your card details
          </Text>
          <Text style={[styles.subtext, { color: colors.textSecondary }]}>
            Enter your Card details in the below box
          </Text>

          {/* Account Holder Name Input */}
          <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
            Account Holder Name
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
              placeholder="Name as on card"
              placeholderTextColor={colors.textTertiary}
              value={accountHolderName}
              onChangeText={setAccountHolderName}
              autoCapitalize="words"
            />
          </View>

          {/* Email Input with Mail Icon */}
          <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
            Email
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
              placeholder="Your email"
              placeholderTextColor={colors.textTertiary}
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Card Number Input with Card Icon */}
          <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
            Card Number
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
              placeholder="1234 5678 9012 3456"
              placeholderTextColor={colors.textTertiary}
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              keyboardType="number-pad"
              maxLength={19}
            />
          </View>

          {/* Expiry Date and CVV in Row */}
          <View style={styles.row}>
            {/* Expiry Date */}
            <View style={[styles.halfInputContainer, { marginRight: 10 }]}>
              <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
                MM/YY
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
                  placeholder="MM/YY"
                  placeholderTextColor={colors.textTertiary}
                  value={expiryDate}
                  onChangeText={handleExpiryDateChange}
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>
            </View>

            {/* CVV */}
            <View style={styles.halfInputContainer}>
              <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
                CVV
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
                  placeholder="123"
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

        {/* Verify Button */}
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <PrimaryButton
              onPress={handleVerify}
              text="Verify"
              disabled={
                !accountHolderName || !email || !cardNumber || !expiryDate || !cvv
              }
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
  inputField: {
    width: "100%",
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
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