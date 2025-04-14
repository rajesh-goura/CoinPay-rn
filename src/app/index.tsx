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
import CountrySelector from "./screens/accountSetup/CountrySelector";
import PersonalInfo from "./screens/accountSetup/PersonalInfo";
import EmailInfo from "./screens/accountSetup/EmailInfo";
import HomeAddress from "./screens/accountSetup/HomeAddress";
import ScanId from "./screens/accountVerify/ScanId";
import DocumentScan from "./screens/accountVerify/DocumentScan";
import SelfieScreen from "./screens/accountVerify/SelfieScreen";
import SelfieScan from "./screens/accountVerify/SelfieScan";
import AccountSetup from "./screens/accountVerify/AccountSetup";
import pinSetup from "./screens/pinSetup/pinSetup";
import WelcomeScreen from "./screens/welcome/WelcomeScreen";
import Login from "./screens/login/Login";
import AddCard from "./screens/addCard/AddCard";
import CardDetails from "./screens/addCard/CardDetails";
import CardVerify from "./screens/addCard/CardVerify";
import CardList from "./screens/addCard/CardList";
import EmailVerification from "./screens/registration/EmailVerification";
import ForgotPassword from "./screens/login/ForgotPassword";
import BottomTabNavigator from "./navigation/navigators/BottomTabNavigator";
import SendMoney from "./screens/send/SendMoney";
import SendAmount from "./screens/send/SendAmount";
import Purpose from "./screens/send/Purpose";
import SelectAccount from "./screens/send/SelectAccount";
import PaymentCompleted from "./screens/send/PaymentCompleted";

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
          initialRouteName="SendMoney"
        >
          <Stack.Screen name="Onboarding1" component={Onboarding1} />

          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="EmailVerification" component={EmailVerification} />
          <Stack.Screen name="CountrySelector" component={CountrySelector} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
          <Stack.Screen name="EmailInfo" component={EmailInfo} />
          <Stack.Screen name="HomeAddress" component={HomeAddress} />
          <Stack.Screen name="ScanId" component={ScanId} />
          <Stack.Screen name="DocumentScan" component={DocumentScan} />
          <Stack.Screen name="SelfieScreen" component={SelfieScreen} />
          <Stack.Screen name="SelfieScan" component={SelfieScan} />
          <Stack.Screen name="AccountSetup" component={AccountSetup} />
          <Stack.Screen name="pinSetup" component={pinSetup} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="AddCard" component={AddCard} />
          <Stack.Screen name="CardDetails" component={CardDetails} />
          <Stack.Screen name="CardVerify" component={CardVerify} />
          <Stack.Screen name="CardList" component={CardList} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="MainApp" component={BottomTabNavigator} />
          <Stack.Screen name="SendMoney" component={SendMoney} />
          <Stack.Screen name="SendAmount" component={SendAmount} />
          <Stack.Screen name="Purpose" component={Purpose} />
          <Stack.Screen name="SelectAccount" component={SelectAccount} />
          <Stack.Screen name="PaymentCompleted" component={PaymentCompleted} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default MainNavigation;
