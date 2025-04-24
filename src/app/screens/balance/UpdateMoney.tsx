import React, { useState } from "react";

// React Native components
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Navigation
import { useNavigation, useTheme } from "@react-navigation/native";

// External libraries
import { useTranslation } from "react-i18next";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// Internal components
import { CustomTheme } from "../../themes/Theme";


const UpdateMoney = () => {
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateBalance = async (operation: "add" | "deduct") => {
    if (!amount) {
      Alert.alert(t("updateMoney.error.title"), t("updateMoney.error.amountEmpty"));
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert(t("updateMoney.error.title"), t("updateMoney.error.invalidAmount"));
      return;
    }

    setIsSubmitting(true);

    try {
      const user = auth().currentUser;

      if (!user) {
        Alert.alert(t("updateMoney.error.title"), t("updateMoney.error.userNotLoggedIn"));
        return;
      }

      await firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          balance: firestore.FieldValue.increment(
            operation === "add" ? numericAmount : -numericAmount
          ),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      Alert.alert(
        t("updateMoney.success.title"),
        operation === "add"
          ? t("updateMoney.success.added", { amount: numericAmount.toFixed(2) })
          : t("updateMoney.success.deducted", { amount: numericAmount.toFixed(2) }),
        [
          {
            text: t("common.ok"),
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error("Error updating balance:", error);
      Alert.alert(t("updateMoney.error.title"), t("updateMoney.error.general"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCustomAmount = () => {
    if (!amount) {
      Alert.alert(t("updateMoney.error.title"), t("updateMoney.error.amountEmpty"));
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      Alert.alert(t("updateMoney.error.title"), t("updateMoney.error.invalidAmount"));
      return;
    }

    Alert.alert(
      t("updateMoney.confirm.title"),
      numericAmount >= 0
        ? t("updateMoney.confirm.add", { amount: numericAmount.toFixed(2) })
        : t("updateMoney.confirm.deduct", { amount: (-numericAmount).toFixed(2) }),
      [
        {
          text: t("common.cancel"),
          style: "cancel",
        },
        {
          text: t("common.confirm"),
          onPress: () => handleUpdateBalance(numericAmount >= 0 ? "add" : "deduct"),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.backgroundinApp },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            {t("updateMoney.title")}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t("updateMoney.subtitle")}
          </Text>
        </View>

        {/* Amount Input */}
        <View style={styles.amountContainer}>
          <Text style={[styles.amountLabel, { color: colors.textSecondary }]}>
            {t("updateMoney.amountLabel")}
          </Text>
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: colors.modalBackgroun },
            ]}
          >
            <Text style={[styles.currencySymbol, { color: colors.textPrimary }]}>
              $
            </Text>
            <TextInput
              style={[
                styles.amountInput,
                { color: colors.textPrimary, borderColor: colors.border },
              ]}
              placeholder="0.00"
              placeholderTextColor={colors.textTertiary}
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
              autoFocus
            />
          </View>
        </View>

        {/* Quick Add Buttons */}
        <View style={styles.quickButtonsContainer}>
          {[100, 200, 500].map((value) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.quickButton,
                { backgroundColor: colors.primary },
              ]}
              onPress={() => setAmount(value.toString())}
            >
              <Text style={[styles.quickButtonText, { color: "white" }]}>
                +${value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.addButton,
              { backgroundColor: colors.primary },
            ]}
            onPress={() => handleUpdateBalance("add")}
            disabled={isSubmitting || !amount}
          >
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={24}
              color="white"
            />
            <Text style={[styles.actionButtonText, { color: "white" }]}>
              {isSubmitting
                ? t("updateMoney.adding")
                : t("updateMoney.addMoney")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.deductButton,
              { backgroundColor: colors.notification },
            ]}
            onPress={() => handleUpdateBalance("deduct")}
            disabled={isSubmitting || !amount}
          >
            <MaterialCommunityIcons
              name="minus-circle-outline"
              size={24}
              color="white"
            />
            <Text style={[styles.actionButtonText, { color: "white" }]}>
              {isSubmitting
                ? t("updateMoney.deducting")
                : t("updateMoney.deductMoney")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.customButton,
              { backgroundColor: colors.card },
            ]}
            onPress={handleCustomAmount}
            disabled={isSubmitting || !amount}
          >
            <MaterialCommunityIcons
              name="bank-transfer"
              size={24}
              color={colors.textPrimary}
            />
            <Text
              style={[
                styles.actionButtonText,
                { color: colors.textPrimary },
              ]}
            >
              {t("updateMoney.customAction")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  amountContainer: {
    marginBottom: 25,
  },
  amountLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 60,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    height: "100%",
  },
  quickButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  quickButton: {
    width: "30%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  quickButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  actionButtonsContainer: {
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#34C759",
  },
  deductButton: {
    backgroundColor: "#FF3B30",
  },
  customButton: {
    backgroundColor: "#AEAEB2",
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default UpdateMoney;