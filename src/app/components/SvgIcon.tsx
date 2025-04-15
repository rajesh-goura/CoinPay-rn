import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import Svg, { SvgProps } from 'react-native-svg';

interface SvgIconProps extends SvgProps {
  icon: React.FC<SvgProps>;
  size?: number; // Add 'size' prop
  width?: number;
  height?: number;
  fill?: string;
  style?: StyleProp<ViewStyle>;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  icon: IconComponent,
  size,
  width = 24,
  height = 24,
  fill = 'currentColor',
  style,
  ...rest
}) => {
  return (
    <View style={[{ width: size || width, height: size || height }, style]}>
      <IconComponent
        width="100%"
        height="100%"
        fill={fill}
        {...rest}
      />
    </View>
  );
};

export default SvgIcon;