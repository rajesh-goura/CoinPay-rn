import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard
} from "react-native";
import { RouteProp, useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AnimatedProgressBar from "@/src/app/components/ProgressBar";
import PrimaryButton from "../../components/PrimaryButton";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { CustomTheme } from "../../themes/Theme";
import { navigate } from "../../navigation/navigationService";

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
  const route = useRoute<RouteProp<{ params: PersonalInfoRouteParams }, 'params'>>();
  
  const { countryName } = route.params;
  
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateInput, setDateInput] = useState("");

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDateOfBirth(selectedDate);
      const formattedDate = `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;
      setDateInput(formattedDate);
    }
  };

  const handleManualDateChange = (text: string) => {
    setDateInput(text);
    const dateParts = text.split('/');
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
      alert("Please fill in all fields");
      return;
    }
    
    const dobISO = dateOfBirth.toISOString();
    
    navigate("EmailInfo", {
      countryName,
      personalInfo: {
        fullName,
        username,
        dateOfBirth: dobISO
      }
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
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            <AnimatedProgressBar progress={progress} />
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <View>
            <Text style={[styles.heading, { color: colors.textPrimary }]}>
              Add your personal info
            </Text>
            <Text style={[styles.subtext, { color: colors.textSecondary }]}>
              This info needs to be accurate with your ID document
            </Text>

            {/* Full Name Input */}
            <Text style={[styles.subtext1, { color: colors.textSecondary }]}>Full Name</Text>
            <TextInput
              style={[
                styles.inputField,
                {
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  backgroundColor: colors.modalBackgroun,
                },
              ]}
              placeholder="Full name"
              placeholderTextColor={colors.textTertiary}
              value={fullName}
              onChangeText={setFullName}
            />

            {/* Username Input */}
            <Text style={[styles.subtext1, { color: colors.textSecondary }]}>Username</Text>
            <TextInput
              style={[
                styles.inputField,
                {
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  backgroundColor: colors.modalBackgroun
                },
              ]}
              placeholder="Username"
              placeholderTextColor={colors.textTertiary}
              value={username}
              onChangeText={setUsername}
            />

            {/* Date of Birth Input */}
            <Text style={[styles.subtext1, { color: colors.textSecondary }]}>Date of Birth</Text>
            <View style={styles.dateInputRow}>
              <TouchableOpacity
                onPress={handleCalendarPress}
                style={[
                  styles.calendarButton,
                  { 
                    backgroundColor: colors.modalBackgroun,
                    borderColor: colors.border,
                    borderRightWidth: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0
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
                    borderLeftWidth: 0,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0
                  },
                ]}
                placeholder="MM/DD/YYYY"
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
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
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
              text="Continue"
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
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  progressContainer: {
    width: "100%",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 20,
    minHeight: screenHeight * 0.7, // Ensure minimum height for smaller screens
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