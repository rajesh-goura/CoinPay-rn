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

// External libraries
import { useTranslation } from "react-i18next";

// Internal components
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const AddCard = () => {
  const { t } = useTranslation();
  const { colors, dark } = useTheme();
  const navigation = useNavigation();

  const item = {
    imageDark: require("@/assets/images/AddCard/dark/addCard1.png"),
    imageLight: require("@/assets/images/AddCard/addCard1.png"),
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header: Back Button (Top) */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Image
          style={styles.img}
          source={dark ? item.imageDark : item.imageLight}
        />
        <Text style={[styles.headingtext, { color: colors.textPrimary }]}>
          {t("addCard.title")}
        </Text>
        <Text style={[styles.subtext, { color: colors.textSecondary }]}>
          {t("addCard.subtitle")}
        </Text>

        <PrimaryButton
          onPress={() => navigate("CardDetails")}
          text={t("addCard.addButton")}
        />
        <SecondaryButton 
          onPress={() => navigate("MainApp")} 
          text={t("addCard.homeButton")}
        />
      </View>
    </View>
  );
};

export default AddCard;

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
