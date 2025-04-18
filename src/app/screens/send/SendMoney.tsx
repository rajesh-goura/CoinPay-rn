import React, { useState, useEffect } from "react";

// React Native components
import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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
import RoundButton from "../../components/RoundButton";

// Theme
import { CustomTheme } from "../../themes/Theme";


const SendMoney = ({ navigation }: any) => {
  const { colors } = useTheme() as CustomTheme;
  const [searchQuery, setSearchQuery] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const screenHeight = Dimensions.get("window").height;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const recipients = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      amount: -100,
      image: require("@/assets/images/user.png"),
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      amount: -50,
      image: require("@/assets/images/user.png"),
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert@example.com",
      amount: -200,
      image: require("@/assets/images/user.png"),
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      amount: -75,
      image: require("@/assets/images/user.png"),
    },
    {
      id: "5",
      name: "Michael Wilson",
      email: "michael@example.com",
      amount: -150,
      image: require("@/assets/images/user.png"),
    },
  ];

  const filteredRecipients = recipients.filter((recipient) =>
    recipient.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderRecipientItem = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.recipientItem, { borderBottomColor: colors.border }]}
      onPress={() => navigate("SendAmount", { recipient: item })}
    >
      <View style={styles.recipientLeft}>
        <Image source={item.image} style={styles.recipientImage} />
        <View style={styles.recipientInfo}>
          <Text style={[styles.recipientName, { color: colors.textPrimary }]}>
            {item.name}
          </Text>
          <Text
            style={[styles.recipientEmail, { color: colors.textSecondary }]}
          >
            {item.email}
          </Text>
        </View>
      </View>
      <Text style={[styles.recipientAmount, { color: "#FF3B30" }]}>
        ${Math.abs(item.amount)}
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
          Choose Recipient
        </Text>
        <Text style={[styles.subtext, { color: colors.textSecondary }]}>
          Please select your recipient to send your money
        </Text>
      </View>

      {/* Main Content */}
      <KeyboardAvoidingView
        style={styles.contentContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        {/* Modal Container - Now with fixed height */}
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: colors.modalBackgroun,
              maxHeight: screenHeight * 0.6, // Takes 60% of screen height
            },
          ]}
        >
          {/* Search Bar */}
          <View
            style={[
              styles.searchContainer,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Ionicons
              name="search"
              size={20}
              color={colors.textSecondary}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search Recipient Email"
              placeholderTextColor={colors.textSecondary}
              style={[styles.searchInput, { color: colors.textPrimary }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <Text
            style={[styles.mostRecentText, { color: colors.textSecondary }]}
          >
            Most Recent
          </Text>

          <FlatList
            data={filteredRecipients}
            renderItem={renderRecipientItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={true}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </KeyboardAvoidingView>

      {/* Scan Button - Hidden when keyboard is visible */}
      {!isKeyboardVisible && (
        <View style={styles.scanButtonContainer}>
          <RoundButton
            onPress={() => navigate("ScanQr")}
            iconName="qr-code-outline"
            size={32}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 16,
  },
  backButton: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Poppins",
  },
  subtext: {
    fontSize: 14,
    marginBottom: 16,
    fontFamily: "Poppins",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  modalContainer: {
    borderRadius: 20,
    padding: 16,
    width: "100%",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  scanButtonContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins",
  },
  mostRecentText: {
    fontSize: 14,
    marginBottom: 16,
    fontFamily: "Poppins",
  },
  listContent: {
    paddingBottom: 16,
  },
  recipientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  recipientLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  recipientImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  recipientInfo: {
    justifyContent: "center",
  },
  recipientName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  recipientEmail: {
    fontSize: 14,
    fontFamily: "Poppins",
  },
  recipientAmount: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
});

export default SendMoney;
