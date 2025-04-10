import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../../components/PrimaryButton";
import { CountryPicker } from "react-native-country-codes-picker";
import SecondaryButton from "../../components/SecondaryButton";
import { LogBox } from "react-native";
import { navigate } from "../../navigation/navigationService";
import auth from '@react-native-firebase/auth'

LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
]);

const { width: screenWidth } = Dimensions.get("window");

const Login = () => {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [callingCode, setCallingCode] = useState("+1");
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (phoneNumber.trim() === "") {
      Alert.alert("Error", "Please enter a valid phone number.");
      return;
    }
    if (password.trim() === "") {
      Alert.alert("Error", "Please enter your password.");
      return;
    }
    
    // Here you would typically verify credentials with your backend
    // For now, we'll simulate a successful login
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("AddCard"); // Replace "Home" with your actual next screen name
    }, 1500);
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
    navigate("ForgotPassword");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <View>
          <Text style={[styles.heading, { color: colors.textPrimary }]}>
            Log in to Coinpay
          </Text>
          <Text style={[styles.subtext, { color: colors.textSecondary }]}>
            Enter your registered mobile number to Login
          </Text>

          {/* Country Picker & Mobile Number */}
          <View style={styles.inputRow}>
            <TouchableOpacity
              style={[styles.countryPicker, { borderColor: colors.border }]}
              onPress={() => setPickerVisible(true)}
            >
              <Text style={[styles.callingCode, { color: colors.textPrimary }]}>
                {callingCode}
              </Text>
            </TouchableOpacity>

            <TextInput
              style={[
                styles.mobileNumber,
                {
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  backgroundColor: colors.card,
                },
              ]}
              placeholder="Enter your mobile number"
              placeholderTextColor={colors.textTertiary}
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          {/* Country Picker Modal */}
          <CountryPicker
            show={isPickerVisible}
            pickerButtonOnPress={(item) => {
              setCallingCode(item.dial_code);
              setPickerVisible(false);
            }}
            onBackdropPress={() => setPickerVisible(false)}
            lang="en"
          />

          {/* Password Input */}
          <View
            style={[
              styles.passwordContainer,
              {
                borderColor: colors.border,
                backgroundColor: colors.card,
              },
            ]}
          >
            <TextInput
              style={[styles.passwordInput, { color: colors.textPrimary }]}
              placeholder="Enter your password"
              placeholderTextColor={colors.textTertiary}
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={passwordVisible ? "eye" : "eye-off"}
                size={24}
                color={colors.textTertiary}
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity 
            onPress={handleForgotPassword}
            style={styles.forgotPasswordContainer}
          >
            <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <PrimaryButton
              onPress={handleLogin}
              text="Login"
              disabled={!phoneNumber || !password}
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
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  countryPicker: {
    flexDirection: "row",
    alignItems: "center",
    width: "25%",
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
  },
  callingCode: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 5,
  },
  mobileNumber: {
    width: "70%",
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    marginBottom: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  img: {
    width: 140,
    height: 140,
  },
  modalContent: {
    borderBottomWidth: 2,
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalSubtext: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default Login;