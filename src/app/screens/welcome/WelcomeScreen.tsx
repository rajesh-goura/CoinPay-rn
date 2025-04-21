import React from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import PrimaryButton from "../../components/PrimaryButton";
import Header from "../../components/Header";
import { navigate } from "../../navigation/navigationService";



const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const totalScreens = 13;
const currentScreen = 13;
const progress = currentScreen / totalScreens;

const WelcomeScreen = () => {
  const { t } = useTranslation();
  const { colors, dark } = useTheme();
  const navigation = useNavigation();

  const item = {
    imageDark: require("@/assets/images/Welcome/dark/welcome.png"),
    imageLight: require("@/assets/images/Welcome/welcome.png"),
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Header: Back Button (Top) & Progress Bar (Below) */}
      <Header progress={progress}/>
      {/* Content Section */}
      <View style={styles.content}>
        <Image style={styles.img} source={dark ? item.imageDark : item.imageLight} />
        <Text style={[styles.headingtext, { color: colors.textPrimary }]}>
          {t("welcomeScreen.congratulations")}
        </Text>
        <Text style={[styles.subtext, { color: colors.textSecondary }]}>
          {t("welcomeScreen.welcomeMessage")}
        </Text>

        <PrimaryButton onPress={() => navigate("Login")} text={t("welcomeScreen.continue")} />
      </View>
    </View>
  );
};


export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 100,
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