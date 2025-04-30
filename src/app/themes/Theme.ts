import { DefaultTheme, DarkTheme, Theme } from "@react-navigation/native";


export interface CustomTheme extends Theme {
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
      modalBackgroun:string;
      backgroundinApp:string;
  
      // Custom Colors (Explicitly Adding)
      secondary: string;
      success: string;
      warning: string;
      error: string;
      info: string;
  
      backgroundAccent: string;
      backgroundSuccess: string;
      backgroundWarning: string;
      backgroundError: string;
      backgroundInfo: string;
  
      textPrimary: string;
      textSecondary: string;
      textTertiary: string;
      textDisabled: string;
      textAccent: string;
      textWarning: string;
      textError: string;
      textSuccess: string;
  
      borderAccent: string;
      borderSuccess: string;
      borderWarning: string;
      borderError: string;
  
      dividerAccent: string;
      dividerError: string;
      dividerSuccess: string;
      dividerWarning: string;
    };
  }
  
  

export const LightThemeCustom : CustomTheme= {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgba(48, 79, 254, 1)",
    secondary: "rgba(253, 216, 53, 1)",
    success: "rgba(67, 160, 72, 1)",
    warning: "rgba(251, 138, 0, 1)",
    error: "rgba(244, 67, 54, 1)",
    info: "rgba(184, 184, 184, 1)",
    modalBackgroun:"rgba(255, 255, 255, 1)",

    // Background
    background: "rgba(255, 255, 255, 1)",
    backgroundinApp:"rgb(247, 247, 247)",
    backgroundAccent: "rgba(48, 79, 254, 1)",
    backgroundSuccess: "rgba(67, 160, 72, 1)",
    backgroundWarning: "rgba(251, 138, 0, 1)",
    backgroundError: "rgba(244, 67, 54, 1)",
    backgroundInfo: "rgba(144, 202, 249, 255)",

    // Text & Icon
    text: "rgba(0, 0, 0, 255)",
    textPrimary: "rgba(42, 42, 42, 1)",
    textSecondary: "rgba(65, 65, 65, 1)",
    textTertiary: "rgba(90, 90, 90, 1)",
    textDisabled: "rgba(184, 184, 184, 1)",
    textAccent: "rgba(30, 58, 229, 1)",
    textWarning: "rgba(152, 51, 1, 1)",
    textError: "rgba(183, 27, 28, 1)",
    textSuccess: "rgba(27, 94, 33, 1)",

    // Border & Divider
    border: "rgba(208, 208, 208, 1)",
    borderAccent: "rgba(87, 108, 255, 1)",
    borderSuccess: "rgba(102, 187, 107, 1)",
    borderWarning: "rgba(255, 165, 37, 1)",
    borderError: "rgba(244, 67, 54, 1)",
    dividerAccent: "rgba(201, 204, 255, 1)",
    dividerError: "rgba(255, 205, 210, 1)",
    dividerSuccess: "rgba(200, 230, 201, 1)",
    dividerWarning: "rgba(255, 243, 224, 1)",
  },
};

export const DarkThemeCustom : CustomTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: "rgba(48, 79, 254, 1)",
    secondary: "rgba(255, 193, 7, 255)",
    success: "rgba(76, 175, 80, 255)",
    warning: "rgba(255, 152, 0, 255)",
    error: "rgba(244, 67, 54, 255)",
    info: "rgba(33, 150, 243, 255)",
    modalBackgroun:"rgba(40,40,40,1)",

    // Background
    background: "rgba(18, 18, 18, 1)",
    backgroundinApp:"rgba(18, 18, 18, 1)",
    backgroundAccent: "rgba(48, 79, 254, 1)",
    backgroundSuccess: "rgba(67, 160, 72, 1)",
    backgroundWarning: "rgba(251, 138, 0, 1)",
    backgroundError: "rgba(244, 67, 54, 1)",
    backgroundInfo: "rgba(25, 118, 210, 255)",

    // Text & Icon
    text: "rgba(0, 0, 0, 255)",
    textPrimary: "rgba(247, 247, 247, 1)",
    textSecondary: "rgba(232, 232, 232, 1)",
    textTertiary: "rgba(208, 208, 208, 1)",
    textDisabled: "rgba(113, 113, 113, 1)",
    textAccent: "rgba(164, 171, 255, 1)",
    textWarning: "rgba(255, 182, 76, 1)",
    textError: "rgba(239, 154, 154, 1)",
    textSuccess: "rgba(102, 187, 107, 1)",

    // Border & Divider
    border: "rgba(137, 137, 137, 1)",
    borderAccent: "rgba(87, 108, 255, 1)",
    borderSuccess: "rgba(102, 187, 107, 1)",
    borderWarning: "rgba(255, 165, 37, 1)",
    borderError: "rgba(239, 83, 80, 1)",
    dividerAccent: "rgba(25, 33, 76, 1)",
    dividerError: "rgba(74, 30, 26, 1)",
    dividerSuccess: "rgba(30, 53, 31, 1)",
    dividerWarning: "rgba(76, 47, 13, 1)",
  },
};