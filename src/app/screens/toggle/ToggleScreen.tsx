// src/app/screens/toggle/ToggleScreen.tsx
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toggleTheme, enableSystemTheme, setTheme } from '../../redux/slices/themeSlice';

const ToggleScreen = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.theme.mode);
  const systemEnabled = useAppSelector((state) => state.theme.systemEnabled);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleSystemThemeToggle = (value: boolean) => {
    if (value) {
      dispatch(enableSystemTheme());
    } else {
      // When disabling system theme, keep the current appearance
      dispatch(setTheme(currentTheme));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <Text style={styles.optionText}>Dark Mode</Text>
        <Switch
          value={currentTheme === 'dark' && !systemEnabled}
          onValueChange={handleToggleTheme}
          disabled={systemEnabled}
        />
      </View>
      
      <View style={styles.option}>
        <Text style={styles.optionText}>Use System Theme</Text>
        <Switch
          value={systemEnabled}
          onValueChange={handleSystemThemeToggle}
        />
      </View>
      
      <Text style={styles.statusText}>
        Current Theme: {systemEnabled ? 'System (' + currentTheme + ')' : currentTheme}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
  },
  statusText: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default ToggleScreen;