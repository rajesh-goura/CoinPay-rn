import React from "react";

// React Native components
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Navigation
import { useNavigation, useTheme } from "@react-navigation/native";
import { navigate } from "../../navigation/navigationService";


// External libraries
import { useTranslation } from "react-i18next";

// Internal components

import RoundButton from "../../components/RoundButton";
import Header from "../../components/Header";


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const totalScreens = 13;
const currentScreen = 8;
const progress = currentScreen / totalScreens;

const ScanId = () => {
  const { t } = useTranslation();
  const { colors, dark } = useTheme();
  const navigation = useNavigation();

  const item = {
    imageDark: require("@/assets/images/AccountVerify/dark/accverify1.png"),
    imageLight: require("@/assets/images/AccountVerify/accverify1.png"),
  };

  const handleScanPress = () => {
    console.log("Scan button pressed");
    navigate("DocumentScan");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Header: Back Button (Top) & Progress Bar (Below) */}
     <Header progress={progress} />

      {/* Content Section */}
      <View style={styles.content}>
        <Image style={styles.img} source={dark ? item.imageDark : item.imageLight} />
        <Text style={[styles.headingtext, { color: colors.textPrimary }]}>
          {t("scanId.title")}
        </Text>
        <Text style={[styles.subtext, { color: colors.textSecondary }]}>
          {t("scanId.subtitle")}
        </Text>

        <RoundButton 
          onPress={handleScanPress}
          iconName="qr-code-outline"
          size={32}
          style={{ marginTop: 30 }}
        />
      </View>
    </View>
  );
};


export default ScanId;

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
});
