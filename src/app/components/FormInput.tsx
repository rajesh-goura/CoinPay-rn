// FormInput.tsx 
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { CustomTheme } from "../../app/themes/Theme";

interface FormInputProps {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  colors: CustomTheme['colors'];
  style?: object;
  [key: string]: any; 
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  colors,
  style = {},
  ...props
}) => {
  return (
    <>
      <Text style={[styles.subtext1, { color: colors.textSecondary }]}>{label}</Text>
      <View style={styles.inputWithIconContainer}>
        <View style={styles.leftInputIcon}>{icon}</View>
        <TextInput
          style={[
            styles.inputWithIconField,
            { 
              borderColor: colors.border,
              color: colors.textPrimary,
              backgroundColor: colors.modalBackgroun,
            },
            style,
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          {...props} // Spread any additional TextInput props
        />
      </View>
    </>
  );
};

// Reuse your existing styles
const styles = StyleSheet.create({
  subtext1: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 10,
  },
  inputWithIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  inputWithIconField: {
    flex: 1,
    padding: 15,
    paddingLeft: 50,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  leftInputIcon: {
    position: "absolute",
    left: 15,
    zIndex: 1,
  },
});

export default FormInput;