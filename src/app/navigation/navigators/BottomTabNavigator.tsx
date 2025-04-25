import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { Image } from 'expo-image';

import { CustomTheme } from "../../themes/Theme";

import HomePage from "../../screens/homepage/HomePage";
import ScanQr from "../../screens/send/ScanQr";
import SpendingScreen from "../../screens/spend/SpendingScreen";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import ToggleScreen from "../../screens/toggle/ToggleScreen";


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
            <View style={styles.tabIconContainer}>
              <Image
                source={require("@/assets/icons/home.svg")}
                style={[
                  styles.tabIcon,
                  { tintColor: focused ? colors.primary : colors.textSecondary },
                ]}
              />
              {focused && <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]} />}
            </View>
          ),
        }}
      />

      {/* Charts Tab */}
      <Tab.Screen
        name="Charts"
        component={SpendingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <Image
                source={require("@/assets/icons/chart-pie.svg")}
                style={[
                  styles.tabIcon,
                  { tintColor: focused ? colors.primary : colors.textSecondary },
                ]}
              />
              {focused && <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]} />}
            </View>
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
                  borderColor: "white",
                },
              ]}
            >
              <Image
                source={require("@/assets/icons/scanner.svg")}
                style={[styles.scanTabIcon, { tintColor: "white" }]}
              />
            </View>
          ),
        }}
      />

      {/* Chat Tab */}
      <Tab.Screen
        name="Chat"
        component={ToggleScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <Image
                source={require("@/assets/icons/chat.svg")}
                style={[
                  styles.tabIcon,
                  { tintColor: focused ? colors.primary : colors.textSecondary },
                ]}
              />
              {focused && <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]} />}
            </View>
          ),
        }}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <Image
                source={require("@/assets/icons/user.svg")}
                style={[
                  styles.tabIcon,
                  { tintColor: focused ? colors.primary : colors.textSecondary },
                ]}
              />
              {focused && <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]} />}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  activeIndicator: {
    width: 4,
    height: 4,
    borderRadius: 3,
    marginTop: 2,
  },
});

export default BottomTabNavigator;