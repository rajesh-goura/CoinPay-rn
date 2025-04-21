// React & React Native core
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  LogBox,
} from "react-native";

// Navigation
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";

// UI Components & Icons
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../../components/PrimaryButton";
import ActivityIndicator from "../../components/ActivityIndicator";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/store";

// Firebase
import auth from '@react-native-firebase/auth';

LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
]);

const { width: screenWidth } = Dimensions.get("window");

const ForgotPassword = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [email, setEmail] = useState("");

  // Get loading state from Redux
  const { isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert(
        "Email Sent",
        "A password reset link has been sent to your email address. Please check your inbox.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error: any) {
      let errorMessage = "Failed to send reset email";
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email address";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address format";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many attempts. Please try again later.";
      }
      
      Alert.alert("Error", errorMessage);
    }
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
            Reset Password
          </Text>
          <Text style={[styles.subtext, { color: colors.textSecondary }]}>
            Enter your email address to receive a password reset link
          </Text>

          {/* Email Input */}
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
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          {isLoading ? ( 
            <ActivityIndicator />
          ) : (
            <PrimaryButton
              onPress={handleResetPassword}
              text="Send Reset Link"
              disabled={!email}
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
  input: {
    width: "100%",
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 40,
  },
});

export default ForgotPassword;