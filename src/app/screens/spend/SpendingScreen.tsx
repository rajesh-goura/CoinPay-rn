// SpendingScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../themes/Theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { BarChart } from "react-native-chart-kit";
import SecondaryHeader from "../../components/SecondaryHeader";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

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

const SpendingScreen = ({ navigation ,route}: any) => {
  const { colors } = useTheme() as CustomTheme;
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [activeTab, setActiveTab] = useState<TabType>(
    route.params?.initialTab || "spending" 
  );
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Months for dropdown
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Sample data - in a real app, this would come from your database
  const sampleData: Transaction[] = [
    {
      id: "1",
      name: "Netflix",
      amount: -500,
      date: "1st JAN AT 7:20pm",
      icon: require("@/assets/images/spendicons/netflix.svg"),
      type: "spending",
    },
    {
      id: "2",
      name: "Youtube Premium",
      amount: -300,
      date: "5th JAN AT 3:45pm",
      icon: require("@/assets/images/spendicons/youtube.svg"),
      type: "spending",
    },
    {
      id: "3",
      name: "Pinterest",
      amount: -800,
      date: "10th JAN AT 11:30am",
      icon: require("@/assets/images/spendicons/pinterest.svg"),
      type: "spending",
    },
    {
      id: "4",
      name: "Google Cloud",
      amount: -1200,
      date: "15th JAN AT 9:15am",
      icon: require("@/assets/images/spendicons/google.svg"),
      type: "spending",
    },
    {
      id: "5",
      name: "Dribble",
      amount: -250,
      date: "20th JAN AT 5:40pm",
      icon: require("@/assets/images/spendicons/dribble.svg"),
      type: "spending",
    },
    {
      id: "6",
      name: "Freelance Payment",
      amount: 25000,
      date: "3rd JAN AT 10:15am",
      icon: require("@/assets/images/spendicons/freelance.png"),
      type: "income",
    },
    {
      id: "7",
      name: "Salary",
      amount: 75000,
      date: "28th JAN AT 12:00pm",
      icon: require("@/assets/images/spendicons/salary.png"),
      type: "income",
    },
    {
      id: "8",
      name: "Investment Dividends",
      amount: 12000,
      date: "15th JAN AT 4:30pm",
      icon: require("@/assets/images/spendicons/investment.jpg"),
      type: "income",
    },
  
    // Bill transactions
    {
      id: "9",
      name: "Electricity Bill",
      amount: -3500,
      date: "5th JAN AT 9:00am",
      icon: require("@/assets/images/spendicons/electricity.png"),
      type: "bills",
    },
    {
      id: "10",
      name: "Internet Bill",
      amount: -2200,
      date: "10th JAN AT 11:30am",
      icon: require("@/assets/images/spendicons/internet.svg"),
      type: "bills",
    },
    {
      id: "11",
      name: "Water Bill",
      amount: -1800,
      date: "15th JAN AT 2:15pm",
      icon: require("@/assets/images/spendicons/water.svg"),
      type: "bills",
    },
  
    // Savings transactions
    {
      id: "12",
      name: "Emergency Fund",
      amount: 10000,
      date: "7th JAN AT 8:45am",
      icon: require("@/assets/images/spendicons/emergency.png"),
      type: "savings",
    },
    {
      id: "13",
      name: "Retirement Fund",
      amount: 15000,
      date: "14th JAN AT 10:30am",
      icon: require("@/assets/images/spendicons/retirement.png"),
      type: "savings",
    },
    {
      id: "14",
      name: "Vacation Savings",
      amount: 8000,
      date: "21st JAN AT 3:15pm",
      icon: require("@/assets/images/spendicons/vacation.jpg"),
      type: "savings",
    },
  ];

  // Chart data for each tab
  const chartData = {
    spending: {
      labels: ["2-8", "9-15", "16-22", "23-29", "30-1"],
      datasets: [{ data: [500, 300, 500, 100, 200] }],
    },
    income: {
      labels: ["2-8", "9-15", "16-22", "23-29", "30-1"],
      datasets: [{ data: [1000, 1500, 1200, 1800, 900] }],
    },
    bills: {
      labels: ["2-8", "9-15", "16-22", "23-29", "30-1"],
      datasets: [{ data: [1200, 800, 1200, 800, 1200] }],
    },
    savings: {
      labels: ["2-8", "9-15", "16-22", "23-29", "30-1"],
      datasets: [{ data: [300, 500, 400, 600, 200] }],
    },
  };

  // Titles for each tab
  const tabTitles = {
    spending: "Total Spend",
    income: "Total Income",
    bills: "Total Bills",
    savings: "Total Savings",
  };

  useEffect(() => {
    const user = auth().currentUser;
    
    if (!user) {
      setLoading(false);
      return;
    }

    const unsubscribe = firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          const userData = documentSnapshot.data();
          setBalance(userData?.balance || 0);
          // You might want to store separate totals for each category in Firestore
          setTotalAmount(userData?.totalSpending || 0);
        } else {
          setBalance(0);
          setTotalAmount(0);
        }
        setLoading(false);
      });

    // In a real app, you would fetch transactions from Firestore here
    setTransactions(sampleData);

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

  // Filter transactions by active tab
  const filteredTransactions = transactions.filter(
    transaction => transaction.type === activeTab
  );

  // Calculate total for active tab
  const calculateTotal = () => {
    return filteredTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
  };

  // Render item for the list
  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={[styles.listItem, { borderBottomColor: colors.border, borderBottomWidth: 1.9 }]}>
      <Image source={item.icon} style={styles.listIcon} />
      <View style={styles.listTextContainer}>
        <Text style={[styles.listName, { color: colors.textPrimary }]}>
          {item.name}
        </Text>
        <Text style={[styles.listDate, { color: colors.textSecondary }]}>
          {item.date}
        </Text>
      </View>
      <Text style={[styles.listAmount, { color: item.amount < 0 ? "#ed4034" : "#4CAF50" }]}>
        {item.amount < 0 ? "-" : "+"}${Math.abs(item.amount)}
      </Text>
    </View>
  );

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
      {/* Header */}
      <SecondaryHeader title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} 
        onBackPress={() => navigation.goBack()} />

      {/* Month Dropdown */}
      <TouchableOpacity
        style={[
          styles.monthDropdown,
          {
            backgroundColor: colors.modalBackgroun,
            borderColor: colors.border,
          },
        ]}
        onPress={() => setShowMonthDropdown(true)}
      >
        <Text style={[styles.monthText, { color: colors.textPrimary }]}>
          {selectedMonth}
        </Text>
        <Ionicons
          name="chevron-down"
          size={16}
          color={colors.textSecondary}
          style={styles.dropdownIcon}
        />
      </TouchableOpacity>

      {/* Month Dropdown Modal */}
      <Modal
        visible={showMonthDropdown}
        transparent={true}
        animationType="fade"
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMonthDropdown(false)}
        >
          <View
            style={[
              styles.dropdownMenu,
              { backgroundColor: colors.modalBackgroun },
            ]}
          >
            {months.map((month) => (
              <TouchableOpacity
                key={month}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedMonth(month);
                  setShowMonthDropdown(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    { color: colors.textPrimary },
                  ]}
                >
                  {month}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Summary Cards */}
      <View style={styles.cardRow}>
        <View style={[styles.card, { backgroundColor: colors.primary }]}>
          <View style={styles.cardContent}>
            <Image
              source={getTabIcon(activeTab)}
              style={[styles.cardIcon, { tintColor: "#fff" }]}
            />
            <View style={styles.cardTextContainer}>
              <Text style={[styles.cardTitle, { color: "#fff" }]}>
                {tabTitles[activeTab]}
              </Text>
              <Text style={[styles.cardAmount, { color: "#fff" }]}>
                {formatBalance(calculateTotal())}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: "#fbd84a" }]}>
          <View style={styles.cardContent}>
            <Image
              source={require("@/assets/icons/credit-card.svg")}
              style={styles.cardIcon}
            />
            <View style={styles.cardTextContainer}>
              <Text style={[styles.cardTitle, { color: "#000" }]}>
                Available Balance
              </Text>
              <Text style={[styles.cardAmount, { color: "#000" }]}>
                {formatBalance(balance)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bar Chart */}
      <View
        style={[
          styles.chartContainer,
          { backgroundColor: colors.modalBackgroun, borderRadius: 16, borderBottomWidth: 2, borderColor: colors.primary },
        ]}
      >
        <BarChart
          data={{
            ...chartData[activeTab],
            // Add colors to your data
            datasets: [
              {
                ...chartData[activeTab].datasets[0],
                colors: chartData[activeTab].datasets[0].data.map((_, index) => 
                  () => index % 2 === 0 ? colors.primary : "#FFD700"
                ),
              },
            ],
          }}
          width={width - 60}
          height={180}
          withInnerLines={false}
          showValuesOnTopOfBars={true}
          yAxisLabel="$"
          yAxisSuffix=""
          fromZero
          showBarTops={false}
          withCustomBarColorFromData={true}
          flatColor={true}
          chartConfig={{
            paddingRight: 30,
            backgroundColor: colors.modalBackgroun,
            backgroundGradientFrom: colors.modalBackgroun,
            backgroundGradientTo: colors.modalBackgroun,
            decimalPlaces: 0,
            color: (opacity = 1) => colors.textPrimary,
            labelColor: (opacity = 1) => colors.textPrimary,
            style: {
              borderRadius: 16,
            },
            barPercentage: 0.9,
            formatTopBarValue: (value) => `$ ${value}`,
            propsForLabels: {
              fontSize: 10,
            },
          }}
          style={{
            marginLeft: -10,
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      {/* Tab Navigation */}
      <View style={[styles.MaintabContainer, { backgroundColor: colors.modalBackgroun }]}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.roundTabButton,
              { backgroundColor: "#eaebfd" },
            ]}
            onPress={() => setActiveTab("spending")}
          >
            <Image
              source={require("@/assets/icons/credit-card-minus.svg")}
              style={[styles.tabIcon, { tintColor: colors.primary }]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roundTabButton,
              { backgroundColor: "#e9f5e9" },
            ]}
            onPress={() => setActiveTab("income")}
          >
            <Image
              source={require("@/assets/icons/coins.svg")}
              style={[styles.tabIcon, { tintColor: "#4CAF50" }]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roundTabButton,
              { backgroundColor: "#fff9c5" },
            ]}
            onPress={() => setActiveTab("bills")}
          >
            <Image
              source={require("@/assets/icons/invoice.svg")}
              style={[styles.tabIcon, { tintColor: "#f17e3a" }]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roundTabButton,
              { backgroundColor: "#fdf2e1" },
            ]}
            onPress={() => setActiveTab("savings")}
          >
            <Image
              source={require("@/assets/icons/sack-dollar.svg")}
              style={[styles.tabIcon, { tintColor: "#f39a3e" }]}
            />
          </TouchableOpacity>
        </View>

        {/* Tab Labels */}
        <View style={styles.tabLabelContainer}>
          <Text
            style={[
              styles.tabLabel,
              {
                color: activeTab === "spending" ? colors.primary : colors.textSecondary,
              },
            ]}
          >
            Spending
          </Text>
          <Text
            style={[
              styles.tabLabel,
              {
                color: activeTab === "income" ? colors.primary : colors.textSecondary,
              },
            ]}
          >
            Income
          </Text>
          <Text
            style={[
              styles.tabLabel,
              { color: activeTab === "bills" ? colors.primary : colors.textSecondary },
            ]}
          >
            Bills
          </Text>
          <Text
            style={[
              styles.tabLabel,
              {
                color: activeTab === "savings" ? colors.primary : colors.textSecondary,
              },
            ]}
          >
            Savings
          </Text>
        </View>
      </View>

      {/* List Header */}
      <View style={styles.listHeader}>
        <Text style={[styles.listHeaderText, { color: colors.textPrimary }]}>
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} List
        </Text>
        <TouchableOpacity>
          <Ionicons name="filter" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Transactions List */}
      {filteredTransactions.length > 0 ? (
        <FlatList
          data={filteredTransactions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={{ color: colors.textSecondary }}>
            No {activeTab} transactions found
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

// Helper function to get the appropriate icon for each tab
const getTabIcon = (tab: TabType) => {
  switch (tab) {
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  monthDropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "49%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 16,
  },
  monthText: {
    fontSize: 16,
    fontWeight: "500",
  },
  dropdownIcon: {
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownMenu: {
    width: "80%",
    borderRadius: 10,
    paddingVertical: 8,
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownItemText: {
    fontSize: 16,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    width: "48%",
    padding: 12,
    borderRadius: 12,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTextContainer: {
    marginLeft: 8,
  },
  cardIcon: {
    width: 24,
    height: 24,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
  cardAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chartContainer: {
    marginBottom: 20,
    padding: 10,
  },
  MaintabContainer: {
    padding: 10,
    borderRadius: 16,
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  roundTabButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  tabLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
    paddingHorizontal: 0,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "500",
    width: 50,
    textAlign: "center",
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
  listContent: {
    paddingBottom: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 0,
    marginBottom: 8,
  },
  listIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  listTextContainer: {
    flex: 1,
  },
  listName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  listDate: {
    fontSize: 12,
  },
  listAmount: {
    fontSize: 16,
    fontWeight: "400",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});

export default SpendingScreen;