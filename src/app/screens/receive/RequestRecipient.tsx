import React, { useState, useEffect } from "react";
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
  ActivityIndicator
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { navigate } from "../../navigation/navigationService";
import { Ionicons } from "@expo/vector-icons";
import RoundButton from "../../components/RoundButton";
import { CustomTheme } from "../../themes/Theme";
import firestore from '@react-native-firebase/firestore';

interface Recipient {
  id: string;
  name: string;
  email: string;
  amount?: number;
  image?: any;
}

const RequestRecipient = ({ navigation }: any) => {
  const { colors } = useTheme() as CustomTheme;
  const [searchQuery, setSearchQuery] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState(true);
  const screenHeight = Dimensions.get("window").height;

  useEffect(() => {
    // Fetch users from Firestore with nested personalInfo.fullName
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const users: Recipient[] = [];
        querySnapshot.forEach(documentSnapshot => {
          const userData = documentSnapshot.data();
          const personalInfo = userData.personalInfo || {};
          
          users.push({
            id: documentSnapshot.id,
            name: personalInfo.fullName || 'No name',
            email: personalInfo.email || '',
            amount: -100, // Default amount or remove if not needed
            image: require("@/assets/images/user.png") // Default image
          });
        });
        setRecipients(users);
        setLoading(false);
      }, error => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });

    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      unsubscribe();
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const filteredRecipients = recipients.filter((recipient) =>
    recipient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderRecipientItem = ({ item }: { item: Recipient }) => (
    <TouchableOpacity
      style={[styles.recipientItem, { borderBottomColor: colors.border }]}
      onPress={() => navigate("RequestPurpose", { recipient: item })}
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
      {item.amount && (
        <Text style={[styles.recipientAmount, { color: "#FF3B30" }]}>
          ${Math.abs(item.amount)}
        </Text>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

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
          Please select your recipient to request money from
        </Text>
      </View>

      {/* Main Content */}
      <KeyboardAvoidingView
        style={styles.contentContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        {/* Modal Container */}
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: colors.modalBackgroun,
              maxHeight: screenHeight * 0.6,
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
              placeholder="Search Recipient"
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

          {filteredRecipients.length > 0 ? (
            <FlatList
              data={filteredRecipients}
              renderItem={renderRecipientItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={true}
              contentContainerStyle={styles.listContent}
            />
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={{ color: colors.textSecondary }}>
                {recipients.length === 0 ? "No recipients available" : "No matching recipients found"}
              </Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>

      {/* Scan Button */}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
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
    fontSize: 12,
    fontFamily: "Poppins",
  },
  recipientAmount: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
});

export default RequestRecipient;