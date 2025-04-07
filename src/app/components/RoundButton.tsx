import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

interface RoundButtonProps {
  onPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
  size?: number;
  style?: ViewStyle;
}

const RoundButton = ({ onPress, iconName, size = 24, style }: RoundButtonProps) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.button,
        { 
          backgroundColor: colors.primary,
          shadowColor: colors.primary,
        },
        style
      ]}
    >
      <Ionicons name={iconName} size={size} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default RoundButton;
