import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Vibration,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import AnimatedProgressBar from "@/src/app/components/ProgressBar";
import { Ionicons } from "@expo/vector-icons";
import { navigate } from "../../navigation/navigationService";
import { CustomTheme } from "../../themes/Theme";
import { useTranslation } from "react-i18next";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const totalScreens = 13;
const currentScreen = 11;
const progress = currentScreen / totalScreens;

const CreatePasscode = () => {
  const { t } = useTranslation();
  const { colors, dark } = useTheme() as CustomTheme;
  const navigation = useNavigation();
  const [passcode, setPasscode] = useState<string>("");
  const [confirmPasscode, setConfirmPasscode] = useState<boolean>(false);
  const [confirmedPasscode, setConfirmedPasscode] = useState<string>("");

  const handleNumberPress = (num: string) => {
    if (passcode.length < 4) {
      setPasscode(passcode + num);
    }
  };

  const handleBackspace = () => {
    setPasscode(passcode.slice(0, -1));
  };

  const handleSubmit = () => {
    if (!confirmPasscode && passcode.length === 4) {
      setConfirmedPasscode(passcode);
      setPasscode("");
      setConfirmPasscode(true);
    } else if (confirmPasscode && passcode.length === 4) {
      if (passcode === confirmedPasscode) {
        navigate("WelcomeScreen");
      } else {
        Vibration.vibrate(500);
        alert(t("passcode.mismatchError"));
        setPasscode("");
        setConfirmPasscode(false);
        setConfirmedPasscode("");
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <AnimatedProgressBar progress={progress} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={[styles.headingtext, { color: colors.textPrimary }]}>
            {confirmPasscode ? t("passcode.confirmTitle") : t("passcode.createTitle")}
          </Text>
          <Text style={[styles.subtext, { color: colors.textSecondary }]}>
            {confirmPasscode
              ? t("passcode.confirmSubtitle")
              : t("passcode.createSubtitle")}
          </Text>
        </View>

        <View style={styles.passcodeDotsContainer}>
          {[0, 1, 2, 3].map((i) => (
            <View
              key={i}
              style={[
                styles.passcodeDot,
                {
                  backgroundColor: i < passcode.length ? colors.primary : colors.border,
                  borderColor: colors.border,
                },
              ]}
            />
          ))}
        </View>

        {/* Spacer to push number pad lower */}
        <View style={styles.spacer} />

        {/* Number Pad */}
        <View style={[styles.numberPad, {backgroundColor:colors.background}]}>
          {[
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
            ["✓", "0", "⌫"],
          ].map((row, rowIndex) => (
            <View key={rowIndex} style={styles.numberRow}>
              {row.map((num, colIndex) => {
                const isTick = num === "✓";
                const isBackspace = num === "⌫";
                const isDisabledTick = isTick && passcode.length < 4;

                return (
                  <TouchableOpacity
                    key={colIndex}
                    style={[
                      styles.numberButton,
                      {
                        borderColor: colors.border,
                        backgroundColor: isTick ? colors.primary : "transparent",
                        shadowColor: dark ? "#000" : "rgba(0,0,0,0.1)",
                        opacity: isDisabledTick ? 0.5 : 1,
                      },
                    ]}
                    onPress={() => {
                      if (isBackspace) {
                        handleBackspace();
                      } else if (isTick) {
                        if (passcode.length === 4) handleSubmit();
                      } else if (num) {
                        handleNumberPress(num);
                      }
                    }}
                    disabled={isTick && isDisabledTick}
                  >
                    {isBackspace ? (
                      <Ionicons name="backspace-outline" size={24} color={colors.textPrimary} />
                    ) : isTick ? (
                      <Ionicons name="checkmark" size={28} color="white" />
                    ) : (
                      <Text style={[styles.numberText, { color: colors.textPrimary }]}>{num}</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

  
  export default CreatePasscode;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      position: "absolute",
      top: 20,
      left: 20,
      right: 20,
      flexDirection: "column",
      alignItems: "flex-start",
    },
    backButton: {
      marginBottom: 10,
    },
    progressContainer: {
      width: "100%",
      alignItems: "center",
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: screenHeight * 0.15, // Push content down
    },
    textContainer: {
      alignSelf: "flex-start",
      marginBottom: 40,
    },
    headingtext: {
      fontSize: 28,
      fontWeight: "700",
      marginBottom: 8,
      textAlign: "left",
    },
    subtext: {
      fontSize: 16,
      textAlign: "left",
    },
    passcodeDotsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 40,
    },
    passcodeDot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1,
      marginHorizontal: 10,
    },
    spacer: {
      flex: 1,
    },
    numberPad: {
      height: screenHeight * 0.32, // Take 30% of screen height
      justifyContent: "space-between",
      marginBottom: 30,
     
    },
    numberRow: {
      flexDirection: "row",
      justifyContent:"space-between",
      marginBottom: 15,
    },
    numberButton: {
      width: 85,
      height: 50,
      borderRadius: 3, // Circle
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      marginHorizontal: 10,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    numberText: {
      fontSize: 18,
      fontWeight: "300",
    },
  });
  