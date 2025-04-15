// src/hooks/useTranslation.ts
import { useTranslation } from "react-i18next";

export const useTranslations = () => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return { 
    t, 
    changeLanguage, 
    currentLanguage: i18n.language 
  };
};