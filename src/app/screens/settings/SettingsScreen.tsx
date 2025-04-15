// Example SettingsScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { useTranslations } from '../../hooks/useTranslation';
import { useTheme } from '@react-navigation/native';

const SettingsScreen = () => {
  const { t } = useTranslations();
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 18, color: colors.text, marginBottom: 20 }}>
        {t('settings.language')}
      </Text>
      <LanguageSwitcher />
    </View>
  );
};

export default SettingsScreen;