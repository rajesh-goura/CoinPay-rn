// src/app/index.tsx
import React, { useEffect } from "react";
import { StatusBar, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./navigation/navigationService";
import { DarkThemeCustom, LightThemeCustom } from "../app/themes/Theme";
import { useAppSelector, useAppDispatch } from "../app/redux/store";
import { loadToken } from "../app/redux/slices/authSlice";

// Auth Screens
import Onboarding from "./screens/onboarding/Onboarding";
import Signup from "./screens/registration/Signup";
import CreateAccount from "./screens/registration/CreateAccount";
import EmailVerification from "./screens/registration/EmailVerification";
import Login from "./screens/login/Login";
import ForgotPassword from "./screens/login/ForgotPassword";

// Setup Screens
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

// Main App Screens
import AddCard from "./screens/addCard/AddCard";
import BottomTabNavigator from "./navigation/navigators/BottomTabNavigator";
import CardDetails from "./screens/addCard/CardDetails";
import CardVerify from "./screens/addCard/CardVerify";
import CardList from "./screens/addCard/CardList";
import SendMoney from "./screens/send/SendMoney";
import SendAmount from "./screens/send/SendAmount";
import Purpose from "./screens/send/Purpose";
import SelectAccount from "./screens/send/SelectAccount";
import PaymentCompleted from "./screens/send/PaymentCompleted";
import ScanQr from "./screens/send/ScanQr";
import SettingsScreen from "./screens/settings/SettingsScreen";
import UpdateMoney from "./screens/balance/UpdateMoney";
import QrCode from "./screens/receive/QrCode";
import RequestRecipient from "./screens/receive/RequestRecipient";
import RequestPurpose from "./screens/receive/RequestPurpose";
import RequestAmount from "./screens/receive/RequestAmount";
import SendRequest from "./screens/receive/SendRequest";
import SpendingScreen from "./screens/spend/SpendingScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";
import ToggleScreen from "./screens/toggle/ToggleScreen";
import { selectThemeMode } from "./redux/slices/themeSlice";
import SampleScreen from "./navigation/navigators/SampleScreen";
import { fetchCards } from "../app/redux/slices/cardSlice";

const Stack = createStackNavigator();

const RootNavigator = () => {
  const dispatch = useAppDispatch();
  const { token, isLoading: isAuthLoading } = useAppSelector((state) => state.auth);
  const { cards, isLoading: isCardsLoading } = useAppSelector((state) => state.cards);
  const themeMode = useAppSelector(selectThemeMode);

  // Load token and cards when token changes
  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch]);

  // Fetch cards when token is available
  useEffect(() => {
    if (token) {
      dispatch(fetchCards());
    }
  }, [dispatch, token]);

  if (isAuthLoading || (token && isCardsLoading)) {
    return (
      <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' },{backgroundColor: themeMode === "dark" ? "#000" : "#fff"}]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={themeMode === "dark" ? DarkThemeCustom : LightThemeCustom}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          // Auth Stack
          <>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="EmailVerification" component={EmailVerification} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            
            {/* Setup Screens */}
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
          </>
        ) : (
          // Main App Stack
          <>
            {cards.length === 0 ? (
              // Mandatory first-time card flow
              <Stack.Group>
                <Stack.Screen name="AddCard" component={AddCard} />
                <Stack.Screen name="CardDetails" component={CardDetails} />
                <Stack.Screen name="CardVerify" component={CardVerify} />
                <Stack.Screen name="CardList" component={CardList} />
                <Stack.Screen name="MainApp" component={BottomTabNavigator} />
              </Stack.Group>
            ) : (
              // Main app with optional add card flow
              <>
                <Stack.Screen name="MainApp" component={BottomTabNavigator} />
                <Stack.Screen name="AddCard" component={AddCard} />
                <Stack.Screen name="CardDetails" component={CardDetails} />
                <Stack.Screen name="CardVerify" component={CardVerify} />
                <Stack.Screen name="CardLirst" component={CardList} />
              </>
            )}
            
            {/* Shared screens available everywhere */}
            <Stack.Group>
              <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
              <Stack.Screen name="UpdateMoney" component={UpdateMoney} />
              <Stack.Screen name="SendMoney" component={SendMoney} />
              <Stack.Screen name="SendAmount" component={SendAmount} />
              <Stack.Screen name="Purpose" component={Purpose} />
              <Stack.Screen name="SelectAccount" component={SelectAccount} />
              <Stack.Screen name="PaymentCompleted" component={PaymentCompleted} />
              <Stack.Screen name="ScanQr" component={ScanQr} />
              <Stack.Screen name="QrCode" component={QrCode} />
              <Stack.Screen name="RequestRecipient" component={RequestRecipient} />
              <Stack.Screen name="RequestPurpose" component={RequestPurpose} />
              <Stack.Screen name="RequestAmount" component={RequestAmount} />
              <Stack.Screen name="SendRequest" component={SendRequest} />
              <Stack.Screen name="SpendingScreen" component={SpendingScreen} />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
              <Stack.Screen name="ToggleScreen" component={ToggleScreen} />
              <Stack.Screen name="SampleScreen" component={SampleScreen} />
            </Stack.Group>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainNavigation = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#304FFE" />
      <RootNavigator />
    </>
  );
};

export default MainNavigation;
