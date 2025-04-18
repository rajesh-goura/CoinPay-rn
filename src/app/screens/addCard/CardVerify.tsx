import React, { useState, useEffect } from "react";

// React Native components
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Navigation
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { navigate } from "../../navigation/navigationService";

// Icons
import { Ionicons } from "@expo/vector-icons";

// External libraries
import auth from "@react-native-firebase/auth";

// Internal components
import PrimaryButton from "../../components/PrimaryButton";


const CardVerify = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { email, userId } = (route.params as any) || {};
  
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [resendTime, setResendTime] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (email) {
      setIsEmailSent(true);
    }
  }, [email]);

  useEffect(() => {
    if (resendTime > 0) {
      const timer = setTimeout(() => setResendTime(resendTime - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTime]);

  const sendVerificationEmail = async () => {
    try {
      setIsLoading(true);
      const user = auth().currentUser;
      
      if (!user) {
        throw new Error("No authenticated user found");
      }

      await user.sendEmailVerification();
      setIsEmailSent(true);
      setResendTime(30);
      setCanResend(false);
      Alert.alert("Success", "Verification email sent successfully");
    } catch (error: any) {
      console.error("Email verification error:", error);
      Alert.alert("Error", error.message || "Failed to send verification email");
    } finally {
      setIsLoading(false);
    }
  };

  const checkEmailVerified = async () => {
    try {
      setIsLoading(true);
      const user = auth().currentUser;
      
      if (!user) {
        throw new Error("No user logged in");
      }
      
      // Reload user to get latest emailVerified status
      await user.reload();
      
      if (user.emailVerified) {
        Alert.alert("Verified", "Your email has been verified successfully!");
        navigate("CardList");
      } else {
        Alert.alert("Not Verified", "Please verify your email first");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Verification check failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View>
          <Text style={[styles.heading, { color: colors.textPrimary }]}>
            Verify Your Email
          </Text>
          <Text style={[styles.subtext, { color: colors.textSecondary }]}>
            We've sent a verification email to {email}
          </Text>

          {isEmailSent && (
            <Text style={[styles.instructions, { color: colors.textSecondary }]}>
              Please check your inbox and click the verification link. 
              Then return to this app and click "I've Verified".
            </Text>
          )}
        </View>

        <View style={styles.buttonGroup}>
          <PrimaryButton
            onPress={checkEmailVerified}
            text="I've Verified My Email"
            disabled={isLoading}
          />
          
          <View style={styles.resendContainer}>
            <Text style={{ color: colors.textSecondary }}>
              Didn't receive email?{" "}
            </Text>
            {canResend ? (
              <TouchableOpacity onPress={sendVerificationEmail}>
                <Text style={{ color: colors.primary }}>Resend</Text>
              </TouchableOpacity>
            ) : (
              <Text style={{ color: colors.textTertiary }}>
                Resend in {resendTime}s
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    marginBottom: 10,
  },
  instructions: {
    fontSize: 14,
    marginTop: 20,
    lineHeight: 20,
  },
  buttonGroup: {
    marginBottom: 40,
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default CardVerify;