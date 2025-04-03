import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./navigation/navigationService";
import Onboarding1 from "./screens/onboarding/Onboarding1";
import { DarkThemeCustom, LightThemeCustom } from "../app/themes/Theme";
import Signup from "./screens/registration/Signup";
import CreateAccount from "./screens/registration/CreateAccount";
import { useColorScheme } from "react-native";
import ConfirmPhone from "./screens/registration/ConfirmPhone";

const Stack = createStackNavigator();

const MainNavigation = () => {
  const systemTheme = useColorScheme();
  return (
    <>
      {/* StatusBar Fix */}
      <StatusBar barStyle="light-content" backgroundColor="#304FFE" />

      {/* Navigation Container */}
      <NavigationContainer ref={navigationRef} theme={systemTheme === "dark" ? DarkThemeCustom : LightThemeCustom}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Onboarding1"
        >
          <Stack.Screen name="Onboarding1" component={Onboarding1} />

          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="ConfirmPhone" component={ConfirmPhone} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default MainNavigation;
