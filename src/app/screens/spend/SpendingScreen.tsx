// Core Libraries
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Firebase Services
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// Theming
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../themes/Theme";

// Custom Components
import SecondaryHeader from "../../components/SecondaryHeader";
import {MonthDropdown} from "../../components/MonthDropdown";
import {SummaryCard} from "../../components/SummaryCard";
import {SpendingChart} from "../../components/SpendingChart";
import {SpendingTabs} from "../../components/SpendingTabs";
import {TransactionList} from "../../components/TransactionList";

// Local Data
import { sampleData } from "./TransactionData";

const { width } = Dimensions.get("window");

type TabType = "spending" | "income" | "bills" | "savings";

interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  icon: any;
  type: TabType;
}

interface FirestoreTransaction {
  amount: number;
  timestamp: any;
}

interface ChartData {
  labels: string[];
  datasets: { data: number[] }[];
}



const SpendingScreen = ({ navigation, route }: any) => {
  const { colors } = useTheme() as CustomTheme;
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [activeTab, setActiveTab] = useState<TabType>(
    route.params?.initialTab || "spending"
  );
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sentTransactions, setSentTransactions] = useState<FirestoreTransaction[]>([]);
  const [receivedTransactions, setReceivedTransactions] = useState<FirestoreTransaction[]>([]);
  const [chartData, setChartData] = useState<Record<TabType, ChartData>>({
    spending: {
      labels: ["1-7", "8-14", "15-21", "22-28", "29-31"],
      datasets: [{ data: [0, 0, 0, 0, 0] }],
    },
    income: {
      labels: ["1-7", "8-14", "15-21", "22-28", "29-31"],
      datasets: [{ data: [0, 0, 0, 0, 0] }],
    },
    bills: {
      labels: ["2-8", "9-15", "16-22", "23-29", "30-1"],
      datasets: [{ data: [1200, 800, 1200, 800, 1200] }],
    },
    savings: {
      labels: ["2-8", "9-15", "16-22", "23-29", "30-1"],
      datasets: [{ data: [300, 500, 400, 600, 200] }],
    },
  });

  useEffect(() => {
    const user = auth().currentUser;
  
    if (!user) {
      setLoading(false);
      return;
    }
  
    const unsubscribe = firestore()
      .collection("users")
      .doc(user.uid)
      .onSnapshot(async (documentSnapshot) => {
        if (documentSnapshot.exists) {
          const userData = documentSnapshot.data();
          setBalance(userData?.balance || 0);
          setSentTransactions(userData?.sent || []);
          setReceivedTransactions(userData?.received || []);
        }
        setLoading(false);
      });
  
    setTransactions(sampleData);
    return () => unsubscribe();
  }, [selectedMonth]);

  const processTransactionsForChart = (
    transactions: FirestoreTransaction[],
    month: string
  ): ChartData => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthIndex = months.indexOf(month);

    const weeklyGroups = {
      "1-7": 0,
      "8-14": 0,
      "15-21": 0,
      "22-28": 0,
      "29-31": 0,
    };

    transactions.forEach((transaction) => {
      let date: Date;
      if (transaction.timestamp?.toDate) {
        date = transaction.timestamp.toDate();
      } else if (transaction.timestamp instanceof Date) {
        date = transaction.timestamp;
      } else {
        return;
      }

      if (date.getMonth() !== monthIndex) return;

      const day = date.getDate();
      let weekRange: keyof typeof weeklyGroups;

      if (day <= 7) weekRange = "1-7";
      else if (day <= 14) weekRange = "8-14";
      else if (day <= 21) weekRange = "15-21";
      else if (day <= 28) weekRange = "22-28";
      else weekRange = "29-31";

      weeklyGroups[weekRange] += Math.abs(transaction.amount);
    });

    return {
      labels: Object.keys(weeklyGroups),
      datasets: [{ data: Object.values(weeklyGroups) }],
    };
  };

  useEffect(() => {
    if (sentTransactions.length > 0 || receivedTransactions.length > 0) {
      setChartData(prev => ({
        ...prev,
        spending: processTransactionsForChart(sentTransactions, selectedMonth),
        income: processTransactionsForChart(receivedTransactions, selectedMonth),
      }));
    }
  }, [sentTransactions, receivedTransactions, selectedMonth]);

  const formatBalance = (amount: number | null) => {
    if (amount === null) return "$0";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.type === activeTab
  );

  const calculateTotal = () => {
    if (activeTab === "spending") {
      return sentTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    } else if (activeTab === "income") {
      return receivedTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    } else {
      return filteredTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case "spending": return "Total Spend";
      case "income": return "Total Income";
      case "bills": return "Total Bills";
      case "savings": return "Total Savings";
      default: return "";
    }
  };

  const getTabIcon = () => {
    switch (activeTab) {
      case "spending":
        return require("@/assets/icons/credit-card-minus.svg");
      case "income":
        return require("@/assets/icons/coins.svg");
      case "bills":
        return require("@/assets/icons/invoice.svg");
      case "savings":
        return require("@/assets/icons/sack-dollar.svg");
      default:
        return require("@/assets/icons/credit-card-minus.svg");
    }
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.backgroundinApp }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.backgroundinApp }]}
      contentContainerStyle={styles.scrollContainer}
    >
      <SecondaryHeader
        title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        onBackPress={() => navigation.goBack()}
      />

      <MonthDropdown 
        selectedMonth={selectedMonth} 
        onSelectMonth={setSelectedMonth} 
      />

      <View style={styles.cardRow}>
        <SummaryCard
          icon={getTabIcon()}
          title={getTabTitle()}
          amount={formatBalance(calculateTotal())}
          backgroundColor={colors.primary}
        />
        <SummaryCard
          icon={require("@/assets/icons/credit-card.svg")}
          title="Available Balance"
          amount={formatBalance(balance)}
          backgroundColor="#fbd84a"
          textColor="#000"
        />
      </View>

      <SpendingChart 
        data={chartData[activeTab]} 
        activeTab={activeTab} 
      />

      <SpendingTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      <View style={styles.listHeader}>
        <Text style={[styles.listHeaderText, { color: colors.textPrimary }]}>
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} List
        </Text>
      </View>

      <TransactionList transactions={filteredTransactions} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  listHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SpendingScreen;