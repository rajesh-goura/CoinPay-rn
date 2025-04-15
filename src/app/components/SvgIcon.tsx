import React from "react";
import { SvgXml } from "react-native-svg";

interface SvgIconProps {
  xml: string;
  width?: number;
  height?: number;
  color?: string;
  style?: any;
}

const SvgIcon: React.FC<SvgIconProps> = ({ 
  xml, 
  width = 24, 
  height = 24, 
  color, 
  style 
}) => {
  return (
    <SvgXml 
      xml={xml} 
      width={width} 
      height={height} 
      fill={color} 
      style={style}
    />
  );
};

export default SvgIcon;