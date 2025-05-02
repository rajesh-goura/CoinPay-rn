import React, { useState } from "react";

// React Native components
import {
  Dimensions,
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
import { CountryPicker } from "react-native-country-codes-picker";
import { useTranslation } from "react-i18next";

// Internal components

import PrimaryButton from "../../components/PrimaryButton";
import Header from "../../components/Header";

// Theme
import { CustomTheme } from "@/src/app/themes/Theme";



const { width: screenWidth } = Dimensions.get("window");
const totalScreens = 13;
const currentScreen = 4;
const progress = currentScreen / totalScreens;

const CountrySelector = () => {
  const { colors, dark } = useTheme() as CustomTheme;
  const navigation = useNavigation();
  const { t } = useTranslation(); 
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [country, setCountry] = useState({
    name: "",
    flag: "",
    code: "",
  });

  const handleCountrySelect = (countryItem: any) => {
    setCountry({
      name: countryItem.name.en,
      flag: countryItem.flag,
      code: countryItem.code,
    });
    setShowCountryPicker(false);
  };

  const handleContinue = () => {
    if (!country.code) {
      alert(t("countrySelector.error")); 
      return;
    }

    // Navigate to next screen with JUST the country name 
    navigate("PersonalInfo", {
      countryName: country.name,
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
            {t("countrySelector.title")} 
          </Text>
          <Text style={[styles.subtext, { color: colors.textSecondary }]}>
            {t("countrySelector.instructions")} 
          </Text>
          <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
            {t("countrySelector.country")} 
          </Text>
          {/* Country Picker */}
          <TouchableOpacity
            style={[
              styles.countryPickerButton,
              {
                borderColor: colors.border,
                backgroundColor: colors.modalBackgroun,
              },
            ]}
            onPress={() => setShowCountryPicker(true)}
          >
            {country.flag ? (
              <View style={styles.countrySelection}>
                <Text style={styles.flagText}>{country.flag}</Text>
                <Text
                  style={[styles.countryName, { color: colors.textPrimary }]}
                >
                  {country.name}
                </Text>
              </View>
            ) : (
              <Text style={[styles.placeholder, { color: colors.textTertiary }]}>
                {t("countrySelector.selectCountry")} 
              </Text>
            )}
            <Ionicons
              name="chevron-down"
              size={20}
              color={colors.textTertiary}
            />
          </TouchableOpacity>
        </View>

        {/* Country Picker Modal */}
        <CountryPicker
          show={showCountryPicker}
          pickerButtonOnPress={handleCountrySelect}
          lang="en"
          style={{
            modal: {
              backgroundColor: colors.modalBackgroun,
            },
            itemsList: {
              backgroundColor: colors.modalBackgroun,
            },
            countryButtonStyles: {
              backgroundColor: colors.modalBackgroun,
            },
            searchMessageText: {
              color: colors.textSecondary,
            },
            textInput: {
              color: colors.textPrimary,
              backgroundColor: colors.modalBackgroun,
              placeholderTextColor: colors.textTertiary,
            } as any,
            countryName: {
              color: colors.textPrimary,
            },
            dialCode: {
              color: colors.textTertiary,
            },
            line: {
              backgroundColor: colors.border,
            },
          }}
          onBackdropPress={() => setShowCountryPicker(false)}
        />

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            onPress={handleContinue}
            text={t("countrySelector.continue")} 
            disabled={!country.code}
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
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 10,
  },
  countryPickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 30,
  },
  countrySelection: {
    flexDirection: "row",
    alignItems: "center",
  },
  flagText: {
    fontSize: 24,
    marginRight: 10,
  },
  countryName: {
    fontSize: 16,
  },
  placeholder: {
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 40,
  },
});

export default CountrySelector;