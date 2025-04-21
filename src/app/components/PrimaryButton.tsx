// src/components/buttons/PrimaryButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectThemeMode } from "@/src/app/redux/slices/themeSlice";

interface PrimaryButtonProps {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

const PrimaryButton = ({ 
  onPress, 
  text, 
  disabled = false, 
  fullWidth = true 
}: PrimaryButtonProps) => {
  const themeMode = useSelector(selectThemeMode);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled 
            ? themeMode === "dark" ? "#555" : "#CCC" 
            : "#304FFE",
          width: fullWidth ? "90%" : "auto",
          opacity: disabled ? 0.6 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 20,
    minWidth: 120,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default PrimaryButton;



