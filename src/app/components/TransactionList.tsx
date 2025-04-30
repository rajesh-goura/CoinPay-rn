import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { CustomTheme } from "../../app/themes/Theme";
import { useTheme } from "@react-navigation/native";

interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  icon: any;
}

const TransactionItem = ({ item }: { item: Transaction }) => {
  const { colors } = useTheme() as CustomTheme;
  
  return (
    <View style={[styles.listItem, { borderBottomColor: colors.border, borderBottomWidth: 1.9 }]}>
      <Image source={item.icon} style={styles.listIcon} />
      <View style={styles.listTextContainer}>
        <Text style={[styles.listName, { color: colors.textPrimary }]}>{item.name}</Text>
        <Text style={[styles.listDate, { color: colors.textSecondary }]}>{item.date}</Text>
      </View>
      <Text style={[styles.listAmount, { color: item.amount < 0 ? "#ed4034" : "#4CAF50" }]}>
        {item.amount < 0 ? "-" : "+"}${Math.abs(item.amount)}
      </Text>
    </View>
  );
};

export const TransactionList = ({ transactions }: { transactions: Transaction[] }) => {
  const { colors } = useTheme() as CustomTheme;

  if (transactions.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={{ color: colors.textSecondary }}>No transactions found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={transactions}
      renderItem={({ item }) => <TransactionItem item={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
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
  listContent: {
    paddingBottom: 20,
  },
});