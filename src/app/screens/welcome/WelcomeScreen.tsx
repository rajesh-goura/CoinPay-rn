import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import PrimaryButton from "../../components/PrimaryButton";
import AnimatedProgressBar from "@/src/app/components/ProgressBar";
import { Ionicons } from "@expo/vector-icons";
import { navigate } from "../../navigation/navigationService";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const totalScreens = 5;
const currentScreen = 1;
const progress = currentScreen / totalScreens;

const Signup = () => {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();

  const item = {
    imageDark: require("@/assets/images/Welcome/dark/welcome.png"),
    imageLight: require("@/assets/images/Welcome/welcome.png"),
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Header: Back Button (Top) & Progress Bar (Below) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <AnimatedProgressBar progress={progress} />
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Image style={styles.img} source={dark ? item.imageDark : item.imageLight} />
        <Text style={[styles.headingtext, { color: colors.textPrimary }]}>
          Congratulations! , Welcome to Coinpay
        </Text>
        <Text style={[styles.subtext, { color: colors.textSecondary }]}>
          We are happy to have you , it's time to send, receive and track your expense
        </Text>

        <PrimaryButton onPress={() => navigate("Login")} text="Continue" />
        

        
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