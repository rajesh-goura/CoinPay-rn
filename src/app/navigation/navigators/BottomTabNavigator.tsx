// BottomTabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import SampleScreen from "./SampleScreen";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../themes/Theme";
import { View, StyleSheet } from "react-native";

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
          borderTopWidth:0,
          shadowColor:"transparent",
          borderRadius:10,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          justifyContent:"center",
          alignItems:"center",
          marginLeft:15,
          marginRight:15,
          marginBottom:20,
          marginTop:5,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="Home"
        component={SampleScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Charts Tab */}
      <Tab.Screen
        name="Charts"
        component={SampleScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="pie-chart-outlined" size={size} color={color} />
          ),
        }}
      />

      {/* ScanQR Tab - Special Styling */}
      <Tab.Screen
        name="ScanQR"
        component={SampleScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[
              styles.scanTabContainer,
              {
                backgroundColor: colors.primary,
                borderColor: 'white',
              }
            ]}>
              <Ionicons 
                name="scan-outline" 
                size={size} 
                color="white" // Always white icon
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name="Profile"
        component={SampleScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-o" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  scanTabContainer: {
    width: 60,
    height: 60,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    marginTop:10, // Pull the tab up slightly
  },
});

export default BottomTabNavigator;