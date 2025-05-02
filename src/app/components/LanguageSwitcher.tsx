// src/app/components/LanguageSwitcher.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslations } from '../hooks/useTranslation';
import { useTheme } from '@react-navigation/native';

const LanguageSwitcher = () => {
  const { changeLanguage, currentLanguage } = useTranslations();
  const { colors } = useTheme();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'od', name: 'ଓଡ଼ିଆ' }
  ];

  return (
    <View style={styles.container}>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          onPress={() => changeLanguage(lang.code)}
          style={[
            styles.button,
            { 
              backgroundColor: currentLanguage === lang.code ? colors.primary : colors.card,
              borderColor: colors.border
            }
          ]}
        >
          <Text style={[
            styles.text,
            { color: currentLanguage === lang.code ? '#fff' : colors.textPrimary }
          ]}>
            {lang.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  text: {
    fontSize: 14,
  },
});

export default LanguageSwitcher;