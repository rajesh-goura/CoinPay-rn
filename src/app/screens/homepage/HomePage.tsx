// HomePage.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../themes/Theme";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

const { height } = Dimensions.get('window');

const HomePage = () => {
  const { colors } = useTheme() as CustomTheme;

  // Transaction data
  const transactions = [
    {
      id: 1,
      title: "Spending",
      amount: -500,
      icon: require("@/assets/icons/credit-card-minus.png"),
      iconBg: "#007AFF", // Blue
      type: "expense",
    },
    {
      id: 2,
      title: "Income",
      amount: 3000,
      icon: require("@/assets/icons/coins.png"),
      iconBg: "#34C759", // Green
      type: "income",
    },
    {
      id: 3,
      title: "Bills",
      amount: -800,
      icon: require("@/assets/icons/invoice.png"),
      iconBg: "#FFCC00", // Yellow
      type: "expense",
    },
    {
      id: 4,
      title: "Savings",
      amount: 1000,
      icon: require("@/assets/icons/sack-dollar.png"),
      iconBg: "#FF9500", // Orange
      type: "savings",
    },
  ];

  return (
    <View style={styles.flexContainer}>
      {/* Background Image - Top Half */}
      <Image 
        source={require("@/assets/images/bluebg.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Content ScrollView */}
      <ScrollView
        style={[styles.contentScroll, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header Row */}
        <View style={styles.headerRow}>
          {/* Trophy Icon */}
          <TouchableOpacity style={styles.headerIcon}>
            <FontAwesome name="trophy" size={24} color={colors.textPrimary} />
          </TouchableOpacity>

          {/* Search Bar */}
          <View
            style={[
              styles.searchContainer,
              {
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderColor: colors.border,
                borderWidth: 2,
                borderRadius: 30,
              },
            ]}
          >
            <Feather
              name="search"
              size={20}
              color={colors.textSecondary}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search Payments"
              placeholderTextColor={colors.textSecondary}
              style={[styles.searchInput, { color: colors.textPrimary }]}
            />
          </View>

          {/* Bell Icon */}
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={[styles.balanceCard, { backgroundColor: "transparent" }]}>
          {/* Currency Dropdown */}
          <TouchableOpacity style={styles.currencyDropdown}>
            <Text style={[styles.currencyText, { color: colors.textPrimary }]}>
              USD
            </Text>
            <MaterialIcons
              name="arrow-drop-down"
              size={20}
              color={colors.textPrimary}
            />
          </TouchableOpacity>

          {/* Available Balance */}
          <Text style={[styles.balanceAmount, { color: colors.textPrimary }]}>
            $20,000
          </Text>
          <Text style={[styles.balanceLabel, { color: colors.textSecondary }]}>
            Available Balance
          </Text>

          {/* Add Money Button */}
          <TouchableOpacity
            style={[
              styles.addMoneyButton,
              { backgroundColor: "transparent", borderColor: colors.border },
            ]}
          >
            <MaterialCommunityIcons
              name="wallet-outline"
              size={20}
              color={colors.textPrimary}
            />
            <Text style={[styles.addMoneyText, { color: colors.textPrimary }]}>
              Add Money
            </Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View
          style={[
            styles.actionButtonsContainer,
            { backgroundColor: colors.modalBackgroun },
          ]}
        >
          <TouchableOpacity style={[styles.actionButton]}>
            <Image
              source={require("@/assets/icons/dollar-send-circle.png")}
              style={[
                styles.actionIcon,
                {
                  backgroundColor: colors.primary,
                  borderRadius: 50,
                  borderWidth: 0,
                },
              ]}
            />
            <Text
              style={[styles.actionButtonText, { color: colors.textPrimary }]}
            >
              Send
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton]}>
            <Image
              source={require("@/assets/icons/dollar-receive-circle.png")}
              style={[
                styles.actionIcon,
                { backgroundColor: "#FFD700", borderRadius: 50, borderWidth: 0 },
              ]}
            />
            <Text
              style={[styles.actionButtonText, { color: colors.textPrimary }]}
            >
              Request
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton]}>
            <FontAwesome name="bank" size={24} color={"#FFD700"} />
            <Text
              style={[styles.actionButtonText, { color: colors.textPrimary }]}
            >
              Bank
            </Text>
          </TouchableOpacity>
        </View>

        {/* Transactions Section */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Transactions
        </Text>

        {/* Transactions List */}
        <View
          style={[
            styles.transactionsContainer,
            { backgroundColor: colors.modalBackgroun },
          ]}
        >
          {transactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              style={[
                styles.transactionItem,
                { backgroundColor: colors.modalBackgroun },
              ]}
            >
              <View style={styles.transactionLeft}>
                <View
                  style={[
                    styles.transactionIconContainer,
                    { backgroundColor: transaction.iconBg },
                  ]}
                >
                  <Image
                    source={transaction.icon}
                    style={styles.transactionIcon}
                  />
                </View>
                <Text
                  style={[styles.transactionTitle, { color: colors.textPrimary }]}
                >
                  {transaction.title}
                </Text>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  transaction.type === "expense" && { color: "#FF3B30" },
                  transaction.type === "income" && { color: "#34C759" },
                  transaction.type === "savings" && { color: "#FFD700" },
                ]}
              >
                {transaction.amount > 0
                  ? `+$${Math.abs(transaction.amount)}`
                  : `-$${Math.abs(transaction.amount)}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width:1000,
    height: height * 0.5, // Half of screen height
    zIndex: 0,
  },
  contentScroll: {
    flex: 1,
    zIndex: 1,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 35,
  },
  headerIcon: {
    padding: 8,
  },
  headerIconImage: {
    width: 24,
    height: 24,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  balanceCard: {
    marginHorizontal: 0,
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  currencyDropdown: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 15,
  },
  currencyText: {
    fontSize: 14,
    marginRight: 5,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
  },
  balanceLabel: {
    fontSize: 14,
    marginBottom: 16,
  },
  addMoneyButton: {
    flexDirection: "row",
    width: 130,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    borderRadius: 30,
    borderWidth: 2,
  },
  addMoneyText: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 10,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 0,
  },
  actionIcon: {
    width: 28,
    height: 28,
  },
  actionButtonText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 5,
  },
  transactionsContainer: {
    marginHorizontal: 20,
    borderRadius: 30,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 7,
    borderRadius: 10,
    marginBottom: 0,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionIcon: {
    width: 20,
    height: 20,
    tintColor: "white",
  },
  transactionTitle: {
    fontSize: 16,
    marginLeft: 15,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default HomePage;