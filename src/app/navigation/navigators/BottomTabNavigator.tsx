// BottomTabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../themes/Theme";
import { View, StyleSheet } from "react-native";
import SampleScreen from "./SampleScreen";
import HomePage from "../../screens/homepage/HomePage";
import ScanQr from "../../screens/send/ScanQr";

// Direct SVG imports
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
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 20,
          marginTop: 5,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon 
              width={24} 
              height={24} 
              fill={focused ? colors.primary : colors.textSecondary}
            />
          ),
        }}
      />

      {/* Charts Tab */}
      <Tab.Screen
        name="Charts"
        component={SampleScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <ChartPieIcon 
              width={24} 
              height={24} 
              fill={focused ? colors.primary : colors.textSecondary}
            />
          ),
        }}
      />

      {/* ScanQR Tab - Special Styling */}
      <Tab.Screen
        name="ScanQR"
        component={ScanQr}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.scanTabContainer,
                {
                  backgroundColor: colors.primary,
                },
              ]}
            >
              <ScannerIcon 
                width={24} 
                height={24} 
                fill="white"
              />
            </View>
          ),
        }}
      />

      {/* Chat Tab */}
      <Tab.Screen
        name="Chat"
        component={SampleScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <ChatIcon 
              width={24} 
              height={24} 
              fill={focused ? colors.primary : colors.textSecondary}
            />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name="Profile"
        component={SampleScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <UserIcon 
              width={24} 
              height={24} 
              fill={focused ? colors.primary : colors.textSecondary}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    width: 24,
    height: 24,
  },
  scanTabContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
    marginTop: 10,
  },
  scanTabIcon: {
    width: 24,
    height: 24,
  },
});

export default BottomTabNavigator;