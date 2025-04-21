import React, { useState, useEffect } from "react";

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
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { navigate } from "../../navigation/navigationService";

// Icons
import { Ionicons } from "@expo/vector-icons";

// Internal components
import Header from "../../components/Header";
import PrimaryButton from "../../components/PrimaryButton";

// Firebase
import auth from "@react-native-firebase/auth";

// Translation
import { useTranslation } from "react-i18next";



const { width: screenWidth } = Dimensions.get("window");
const totalScreens = 13;
const currentScreen = 3;
const progress = currentScreen / totalScreens;

const EmailVerification = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [resendTime, setResendTime] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Get parameters from previous screen
  const { email, password } = (route.params as any) || {};

  // Handle resend verification email
  const handleResend = async () => {
    if (!canResend || !email) return;
    
    try {
      setCanResend(false);
      setResendTime(30);
      setIsLoading(true);
      
      const user = auth().currentUser;
      if (user) {
        await user.sendEmailVerification();
        Alert.alert(t("emailVerification.success"), t("emailVerification.resendSuccess"));
      }
    } catch (error: any) {
      Alert.alert(t("common.error"), t("emailVerification.errors.resendFailed"));
      console.error("Resend verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check email verification status
  const checkVerification = async () => {
    try {
      setIsLoading(true);
      
      const user = auth().currentUser;
      if (!user) {
        Alert.alert(t("common.error"), t("emailVerification.errors.noUser"));
        return;
      }
  
      await user.reload();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (user.emailVerified) {
        navigate("CountrySelector");
      } else {
        Alert.alert(
          t("emailVerification.notVerifiedTitle"),
          t("emailVerification.notVerifiedMessage")
        );
      }
    } catch (error: any) {
      console.error("Verification check error:", error);
      Alert.alert(
        t("common.error"), 
        error.message || t("emailVerification.errors.verificationCheckFailed")
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Resend countdown timer
  useEffect(() => {
    if (resendTime > 0) {
      const timer = setTimeout(() => {
        setResendTime(resendTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTime]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <Header progress={progress}/>

      {/* Content Section */}
      <View style={styles.content}>
        <View>
          <Text style={[styles.heading, { color: colors.textPrimary }]}>
            {t("emailVerification.title")}
          </Text>
          <Text style={[styles.subtext, { color: colors.textSecondary }]}>
            {t("emailVerification.sentEmail", { email })}
          </Text>
          <Text style={[styles.instructions, { color: colors.textSecondary }]}>
            {t("emailVerification.instructions")}
          </Text>

          {/* Resend Verification Email */}
          <View style={styles.resendContainer}>
            <Text style={[styles.resendText, { color: colors.textSecondary }]}>
              {t("emailVerification.didNotReceive")}{" "}
            </Text>
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : canResend ? (
              <TouchableOpacity onPress={handleResend}>
                <Text style={{ color: colors.primary }}>
                  {t("emailVerification.resend")}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={{ color: colors.textTertiary }}>
                {t("emailVerification.resendIn", { seconds: resendTime })}
              </Text>
            )}
          </View>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <PrimaryButton
              onPress={checkVerification}
              text={t("emailVerification.verifiedButton")}
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
    
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: screenWidth < 400 ? 28 : 32,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 30,
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  resendText: {
    fontSize: 14,
  },
  buttonContainer: {
    marginBottom: 40,
  },
});

export default EmailVerification;