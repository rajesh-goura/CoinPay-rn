// src/store/theme/ThemeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance, ColorSchemeName } from 'react-native';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  systemEnabled: boolean;
}

// Get initial theme from device preferences
const deviceTheme = Appearance.getColorScheme();

const initialState: ThemeState = {
  mode: deviceTheme ?? 'light', // Default to light if cannot detect
  systemEnabled: true, // Whether to follow system theme by default
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Toggle between light/dark (manual override)
    toggleTheme: (state) => {
      state.systemEnabled = false;
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    
    // Set specific theme (manual override)
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.systemEnabled = false;
      state.mode = action.payload;
    },
    
    // Enable system theme tracking
    enableSystemTheme: (state) => {
      state.systemEnabled = true;
      state.mode = Appearance.getColorScheme() ?? 'light';
    },
    
    // Update theme when system changes (only if systemEnabled is true)
    updateSystemTheme: (state, action: PayloadAction<ColorSchemeName>) => {
      if (state.systemEnabled) {
        state.mode = action.payload ?? 'light';
      }
    },
    
    // Reset to initial state
    resetTheme: () => initialState,
  },
});

// Action creators
export const { 
  toggleTheme, 
  setTheme, 
  enableSystemTheme, 
  updateSystemTheme,
  resetTheme 
} = themeSlice.actions;

// Selectors
export const selectThemeMode = (state: { theme: ThemeState }) => state.theme.mode;
export const selectSystemEnabled = (state: { theme: ThemeState }) => state.theme.systemEnabled;

export default themeSlice.reducer;