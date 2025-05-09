// Core React
import React, { useEffect, useState } from "react";

// React Native Components
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Expo Libraries
import { Image } from 'expo-image';
import { Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

// Navigation & Theming
import { useTheme } from "@react-navigation/native";
import { navigate } from "../../navigation/navigationService";
import { CustomTheme } from "../../themes/Theme";

// Internationalization
import { useTranslation } from "react-i18next";

// Firebase Services
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// Redux Toolkit
import { useAppDispatch, useAppSelector } from "../../redux/store";

// Custom Components
import ActivityIndicator from "../../components/ActivityIndicator";


const { height } = Dimensions.get("window");

const HomePage = () => {
  const { colors } = useTheme() as CustomTheme;
  const { t } = useTranslation();
  const [balance, setBalance] = useState<number | null>(null);
  const [transactionTotals, setTransactionTotals] = useState({
    spending: 0,
    income: 0,
    bills: 0,
    savings: 0
  });
  
  const { isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = auth().currentUser;
    
    if (!user) {
      return;
    }
  
    const unsubscribe = firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(async (documentSnapshot) => {
        if (documentSnapshot.exists) {
          const userData = documentSnapshot.data();
          setBalance(userData?.balance || 0);
          
          // Calculate transaction totals
          const sentTransactions = userData?.sent || [];
          const receivedTransactions = userData?.received || [];
          
          // Calculate totals (simplified approach)
          const spendingTotal = sentTransactions.reduce(
            (sum: number, tx: { amount: number }) => sum + Math.abs(tx.amount), 0);
          
          const incomeTotal = receivedTransactions.reduce(
            (sum: number, tx: { amount: number }) => sum + Math.abs(tx.amount), 0);
  
    
          const billsTotal = 7500;
          const savingsTotal = 33000;
  
          console.log("Calculated totals:", {
            spending: spendingTotal,
            income: incomeTotal,
            bills: billsTotal,
            savings: savingsTotal
          });
  
          setTransactionTotals({
            spending: spendingTotal,
            income: incomeTotal,
            bills: billsTotal,
            savings: savingsTotal
          });
        } else {
          setBalance(0);
          setTransactionTotals({
            spending: 0,
            income: 0,
            bills: 0,
            savings: 0
          });
        }
      });
  
    return () => unsubscribe();
  }, []);


  const formatBalance = (amount: number | null) => {
    if (amount === null) return "$0";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const transactions = [
    {
      id: 1,
      title: t("homePage.transactions.spending"),
      amount: -transactionTotals.spending, // Use dynamic value
      icon: require("@/assets/icons/credit-card-minus.svg"),
      iconBg: "rgba(0, 122, 255, 0.5)",
      tintColor: "#007AFF",
      type: "spending",
      onPress: () => navigate("SpendingScreen", { initialTab: "spending" })
    },
    {
      id: 2,
      title: t("homePage.transactions.income"),
      amount: transactionTotals.income, // Use dynamic value
      icon: require("@/assets/icons/coins.svg"),
      iconBg: "rgba(52, 199, 89, 0.5)",
      tintColor: "#34C759",
      type: "income",
      onPress: () => navigate("SpendingScreen", { initialTab: "income" })
    },
    {
      id: 3,
      title: t("homePage.transactions.bills"),
      amount: -transactionTotals.bills, // Use dynamic value
      icon: require("@/assets/icons/invoice.svg"),
      iconBg: "rgba(255, 204, 0, 0.5)",
      tintColor: "#FFCC00",
      type: "bills",
      onPress: () => navigate("SpendingScreen", { initialTab: "bills" })
    },
    {
      id: 4,
      title: t("homePage.transactions.savings"),
      amount: transactionTotals.savings, // Use dynamic value
      icon: require("@/assets/icons/sack-dollar.svg"),
      iconBg: "rgba(255, 149, 0, 0.5)",
      tintColor: "#FF9500",
      type: "savings",
      onPress: () => navigate("SpendingScreen", { initialTab: "savings" })
    },
  ];

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.backgroundinApp, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator/>
      </View>
    );
  }

  return (
    <View style={[styles.flexContainer,{backgroundColor: colors.backgroundinApp}]}>
      {/* Background Image - Behind all content */}
      <ImageBackground 
        source={require('@/assets/images/bluebg3.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Empty container to give the image height */}
        <View style={{ height: height * 0.5 }} />
      </ImageBackground>

      {/* Content ScrollView - On top of background */}
      <ScrollView
        style={[styles.contentScroll, { backgroundColor: 'transparent' }]}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header Row */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.headerIcon}>
            <FontAwesome name="trophy" size={24} color="#ffffff" />
          </TouchableOpacity>

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
              placeholder={t("homePage.searchPlaceholder")}
              placeholderTextColor={colors.textSecondary}
              style={[styles.searchInput, { color: colors.textPrimary }]}
            />
          </View>

          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#ffffff"
            />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={[styles.balanceCard, { backgroundColor: "transparent" }]}>
          <TouchableOpacity style={styles.currencyDropdown}>
            <Text style={[styles.currencyText, { color: "#ffffff" }]}>
              USD
            </Text>
            <MaterialIcons
              name="arrow-drop-down"
              size={20}
              color="#ffffff"
            />
          </TouchableOpacity>

          <Text style={[styles.balanceAmount, { color: "#ffffff" }]}>
            {formatBalance(balance)}
          </Text>
          <Text style={[styles.balanceLabel, { color: "#ffffff" }]}>
            {t("homePage.availableBalance")}
          </Text>

          <TouchableOpacity
            style={[
              styles.addMoneyButton,
              { backgroundColor: "transparent", borderColor: colors.border },
            ]}
            onPress={() => navigate("UpdateMoney")}
          >
            <MaterialCommunityIcons
              name="wallet-outline"
              size={20}
              color="#ffffff"
            />
            <Text style={[styles.addMoneyText, { color: "#ffffff" }]}>
              {t("homePage.addMoney")}
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
          <TouchableOpacity
            style={[styles.actionButton]}
            onPress={() => navigate("SendMoney")}
          >
            <Image
              source={require("@/assets/icons/dollar-send-circle.svg")}
              style={[
                styles.actionIcon,
                {
                  backgroundColor: "transparent",
                  tintColor: "#576af6",
                },
              ]}
            />
            <Text
              style={[styles.actionButtonText, { color: colors.textPrimary }]}
            >
              {t("homePage.actions.send")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton]}  
            onPress={() => navigate("QrCode")}
          >
            <Image
              source={require("@/assets/icons/dollar-receive-circle.svg")}
              style={[
                styles.actionIcon,
                { 
                  backgroundColor: "transparent", 
                  tintColor: "#FFD700" 
                },
              ]}
            />
            <Text
              style={[styles.actionButtonText, { color: colors.textPrimary }]}
            >
              {t("homePage.actions.request")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton]}>
          <Image
              source={require("@/assets/icons/bank.svg")}
              style={[
                styles.actionIcon,
                { 
                  backgroundColor: "transparent", 
                  tintColor: "#FFD700" 
                },
              ]}
            />
            <Text
              style={[styles.actionButtonText, { color: colors.textPrimary }]}
            >
              {t("homePage.actions.bank")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Transactions Section */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          {t("homePage.transactions.title")}
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
              onPress={transaction.onPress}
            >
              <View style={styles.transactionLeft}>
                <View
                  style={[
                    styles.transactionIconContainer,
                    { backgroundColor: transaction.iconBg ,
                      
                    },
                  ]}
                >
                  <Image
                    source={transaction.icon}
                    style={[styles.transactionIcon,{tintColor: transaction.tintColor}]}
                    
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
                  transaction.type === "spending" && { color: "#b82925"},
                  transaction.type === "bills" && { color: "#b82925" },
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
    top: -35,
    left: 0,
    right: 0,
    height: height * 0.5, // Half of the screen height
  },
  contentScroll: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 30,
    backgroundColor: 'transparent',
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
    fontWeight: "400",
  },
  container: {
    flex: 1,
  },
});

export default HomePage;     