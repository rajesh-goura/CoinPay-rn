import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CustomTheme } from "../../app/themes/Theme";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export const MonthDropdown = ({ 
  selectedMonth, 
  onSelectMonth 
}: { 
  selectedMonth: string; 
  onSelectMonth: (month: string) => void 
}) => {
  const { colors } = useTheme() as CustomTheme;
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const months = [
    t("months.january"),
    t("months.february"),
    t("months.march"),
    t("months.april"),
    t("months.may"),
    t("months.june"),
    t("months.july"),
    t("months.august"),
    t("months.september"),
    t("months.october"),
    t("months.november"),
    t("months.december"),
  ];

  return (
    <>
      <TouchableOpacity
        style={[
          styles.monthDropdown,
          {
            backgroundColor: colors.modalBackgroun,
            borderColor: colors.border,
          },
        ]}
        onPress={() => setVisible(true)}
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

      <Modal visible={visible} transparent={true} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdownMenu, { backgroundColor: colors.modalBackgroun }]}>
            {months.map((month) => (
              <TouchableOpacity
                key={month}
                style={styles.dropdownItem}
                onPress={() => {
                  onSelectMonth(month);
                  setVisible(false);
                }}
              >
                <Text style={[styles.dropdownItemText, { color: colors.textPrimary }]}>
                  {month}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};


const styles = StyleSheet.create({
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
});