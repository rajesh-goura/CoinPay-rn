import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./navigation/navigationService";
import Onboarding1 from "./screens/onboarding/Onboarding1";
import Home from "./screens/Home";

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <>
      {/* StatusBar Fix */}
      <StatusBar barStyle="light-content" backgroundColor="#304FFE" />

      {/* Navigation Container */}
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Onboarding1"
        >
          <Stack.Screen name="Onboarding1" component={Onboarding1} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default MainNavigation;
