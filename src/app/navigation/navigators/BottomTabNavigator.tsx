import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../themes/Theme";
import { View, StyleSheet } from "react-native";
import SvgIcon from "../../components/SvgIcon"; // Import the SvgIcon component
import SampleScreen from "./SampleScreen";
import HomePage from "../../screens/homepage/HomePage";
import ScanQr from "../../screens/send/ScanQr";

// Import SVGs
import homeIcon from "@/assets/icons/home.svg";
import chartPieIcon from "@/assets/icons/chart-pie.svg";
import scannerIcon from "@/assets/icons/scanner.svg";
import chatIcon from "@/assets/icons/chat.svg";
import userIcon from "@/assets/icons/user.svg";

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
            <SvgIcon
              xml={homeIcon}
              width={24}
              height={24}
              
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
            <SvgIcon
              xml={chartPieIcon}
              width={24}
              height={24}
              
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
                  borderColor: "white",
                },
              ]}
            >
              <SvgIcon xml={scannerIcon} width={24} height={24} />
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
            <SvgIcon
              xml={chatIcon}
              width={24}
              height={24}
              
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
            <SvgIcon
              xml={userIcon}
              width={24}
              height={24}
              
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