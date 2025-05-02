import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { CustomTheme } from "../../app/themes/Theme";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

type TabType = "spending" | "income" | "bills" | "savings";

interface TabConfig {
  id: TabType;
  icon: any;
  backgroundColor: string;
  iconColor: string;
}

export const SpendingTabs = ({
  activeTab,
  onTabChange
}: {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}) => {
  const { colors } = useTheme() as CustomTheme;
  const { t } = useTranslation();

  const tabs: TabConfig[] = [
    {
      id: "spending",
      icon: require("@/assets/icons/credit-card-minus.svg"),
      backgroundColor: "#eaebfd",
      iconColor: "#3a7cff"
    },
    {
      id: "income",
      icon: require("@/assets/icons/coins.svg"),
      backgroundColor: "#e9f5e9",
      iconColor: "#4CAF50"
    },
    {
      id: "bills",
      icon: require("@/assets/icons/invoice.svg"),
      backgroundColor: "#fff9c5",
      iconColor: "#f17e3a"
    },
    {
      id: "savings",
      icon: require("@/assets/icons/sack-dollar.svg"),
      backgroundColor: "#fdf2e1",
      iconColor: "#f39a3e"
    }
  ];

  const getTabLabel = (tabId: TabType) => {
    return t(`spending.tabs.${tabId}`);
  };

  return (
    <View style={[styles.MaintabContainer, { backgroundColor: colors.modalBackgroun }]}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.roundTabButton, { backgroundColor: tab.backgroundColor }]}
            onPress={() => onTabChange(tab.id)}
          >
            <Image
              source={tab.icon}
              style={[styles.tabIcon, { tintColor: tab.iconColor }]}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tabLabelContainer}>
        {tabs.map((tab) => (
          <Text
            key={tab.id}
            style={[
              styles.tabLabel,
              {
                color: activeTab === tab.id ? colors.primary : colors.textSecondary,
              },
            ]}
          >
            {getTabLabel(tab.id)}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});