import React, { useState } from "react";

// React Native components
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";

// Internal components

import PrimaryButton from "../../components/PrimaryButton";
import Header from "../../components/Header";

// Theme
import { CustomTheme } from "../../themes/Theme";



type PersonalInfoRouteParams = {
  countryName: string;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const totalScreens = 13;
const currentScreen = 5;
const progress = currentScreen / totalScreens;

const PersonalInfo = () => {
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: PersonalInfoRouteParams }, "params">>();
  const { t } = useTranslation(); 

  const { countryName } = route.params;

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateInput, setDateInput] = useState("");

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDateOfBirth(selectedDate);
      const formattedDate = `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;
      setDateInput(formattedDate);
    }
  };

  const handleManualDateChange = (text: string) => {
    setDateInput(text);
    const dateParts = text.split("/");
    if (dateParts.length === 3) {
      const month = parseInt(dateParts[0], 10);
      const day = parseInt(dateParts[1], 10);
      const year = parseInt(dateParts[2], 10);

      if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
        const date = new Date(year, month - 1, day);
        if (!isNaN(date.getTime())) {
          setDateOfBirth(date);
        }
      }
    }
  };

  const handleCalendarPress = () => {
    setShowDatePicker(true);
    Keyboard.dismiss(); // Dismiss keyboard when calendar is opened
  };

  const handleContinue = () => {
    if (!fullName || !username || !dateOfBirth) {
      alert(t("personalInfo.error")); 
      return;
    }

    const dobISO = dateOfBirth.toISOString();

    navigate("EmailInfo", {
      countryName,
      personalInfo: {
        fullName,
        username,
        dateOfBirth: dobISO,
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
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
              {t("personalInfo.title")} 
            </Text>
            <Text style={[styles.subtext, { color: colors.textSecondary }]}>
              {t("personalInfo.instructions")} 
            </Text>

            {/* Full Name Input */}
            <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
              {t("personalInfo.fullName")}
            </Text>
            <TextInput
              style={[
                styles.inputField,
                {
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  backgroundColor: colors.modalBackgroun,
                },
              ]}
              placeholder={t("personalInfo.fullNamePlaceholder")}
              placeholderTextColor={colors.textTertiary}
              value={fullName}
              onChangeText={setFullName}
            />

            {/* Username Input */}
            <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
              {t("personalInfo.username")}
            </Text>
            <TextInput
              style={[
                styles.inputField,
                {
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  backgroundColor: colors.modalBackgroun,
                },
              ]}
              placeholder={t("personalInfo.usernamePlaceholder")}
              placeholderTextColor={colors.textTertiary}
              value={username}
              onChangeText={setUsername}
            />

            {/* Date of Birth Input */}
            <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
              {t("personalInfo.dateOfBirth")}
            </Text>
            <View style={styles.dateInputRow}>
              <TouchableOpacity
                onPress={handleCalendarPress}
                style={[
                  styles.calendarButton,
                  {
                    backgroundColor: colors.modalBackgroun,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ionicons
                  name="calendar"
                  size={21}
                  color={colors.textTertiary}
                />
              </TouchableOpacity>
              <TextInput
                style={[
                  styles.dateInputField,
                  {
                    borderColor: colors.border,
                    color: colors.textPrimary,
                    backgroundColor: colors.modalBackgroun,
                  },
                ]}
                placeholder={t("personalInfo.dateOfBirthPlaceholder")}
                placeholderTextColor={colors.textTertiary}
                value={dateInput}
                onChangeText={handleManualDateChange}
                keyboardType="number-pad"
              />
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={dateOfBirth || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleDateChange}
                maximumDate={new Date()}
                themeVariant="dark"
              />
            )}
          </View>

          {/* Continue Button */}
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={handleContinue}
              text={t("personalInfo.continue")} 
              disabled={!fullName || !username || !dateOfBirth}
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
    fontWeight:"400",
    marginBottom: 10,
  },
  inputField: {
    width: "100%",
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  dateInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateInputField: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  calendarButton: {
    padding: 15,
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginBottom: 40,
  },
});

export default PersonalInfo;