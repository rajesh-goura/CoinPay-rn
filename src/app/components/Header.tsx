import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import AnimatedProgressBar from "@/src/app/components/ProgressBar";
import { CustomTheme } from "../../app/themes/Theme";

const { width: screenWidth } = Dimensions.get("window");

type HeaderProps = {
  progress: number;
  showBackButton?: boolean;
};

const Header = ({ progress, showBackButton = true }: HeaderProps) => {
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation();

  return (
    <View>
      {showBackButton && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
      )}
      <View style={styles.progressContainer}>
        <AnimatedProgressBar progress={progress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginTop: 20,
    marginBottom: 10,
    left: 10,
  },
  progressContainer: {
    width: "100%",
    alignItems: "center",
  },
});

export default Header;