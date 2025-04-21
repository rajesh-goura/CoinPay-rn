import React, { useState } from "react";

// React Native components
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Navigation
import { useNavigation, useTheme } from "@react-navigation/native";
import { navigate } from "../../navigation/navigationService";

// Icons
import { Ionicons } from "@expo/vector-icons";

// External libraries
import { useTranslation } from "react-i18next"; // Translation hook
import { LogBox } from "react-native";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { login } from "../../redux/slices/authSlice";

// Internal components
import PrimaryButton from "../../components/PrimaryButton";


LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
]);

const { width: screenWidth } = Dimensions.get("window");

const Login = () => {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const { t } = useTranslation(); // Hook for translations

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(t("login.error.title"), t("login.error.emptyFields"));
      return;
    }

    try {
      const result = await dispatch(login({ email, password }));
      if (login.fulfilled.match(result)) {
        navigate("AddCard");
      } else if (login.rejected.match(result)) {
        if (result.payload === "EMAIL_NOT_VERIFIED") {
          Alert.alert(t("login.error.title"), t("login.error.emailNotVerified"));
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleForgotPassword = () => {
    if (!email.trim()) {
      Alert.alert(t("login.error.title"), t("login.error.emptyEmail"));
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
            {t("login.title")}
          </Text>
          <Text style={[styles.subtext, { color: colors.textSecondary }]}>
            {t("login.subtitle")}
          </Text>

          {/* Email Input */}
          <View style={styles.inputLabelContainer}>
            <Text style={[styles.inputLabel, { color: colors.textPrimary }]}>
              {t("login.emailLabel")}
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
              placeholder={t("login.emailPlaceholder")}
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
              {t("login.passwordLabel")}
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
                placeholder={t("login.passwordPlaceholder")}
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
              {t("login.forgotPassword")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <View style={styles.buttonContainer}>
          {authState.isLoading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <PrimaryButton
              onPress={handleLogin}
              text={t("login.loginButton")}
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