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
import CountrySelector from "./screens/accountSetup/CountrySelector";
import PersonalInfo from "./screens/accountSetup/PersonalInfo";
import EmailInfo from "./screens/accountSetup/EmailInfo";
import HomeAddress from "./screens/accountSetup/HomeAddress";
import ScanId from "./screens/accountVerify/ScanId";
import DocumentScan from "./screens/accountVerify/DocumentScan";
import SelfieScreen from "./screens/accountVerify/SelfieScreen";
import SelfieScan from "./screens/accountVerify/SelfieScan";
import AccountSetup from "./screens/accountVerify/AccountSetup";

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
          <Stack.Screen name="CountrySelector" component={CountrySelector} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
          <Stack.Screen name="EmailInfo" component={EmailInfo} />
          <Stack.Screen name="HomeAddress" component={HomeAddress} />
          <Stack.Screen name="ScanId" component={ScanId} />
          <Stack.Screen name="DocumentScan" component={DocumentScan} />
          <Stack.Screen name="SelfieScreen" component={SelfieScreen} />
          <Stack.Screen name="SelfieScan" component={SelfieScan} />
          <Stack.Screen name="AccountSetup" component={AccountSetup} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default MainNavigation;
