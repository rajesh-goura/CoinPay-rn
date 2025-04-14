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
  ActivityIndicator,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AnimatedProgressBar from "@/src/app/components/ProgressBar";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import { LogBox } from "react-native";
import { navigate } from "../../navigation/navigationService";
import auth from "@react-native-firebase/auth";

LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
]);

const { width: screenWidth } = Dimensions.get("window");
const totalScreens = 13;
const currentScreen = 2;
const progress = currentScreen / totalScreens;

const CreateAccount = () => {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Error", "Please enter a password.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password should be at least 6 characters.");
      return;
    }
    setModalVisible(true);
  };

  const createAccount = async () => {
    setIsLoading(true);
    try {
      // Create user with email and password
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      // Send email verification
      await userCredential.user.sendEmailVerification();

      // Navigate to verification screen
      navigate("EmailVerification", {
        email,
        password,
      });
    } catch (error: any) {
      let errorMessage = "Failed to create account";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email address is already in use";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Email address is invalid";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak";
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
      setModalVisible(false);
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
        <View style={styles.progressContainer}>
          <AnimatedProgressBar progress={progress} />
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <View>
          <Text style={[styles.heading, { color: colors.textPrimary }]}>
            Create an Account
          </Text>
          <Text style={[styles.subtext, { color: colors.textSecondary }]}>
            Enter your email and password to create your account
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
        </View>

        {/* Sign Up Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            onPress={handleSignUp}
            text="Sign up"
            disabled={!email || !password || password.length < 6}
          />
        </View>
      </View>

      {/* Modal for Email Verification */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: colors.modalBackgroun,
                borderColor: colors.primary,
              },
            ]}
          >
            <Image
              style={styles.img}
              source={
                dark
                  ? require("@/assets/images/Registration/dark/register2.png")
                  : require("@/assets/images/Registration/register2.png")
              }
            />
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
              Verify your email address
            </Text>
            <Text
              style={[styles.modalSubtext, { color: colors.textSecondary }]}
            >
              Is this correct? {email}
            </Text>

            {/* "Yes" Button */}
            {isLoading ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : (
              <>
                <PrimaryButton
                  onPress={createAccount}
                  text="Yes, send verification email"
                />
                <SecondaryButton
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  text="No, edit email"
                />
              </>
            )}
          </View>
        </View>
      </Modal>
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
    marginBottom: 30,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
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

export default CreateAccount;
