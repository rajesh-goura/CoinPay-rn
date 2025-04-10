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

const ConfirmPhone = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [resendTime, setResendTime] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<any>(null);

  // Get parameters from previous screen
  const { phoneNumber, password, confirmation: routeConfirmation } = (route.params as any) || {};
  
  // Store the confirmation object
  useEffect(() => {
    if (routeConfirmation) {
      setConfirmation(routeConfirmation);
    }
  }, [routeConfirmation]);

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // If pasting a code
      const newOtp = value.split("").slice(0, 6);
      setOtp(newOtp.concat(Array(6 - newOtp.length).fill("")))
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      // @ts-ignore - we'll need to get the refs properly in a real implementation
      otpInputs[index + 1]?.focus();
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    if (!canResend || !phoneNumber) return;
    
    try {
      setCanResend(false);
      setResendTime(30);
      setIsLoading(true);
      
      const newConfirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirmation(newConfirmation);
      Alert.alert("Success", "New OTP has been sent");
    } catch (error: any) {
      Alert.alert("Error", "Failed to resend OTP. Please try again.");
      console.error("Resend OTP error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Verify the OTP code
  const verifyOtp = async () => {
    if (!confirmation) {
      Alert.alert("Error", "Confirmation object is missing");
      return;
    }

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsLoading(true);
      
      // Verify the OTP with Firebase
      const credential = await confirmation.confirm(otpCode);
      
      if (credential.user) {
        // OTP verification successful
        Alert.alert("Success", "Phone number verified!");
        
        // Navigate to the next screen (e.g., profile setup)
        navigate("CountrySelector");
      }
    } catch (error: any) {
      console.error("OTP Verification Error:", error);
      let errorMessage = "OTP verification failed";
      
      if (error.code === "auth/invalid-verification-code") {
        errorMessage = "Invalid OTP code. Please try again.";
      } else if (error.code === "auth/session-expired") {
        errorMessage = "OTP session expired. Please request a new OTP.";
      }
      
      Alert.alert("Error", errorMessage);
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

  // Check if OTP is complete (all 6 digits entered)
  const isOtpComplete = otp.every((digit) => digit !== "");

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
            Confirm your phone
          </Text>
          <Text style={[styles.subtext, { color: colors.textSecondary }]}>
            We sent a 6 digit code to {phoneNumber}
          </Text>

          {/* OTP Input */}
          <View style={styles.otpContainer}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (otpInputs[index] = ref)}
                  style={[
                    styles.otpInput,
                    {
                      borderColor: colors.border,
                      color: colors.textPrimary,
                      backgroundColor: colors.card,
                    },
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={otp[index]}
                  onChangeText={(value) => handleOtpChange(index, value)}
                  onKeyPress={({ nativeEvent }) => {
                    if (
                      nativeEvent.key === "Backspace" &&
                      !otp[index] &&
                      index > 0
                    ) {
                      // @ts-ignore
                      otpInputs[index - 1]?.focus();
                    }
                  }}
                />
              ))}
          </View>

          {/* Resend OTP */}
          <View style={styles.resendContainer}>
            <Text style={[styles.resendText, { color: colors.textSecondary }]}>
              Didn't get OTP?{" "}
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
              onPress={verifyOtp}
              text="Verify Your Number"
              disabled={!isOtpComplete}
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
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
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
  const otpInputs = Array(6).fill(null);

  export default ConfirmPhone;