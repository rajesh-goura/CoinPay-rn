import React, { useState } from "react";

// React Native components
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Navigation
import { useTheme } from "@react-navigation/native";
import { navigate } from "../../navigation/navigationService";

// Icons
import { Ionicons, MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

// Internal components
import PrimaryButton from "../../components/PrimaryButton";

// Theme
import { CustomTheme } from "../../themes/Theme";
//libraries
import { useTranslation } from "react-i18next";


interface PurposeOption {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  iconComponent: React.ComponentType<any>;
}

const RequestPurpose = ({ navigation, route }: any) => {
  const { colors } = useTheme() as CustomTheme;
  const { t } = useTranslation();
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const { recipient } = route.params;

  const purposes: PurposeOption[] = [
    {
      id: "personal",
      title: t("requestPurpose.purposes.personal.title"),
      subtitle: t("requestPurpose.purposes.personal.subtitle"),
      icon: "person",
      color: "#007AFF",
      iconComponent: Ionicons,
    },
    {
      id: "business",
      title: t("requestPurpose.purposes.business.title"),
      subtitle: t("requestPurpose.purposes.business.subtitle"),
      icon: "laptop",
      color: "#FFCC00",
      iconComponent: MaterialCommunityIcons,
    },
  ];

  const handleContinue = () => {
    navigate("RequestAmount", {
      recipient,
      purpose: selectedPurpose,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundinApp }]}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.heading, { color: colors.textPrimary }]}>
          {t("requestPurpose.title")}
        </Text>
        <Text style={[styles.subtext, { color: colors.textSecondary }]}>
          {t("requestPurpose.subtitle")}
        </Text>
      </View>

      {/* Purpose Options */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {purposes.map((purpose) => (
          <TouchableOpacity
            key={purpose.id}
            style={[
              styles.purposeItem,
              { borderColor: colors.modalBackgroun },
              selectedPurpose === purpose.id && { borderColor: purpose.color },
            ]}
            onPress={() => setSelectedPurpose(purpose.id)}
          >
            <View style={styles.purposeLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: purpose.color },
                ]}
              >
                <purpose.iconComponent
                  name={purpose.icon}
                  size={20}
                  color="white"
                />
              </View>
              <View style={styles.purposeText}>
                <Text
                  style={[styles.purposeTitle, { color: colors.textPrimary }]}
                >
                  {purpose.title}
                </Text>
                <Text
                  style={[
                    styles.purposeSubtitle,
                    { color: colors.textSecondary },
                  ]}
                >
                  {purpose.subtitle}
                </Text>
              </View>
            </View>
            {selectedPurpose === purpose.id ? (
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={purpose.color}
              />
            ) : (
              <View style={[styles.checkbox, { borderColor: colors.border }]} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          text={t("common.continue")}
          onPress={handleContinue}
          disabled={!selectedPurpose}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 16,
  },
  backButton: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Poppins",
  },
  subtext: {
    fontSize: 14,
    marginBottom: 24,
    fontFamily: "Poppins",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  purposeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  purposeLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  purposeText: {
    justifyContent: "center",
  },
  purposeTitle: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Poppins",
  },
  purposeSubtitle: {
    fontSize: 14,
    fontFamily: "Poppins",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
});

export default RequestPurpose;
