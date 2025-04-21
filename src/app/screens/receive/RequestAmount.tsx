import React, { useState } from "react";

// React Native components
import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Navigation
import { useTheme } from "@react-navigation/native";
import { navigate } from "../../navigation/navigationService";

// Icons
import { Ionicons } from "@expo/vector-icons";

// Internal components
import PrimaryButton from "../../components/PrimaryButton";

// Theme
import { CustomTheme } from "../../themes/Theme";


const { height } = Dimensions.get("window");

const RequestAmount = ({ navigation, route }: any) => {
  const { colors } = useTheme() as CustomTheme;
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { recipient ,purpose } = route.params;

  const currencies = [
    { code: "USD", name: "US Dollar", flag: "🇺🇸" },
    { code: "EUR", name: "Euro", flag: "🇪🇺" },
    { code: "GBP", name: "British Pound", flag: "🇬🇧" },
    { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
    { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  ];

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardHeight(0)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleContinue = () => {
    navigate("SendRequest", {
      recipient,
      amount,
      currency: selectedCurrency,
      purpose,
    });
  };

  const renderCurrencyItem = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.currencyItem, { backgroundColor: colors.card }]}
      onPress={() => {
        setSelectedCurrency(item.code);
        setShowCurrencyDropdown(false);
      }}
    >
      <Text style={{ fontSize: 16 }}>{item.flag}</Text>
      <Text style={[styles.currencyText, { color: colors.textPrimary }]}>
        {item.code}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.heading, { color: colors.textPrimary }]}>
          Enter Amount
        </Text>
        <Text style={[styles.subtext, { color: colors.textSecondary }]}>
          Enter the amount you want to send
        </Text>
      </View>

      {/* Main Content */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Higher Positioned Modal Card */}
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: colors.modalBackgroun,
                marginTop: height * 0.05, // Higher on screen
                maxHeight: height * 0.4,
                paddingVertical: 20,
              },
            ]}
          >
            {/* Recipient Info */}
            <Image source={recipient.image} style={styles.recipientImage} />
            <Text style={[styles.recipientName, { color: colors.textPrimary }]}>
              {recipient.name}
            </Text>
            <Text
              style={[styles.recipientEmail, { color: colors.textSecondary }]}
            >
              {recipient.email}
            </Text>

            {/* Currency Dropdown */}
            <TouchableOpacity
              style={[
                styles.currencyContainer,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  height: 40,
                },
              ]}
              onPress={() => setShowCurrencyDropdown(true)}
            >
              <Text style={{ fontSize: 16 }}>
                {currencies.find((c) => c.code === selectedCurrency)?.flag}
              </Text>
              <Text
                style={[styles.currencyText, { color: colors.textPrimary }]}
              >
                {selectedCurrency}
              </Text>
              <Ionicons
                name="chevron-down"
                size={16}
                color={colors.textSecondary}
                style={styles.currencyIcon}
              />
            </TouchableOpacity>

            {/* Currency Dropdown Modal */}
            <Modal
              visible={showCurrencyDropdown}
              transparent={true}
              animationType="fade"
            >
              <TouchableOpacity
                style={styles.dropdownOverlay}
                activeOpacity={1}
                onPress={() => setShowCurrencyDropdown(false)}
              >
                <View
                  style={[
                    styles.dropdownContainer,
                    {
                      backgroundColor: colors.modalBackgroun,
                      top: height * 0.35, // Adjusted position
                    },
                  ]}
                >
                  <FlatList
                    data={currencies}
                    renderItem={renderCurrencyItem}
                    keyExtractor={(item) => item.code}
                    scrollEnabled={false}
                    contentContainerStyle={{ padding: 5 }}
                  />
                </View>
              </TouchableOpacity>
            </Modal>

            {/* Big Centered Amount Input */}
            <View style={styles.amountInputContainer}>
              <Text
                style={[styles.currencySymbol, { color: colors.textSecondary }]}
              >
                $
              </Text>
              <TextInput
                style={[
                  styles.amountInput,
                  {
                    color: colors.textPrimary,
                    borderBottomColor: colors.primary,
                    fontSize: 32,
                    textAlign: "center",
                  },
                ]}
                placeholder="0"
                placeholderTextColor={colors.textSecondary}
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
                autoFocus={true}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Fixed Continue Button at Bottom */}
      <View
        style={[
          styles.buttonContainer,
          {
            backgroundColor: colors.background,
            paddingBottom:
              Platform.OS === "ios"
                ? keyboardHeight > 0
                  ? keyboardHeight
                  : 20
                : 20,
            paddingTop: 10,
            paddingHorizontal: 20,
          },
        ]}
      >
        <PrimaryButton
          text="Continue"
          onPress={handleContinue}
          disabled={!amount}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    marginBottom: 6,
  },
  backButton: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
    fontFamily: "Poppins",
    textAlign: "left",
  },
  subtext: {
    fontSize: 14,
    marginBottom: 0,
    fontFamily: "Poppins",
    textAlign: "left",
  },
  scrollContent: {
    flexGrow: 1,
  },
  modalCard: {
    borderRadius: 20,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  recipientImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  recipientEmail: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  currencyContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    marginBottom: 20,
    width: "30%",
    justifyContent: "space-between",
  },
  currencyText: {
    fontSize: 14,
    fontFamily: "Poppins",
  },
  currencyIcon: {
    marginLeft: 5,
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dropdownContainer: {
    position: "absolute",
    right: 20,
    width: "30%",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  currencyItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    justifyContent: "center",
  },
  currencySymbol: {
    fontSize: 32,
    marginRight: 8,
    fontFamily: "Poppins",
  },
  amountInput: {
    width: "60%",
    paddingVertical: 8,
    borderBottomWidth: 1,
    fontFamily: "Poppins",
  },
  buttonContainer: {
    width: "100%",
    alignSelf: "center",
  },
});

export default RequestAmount;
