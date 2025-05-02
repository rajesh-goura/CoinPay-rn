import React, { useState } from "react";

// React Native components
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Navigation
import {
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from "@react-navigation/native";
import { navigate } from "../../navigation/navigationService";

// Icons
import { Ionicons } from "@expo/vector-icons";

// External libraries
import { useTranslation } from "react-i18next";

// Internal components

import PrimaryButton from "../../components/PrimaryButton";
import Header from "../../components/Header";

// Theme
import { CustomTheme } from "../../themes/Theme";



// Define the type for route parameters
type EmailInfoRouteParams = {
  countryName: string;
  personalInfo: {
    fullName: string;
    username: string;
    dateOfBirth: string;
  };
};

const { width: screenWidth } = Dimensions.get("window");
const totalScreens = 13;
const currentScreen = 6;
const progress = currentScreen / totalScreens;

const EmailInfo = () => {
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: EmailInfoRouteParams }, "params">>();
  const { t } = useTranslation(); 

  // Get data from previous screens
  const { countryName, personalInfo } = route.params;

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const validateEmail = (text: string) => {
    setEmail(text);
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(text));
  };

  const handleContinue = () => {
    if (!isValidEmail) {
      alert(t("emailInfo.error")); 
      return;
    }

    // Pass all collected data to next screen
    navigate("HomeAddress", {
      countryName,
      personalInfo,
      email,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with Back Button and Progress Bar */}
     <Header progress={progress}/>

      {/* Content Section */}
      <View style={styles.content}>
        <View>
          <Text style={[styles.heading, { color: colors.textPrimary }]}>
            {t("emailInfo.title")} 
          </Text>
          <Text style={[styles.subtext, { color: colors.textSecondary }]}>
            {t("emailInfo.instructions")} 
          </Text>

          {/* Email Input with Mail Icon */}
          <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
            {t("emailInfo.emailLabel")}
          </Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color={colors.textTertiary}
              style={styles.icon}
            />
            <TextInput
              style={[
                styles.inputField,
                {
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  backgroundColor: colors.modalBackgroun,
                },
              ]}
              placeholder={t("emailInfo.emailPlaceholder")} 
              placeholderTextColor={colors.textTertiary}
              value={email}
              onChangeText={validateEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            onPress={handleContinue}
            text={t("emailInfo.continue")} 
            disabled={!isValidEmail}
          />
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
    marginTop: 20,
    paddingHorizontal: 20,
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
    fontWeight:"400",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  inputField: {
    width: "100%",
    padding: 15,
    paddingLeft: 45,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonContainer: {
    marginBottom: 40,
  },
});

export default EmailInfo;