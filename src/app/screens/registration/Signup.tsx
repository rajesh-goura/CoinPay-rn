import React from "react";

// React Native components
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Navigation
import { useNavigation, useTheme } from "@react-navigation/native";
import { navigate } from "../../navigation/navigationService";

// Icons
import { Ionicons } from "@expo/vector-icons";

// Internal components
import AnimatedProgressBar from "@/src/app/components/ProgressBar";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";

// Translation
import { useTranslation } from "react-i18next";
import Header from "../../components/Header";


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const totalScreens = 13;
const currentScreen = 1;
const progress = currentScreen / totalScreens;

const Signup = () => {
  const { t } = useTranslation();
  const { colors, dark } = useTheme();
  const navigation = useNavigation();

  const item = {
    imageDark: require("@/assets/images/Onboarding/darkmode/Send money abroad.png"),
    imageLight: require("@/assets/images/Registration/register1.png"),
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Header: Back Button (Top) & Progress Bar (Below) */}
      <Header progress={progress}/>

      {/* Content Section */}
      <View style={styles.content}>
        <Image style={styles.img} source={dark ? item.imageDark : item.imageLight} />
        <Text style={[styles.headingtext, { color: colors.textPrimary }]}>
          {t("registration.title")}
        </Text>
        <Text style={[styles.subtext, { color: colors.textSecondary }]}>
          {t("registration.subtitle")}
        </Text>

        <PrimaryButton 
          onPress={() => navigate("CreateAccount")} 
          text={t("registration.signup")} 
        />
        <SecondaryButton 
          onPress={() => navigate("Login")} 
          text={t("registration.login")} 
        />

        <View style={styles.policy}>
          <Text style={[styles.policytext, { color: colors.textSecondary }]}>
            {t("registration.termsAndPolicy", {
              terms: t("registration.terms"),
              privacy: t("registration.privacy")
            })}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  header: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  backButton: {
    marginBottom: 10,
  },
  progressContainer: {
    width: "100%",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 50,
  },
  img: {
    width: screenWidth * 0.7,
    height: screenHeight * 0.3,
    maxWidth: 260,
    maxHeight: 300,
    borderRadius: 12,
    resizeMode: "contain",
    marginBottom: 20,
  },
  headingtext: {
    fontSize: screenWidth < 400 ? 28 : 32,
    textAlign: "center",
    fontWeight: "700",
    marginTop: 20,
    paddingTop:15,
    lineHeight: screenWidth < 400 ? 30 : 40,
  },
  subtext: {
    marginTop: 10,
    marginBottom: 35,
    textAlign: "center",
    fontSize: 14,
  },
  policy: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  policytext: {
    textAlign: "center",
    fontSize: 14,
  },
  link: {
    textDecorationLine: "underline",
  },
});