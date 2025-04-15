import React from "react";
import { SvgXml } from "react-native-svg";

interface SvgIconProps {
  xml: string; // The SVG XML content
  width?: number; // Width of the icon
  height?: number; // Height of the icon
}

const SvgIcon: React.FC<SvgIconProps> = ({ xml, width = 24, height = 24 }) => {
  return <SvgXml xml={xml} width={width} height={height} />;
};

export default SvgIcon;
