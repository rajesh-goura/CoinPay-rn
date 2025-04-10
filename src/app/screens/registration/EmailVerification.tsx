import React, { useState, useEffect } from "react";
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
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AnimatedProgressBar from "@/src/app/components/ProgressBar";
import PrimaryButton from "../../components/PrimaryButton";
import auth from "@react-native-firebase/auth";
import { navigate } from "../../navigation/navigationService";

const { width: screenWidth } = Dimensions.get("window");
const totalScreens = 5;
const currentScreen = 3;
const progress = currentScreen / totalScreens;

const EmailVerification = () => {
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
        Alert.alert("Success", "Verification email has been resent");
      }
    } catch (error: any) {
      Alert.alert("Error", "Failed to resend verification email. Please try again.");
      console.error("Resend verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check email verification status
  const checkVerification = async () => {
    try {
      setIsLoading(true);
      
      // Reload user to get latest verification status
      const user = auth().currentUser;
      if (user) {
        await user.reload();
        
        if (user.emailVerified) {
          // Email is verified, navigate to next screen
          navigate("CountrySelector");
          return;
        } else {
          Alert.alert("Email Not Verified", "Please verify your email before continuing.");
        }
      }
    } catch (error: any) {
      console.error("Verification check error:", error);
      Alert.alert("Error", "Failed to check verification status. Please try again.");
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
      <View style={styles.header}>
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
            Verify your email
          </Text>
          <Text style={[styles.subtext, { color: colors.textSecondary }]}>
            We sent a verification email to {email}
          </Text>
          <Text style={[styles.instructions, { color: colors.textSecondary }]}>
            Please check your inbox and click the verification link to continue.
          </Text>

          {/* Resend Verification Email */}
          <View style={styles.resendContainer}>
            <Text style={[styles.resendText, { color: colors.textSecondary }]}>
              Didn't receive email?{" "}
            </Text>
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : canResend ? (
              <TouchableOpacity onPress={handleResend}>
                <Text style={{ color: colors.primary }}>Resend</Text>
              </TouchableOpacity>
            ) : (
              <Text style={{ color: colors.textTertiary }}>
                Resend in {resendTime}s
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
              text="I've Verified My Email"
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
  header: {
    marginBottom: 20,
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