import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../themes/Theme";
import { View, StyleSheet } from "react-native";
import SampleScreen from "./SampleScreen";
import HomePage from "../../screens/homepage/HomePage";
import ScanQr from "../../screens/send/ScanQr";
import SvgIcon from "../../components/SvgIcon";

// Import SVGs as React components
import HomeIcon from '@/assets/icons/home.svg';
import ChartPieIcon from '@/assets/icons/chart-pie.svg';
import ScannerIcon from '@/assets/icons/scanner.svg';
import ChatIcon from '@/assets/icons/chat.svg';
import UserIcon from '@/assets/icons/user.svg';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { colors } = useTheme() as CustomTheme;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.modalBackgroun,
          borderTopWidth: 0,
          shadowColor: "transparent",
          borderRadius: 10,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          marginHorizontal: 15,
          marginBottom: 20,
          marginTop: 5,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <SvgIcon 
              icon={HomeIcon}
              color={focused ? colors.primary : colors.textSecondary}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Charts"
        component={SampleScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SvgIcon 
              icon={ChartPieIcon}
              color={focused ? colors.primary : colors.textSecondary}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ScanQR"
        component={ScanQr}
        options={{
          tabBarIcon: () => (
            <View style={[styles.scanTabContainer, { backgroundColor: colors.primary }]}>
              <SvgIcon 
                icon={ScannerIcon}
                color="white"
                size={24}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={SampleScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SvgIcon 
              icon={ChatIcon}
              color={focused ? colors.primary : colors.textSecondary}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={SampleScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SvgIcon 
              icon={UserIcon}
              color={focused ? colors.primary : colors.textSecondary}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  scanTabContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -28, // Pull the button up slightly
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default BottomTabNavigator;