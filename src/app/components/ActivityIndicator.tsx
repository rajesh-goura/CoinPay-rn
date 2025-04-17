import React from 'react';
import { ActivityIndicator as RNActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface ActivityIndicatorProps {
  size?: 'small' | 'large' | number;
}

const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({ size = 'large' }) => {
  const { colors } = useTheme();
  
  return <RNActivityIndicator size={size} color={colors.primary} />;
};

export default ActivityIndicator;