import React, { useState } from "react";

// React Native components
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// Internal components

import PrimaryButton from "../../components/PrimaryButton";
import Header from "../../components/Header";

// Theme
import { CustomTheme } from "../../themes/Theme";



type HomeAddressRouteParams = {
  countryName: string;
  personalInfo: {
    fullName: string;
    username: string;
    dateOfBirth: string;
  };
  email: string;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const totalScreens = 13;
const currentScreen = 7;
const progress = currentScreen / totalScreens;

const HomeAddress = () => {
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: HomeAddressRouteParams }, "params">>();
  const { t } = useTranslation(); // Use translation hook

  const { countryName, personalInfo, email } = route.params;

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!address || !city || !postCode) {
      Alert.alert(t("homeAddress.error.title"), t("homeAddress.error.message"));
      return;
    }

    const currentUser = auth().currentUser;

    if (!currentUser) {
      Alert.alert(t("homeAddress.error.title"), t("homeAddress.error.authError"));
      return;
    }

    setIsSubmitting(true);

    try {
      const userData = {
        country: countryName,
        personalInfo: {
          ...personalInfo,
          email,
        },
        address: {
          street: address,
          city,
          postCode,
        },
        balance:0,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };

      await firestore()
        .collection("users")
        .doc(currentUser.uid)
        .set(userData, { merge: true });

      navigate("ScanId");
    } catch (error) {
      console.error("Error saving user data:", error);
      Alert.alert(t("homeAddress.error.title"), t("homeAddress.error.saveError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header with Back Button and Progress Bar */}
        <Header progress={progress}/>

        {/* Content Section */}
        <View style={styles.content}>
          <View>
            <Text style={[styles.heading, { color: colors.textPrimary }]}>
              {t("homeAddress.title")}
            </Text>
            <Text style={[styles.subtext, { color: colors.textSecondary }]}>
              {t("homeAddress.instructions")}
            </Text>

            {/* Address Line Input */}
            <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
              {t("homeAddress.addressLabel")}
            </Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="location-outline"
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
                placeholder={t("homeAddress.addressPlaceholder")}
                placeholderTextColor={colors.textTertiary}
                value={address}
                onChangeText={setAddress}
                autoCapitalize="words"
              />
            </View>

            {/* City Input */}
            <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
              {t("homeAddress.cityLabel")}
            </Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="business-outline"
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
                placeholder={t("homeAddress.cityPlaceholder")}
                placeholderTextColor={colors.textTertiary}
                value={city}
                onChangeText={setCity}
                autoCapitalize="words"
              />
            </View>

            {/* Post Code Input */}
            <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
              {t("homeAddress.postCodeLabel")}
            </Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="map-outline"
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
                placeholder={t("homeAddress.postCodePlaceholder")}
                placeholderTextColor={colors.textTertiary}
                value={postCode}
                onChangeText={setPostCode}
                autoCapitalize="characters"
                keyboardType="default"
              />
            </View>
          </View>

          {/* Complete Registration Button */}
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={handleSubmit}
              text={isSubmitting ? t("homeAddress.processing") : t("homeAddress.completeRegistration")}
              disabled={!address || !city || !postCode || isSubmitting}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 20,
    minHeight: screenHeight * 0.7,
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    fontWeight: "400",
    marginBottom:10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
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

export default HomeAddress;