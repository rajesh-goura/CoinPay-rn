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
import Header from "../../components/Header";


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const totalScreens = 13;
const currentScreen = 8;
const progress = currentScreen / totalScreens;

const AccountSetup = () => {
  const { t } = useTranslation();
  const { colors, dark } = useTheme();
  const navigation = useNavigation();

  // Mock states - in a real app these would come from your verification process
  const [phoneVerified, setPhoneVerified] = React.useState(true);
  const [docVerified, setDocVerified] = React.useState(true);
  const [photoVerified, setPhotoVerified] = React.useState(false);
  const [photoUploading, setPhotoUploading] = React.useState(false);

  const item = {
    imageDark: require("@/assets/images/AccountVerify/dark/accverify3.png"),
    imageLight: require("@/assets/images/AccountVerify/accverify3.png"),
  };

  // Simulate photo verification (in real app this would be from Firestore)
  const handlePhotoUpload = () => {
    setPhotoUploading(true);
    setTimeout(() => {
      setPhotoUploading(false);
      setPhotoVerified(true);
    }, 2000);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Header: Back Button (Top) & Progress Bar (Below) */}
      <Header progress={progress}/>

      {/* Content Section */}
      <View style={styles.content}>
        <Image style={styles.img} source={dark ? item.imageDark : item.imageLight} />
        <Text style={[styles.headingtext, { color: colors.textPrimary }]}>
          {t("accountSetup.title")}
        </Text>
        <Text style={[styles.subtext, { color: colors.textSecondary }]}>
          {t("accountSetup.subtitle")}
        </Text>

        {/* Verification Steps */}
        <View style={styles.verificationContainer}>
          {/* Step 1 - Phone Verification */}
          <View style={styles.verificationStep}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <View style={styles.stepRow}>
                <Text style={[styles.stepText, { color: colors.textPrimary }]}>
                  {t("accountSetup.steps.phone")}
                </Text>
                {phoneVerified ? (
                  <View style={styles.verifiedIcon}>
                    <Ionicons name="checkmark" size={20} color="white" />
                  </View>
                ) : (
                  <View style={styles.unverifiedIcon} />
                )}
              </View>
              <View style={[styles.stepDivider, { backgroundColor: colors.border }]} />
            </View>
          </View>

          {/* Step 2 - Document Verification */}
          <View style={styles.verificationStep}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <View style={styles.stepRow}>
                <Text style={[styles.stepText, { color: colors.textPrimary }]}>
                  {t("accountSetup.steps.document")}
                </Text>
                {docVerified ? (
                  <View style={styles.verifiedIcon}>
                    <Ionicons name="checkmark" size={20} color="white" />
                  </View>
                ) : (
                  <View style={styles.unverifiedIcon} />
                )}
              </View>
              <View style={[styles.stepDivider, { backgroundColor: colors.border }]} />
            </View>
          </View>

          {/* Step 3 - Photo Verification */}
          <View style={styles.verificationStep}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <View style={styles.stepRow}>
                <Text style={[styles.stepText, { color: colors.textPrimary }]}>
                  {t("accountSetup.steps.photo")}
                </Text>
                {photoUploading ? (
                  <View style={styles.loadingIcon}>
                    <Ionicons name="refresh" size={20} color="#304FFE" />
                  </View>
                ) : photoVerified ? (
                  <View style={styles.verifiedIcon}>
                    <Ionicons name="checkmark" size={20} color="white" />
                  </View>
                ) : (
                  <TouchableOpacity 
                    style={styles.uploadButton} 
                    onPress={handlePhotoUpload}
                  >
                    <Text style={styles.uploadButtonText}>
                      {t("accountSetup.uploadButton")}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={[styles.stepDivider, { backgroundColor: colors.border }]} />
            </View>
          </View>
        </View>

        <PrimaryButton 
          onPress={() => navigate("pinSetup")} 
          text={t("accountSetup.continueButton")}
          disabled={!phoneVerified || !docVerified || !photoVerified}
        />
      </View>
    </View>
  );
};

export default AccountSetup;

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
    marginTop: 20,
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
  verificationContainer: {
    width: '100%',
    marginBottom: 30,
  },
  verificationStep: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  stepNumberContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#424242',
  },
  stepContent: {
    flex: 1,
  },
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
  },
  stepText: {
    fontSize: 16,
  },
  stepDivider: {
    height: 1,
    marginBottom: 16,
  },
  verifiedIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#304FFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unverifiedIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  loadingIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#304FFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  uploadButtonText: {
    color: 'white',
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