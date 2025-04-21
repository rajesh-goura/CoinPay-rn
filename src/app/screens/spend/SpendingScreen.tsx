// SpendingScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Modal,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../themes/Theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { BarChart } from "react-native-chart-kit";
import SecondaryHeader from "../../components/SecondaryHeader";

const { width } = Dimensions.get("window");

const SpendingScreen = ({ navigation }: any) => {
  const { colors } = useTheme() as CustomTheme;
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [activeTab, setActiveTab] = useState("spending");
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

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

  // Chart data
  const chartData = {
    labels: ["2-8", "9-15", "16-22", "23-29", "30-1"],
    datasets: [
      {
        data: [500, 300, 500, 100, 200],
      },
    ],
  };

  // Spending data
  const spendingData = [
    {
      id: "1",
      name: "Netflix",
      amount: -500,
      date: "1st JAN AT 7:20pm",
      icon: require("@/assets/images/spendicons/netflix.svg"),
    },
    {
      id: "2",
      name: "Youtube Premium",
      amount: -300,
      date: "5th JAN AT 3:45pm",
      icon: require("@/assets/images/spendicons/youtube.svg"),
    },
    {
      id: "3",
      name: "Pinterest",
      amount: -800,
      date: "10th JAN AT 11:30am",
      icon: require("@/assets/images/spendicons/pinterest.svg"),
    },
    {
      id: "4",
      name: "Google Cloud",
      amount: -1200,
      date: "15th JAN AT 9:15am",
      icon: require("@/assets/images/spendicons/google.svg"),
    },
    {
      id: "5",
      name: "Dribble",
      amount: -250,
      date: "20th JAN AT 5:40pm",
      icon: require("@/assets/images/spendicons/dribble.svg"),
    },
  ];

  // Render item for the list
  const renderItem = ({ item }: any) => (
    <View style={[styles.listItem, { borderBottomColor:colors.border,borderBottomWidth:1.9 }]}>
      <Image source={item.icon} style={styles.listIcon} />
      <View style={styles.listTextContainer}>
        <Text style={[styles.listName, { color: colors.textPrimary }]}>
          {item.name}
        </Text>
        <Text style={[styles.listDate, { color: colors.textSecondary }]}>
          {item.date}
        </Text>
      </View>
      <Text style={[styles.listAmount, { color: "#ed4034" }]}>
        -${Math.abs(item.amount)}
      </Text>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContainer}
    >
      {/* Header */}
      <SecondaryHeader title="Spending" onBackPress={() => navigation.goBack()} ></SecondaryHeader>

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
              source={require("@/assets/icons/credit-card-minus.svg")}
              style={[styles.cardIcon, { tintColor: "#fff" }]}
            />
            <View style={styles.cardTextContainer}>
              <Text style={[styles.cardTitle, { color: "#fff" }]}>
                Total Spend
              </Text>
              <Text style={[styles.cardAmount, { color: "#fff" }]}>$500</Text>
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
              <Text style={[styles.cardAmount, { color: "#000" }]}>$2500</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bar Chart */}
      <View
        style={[
          styles.chartContainer,
          { backgroundColor: colors.modalBackgroun, borderRadius: 16 ,borderBottomWidth:2,borderColor:colors.primary},
        ]}
      >
        <BarChart
          data={{
            ...chartData,
            // Add colors to your data
            datasets: [
              {
                data: [500, 300, 500, 100, 200],
                colors: [
                  () => colors.primary,
                  () => "#FFD700",
                  () => colors.primary,
                  () => "#FFD700",
                  () => colors.primary,
                ],
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
            // propsForHorizontalLabels: {
            //   fontSize: 0, // Set font size to 0
            //   color: 'transparent',
              
            // },
            paddingRight: 30,
            backgroundColor:colors.modalBackgroun,
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
            { backgroundColor:"#eaebfd" },
          ]}
          onPress={() => setActiveTab("spending")}
        >
          <Image
            source={require("@/assets/icons/credit-card-minus.svg")}
            style={[styles.tabIcon, { tintColor:colors.primary }]}
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
              color:
                activeTab === "spending"
                  ? colors.primary
                  : colors.textSecondary,
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
          Spending List
        </Text>
        <TouchableOpacity>
          <Ionicons name="filter" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Spending List */}
      <FlatList
        data={spendingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width:"49%",
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
  MaintabContainer:{
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
    fontWeight:"400",
  },
});

export default SpendingScreen;