import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";


export const SummaryCard = ({
  icon,
  title,
  amount,
  backgroundColor,
  textColor = "#fff"
}: {
  icon: any;
  title: string;
  amount: string;
  backgroundColor: string;
  textColor?: string;
}) => {
  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.cardContent}>
        <Image source={icon} style={[styles.cardIcon, { tintColor: textColor }]} />
        <View style={styles.cardTextContainer}>
          <Text style={[styles.cardTitle, { color: textColor }]}>{title}</Text>
          <Text style={[styles.cardAmount, { color: textColor }]}>{amount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});