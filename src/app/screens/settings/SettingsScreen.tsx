// Example SettingsScreen.tsx
import React from 'react';
import { View, Text , StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

import LanguageSwitcher from '../../components/LanguageSwitcher';
import { useTranslations } from '../../hooks/useTranslation';

const SettingsScreen = () => {
  const { t } = useTranslations();
  const { colors } = useTheme();

  return (
    <View style={styles.settings}>
      <Text style={{ fontSize: 18, color: colors.textPrimary, marginBottom: 20 }}>
        {t('settings.language')}
      </Text>
      <LanguageSwitcher />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  settings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});