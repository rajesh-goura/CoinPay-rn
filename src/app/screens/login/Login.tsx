import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../../components/PrimaryButton";
import { LogBox } from "react-native";
import { navigate } from "../../navigation/navigationService";
import auth from "@react-native-firebase/auth";

LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
]);

const { width: screenWidth } = Dimensions.get("window");

const Login = () => {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Error", "Please enter your password.");
      return;
    }

    setIsLoading(true);
    try {
      // Sign in with email and password
      await auth().signInWithEmailAndPassword(email, password);

      // Check if email is verified
      const user = auth().currentUser;
      if (user && !user.emailVerified) {
        Alert.alert(
          "Email Not Verified",
          "Please verify your email before logging in. Check your inbox for the verification email."
        );
        await auth().signOut();
        return;
      }

      // Navigate to main app screen
      navigate("AddCard"); // Replace with your actual home screen
    } catch (error: any) {
      let errorMessage = "Login failed";

      if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "This account has been disabled";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many attempts. Please try again later.";
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email first");
      return;
    }
    navigate("ForgotPassword", { email });
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
            Enter your email and password to login
          </Text>

          {/* Email Input */}
          <View style={styles.inputLabelContainer}>
            <Text style={[styles.inputLabel, { color: colors.textPrimary }]}>
              Email Address
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  backgroundColor: colors.card,
                },
              ]}
              placeholder="Enter your email"
              placeholderTextColor={colors.textTertiary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputLabelContainer}>
            <Text style={[styles.inputLabel, { color: colors.textPrimary }]}>
              Password
            </Text>
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
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.forgotPasswordContainer}
          >
            <Text
              style={[styles.forgotPasswordText, { color: colors.primary }]}
            >
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
              disabled={!email || !password}
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
    marginBottom: 35,
  },
  inputLabelContainer: {
    marginBottom: 0,
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 0,
  },
  input: {
    width: "100%",
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
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
    alignItems: "flex-end",
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "500",
  },
  buttonContainer: {
    marginBottom: 40,
  },
});

export default Login;
