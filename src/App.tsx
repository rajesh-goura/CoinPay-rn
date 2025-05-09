// Core Libraries
import React, { useEffect } from "react";
import { Appearance, LogBox } from "react-native";

// State Management
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/redux/store";
import { updateSystemTheme } from "./app/redux/slices/themeSlice";
import { loadToken } from "./app/redux/slices/authSlice";

// App Components
import MainNavigator from "./app/index";

// Localization
import "./app/localization/i18n";

// Ignore all Firebase deprecation warnings
LogBox.ignoreLogs([
  /\[react-native-firebase\]/,
  /deprecated/i,
  /React Native Firebase namespaced API/i,
  /Method called was `.*`/i,
  /Please use `.*` instead/i,
  /NOBRIDGE/,
]);

const ThemeListener = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Set initial theme
    store.dispatch(updateSystemTheme(Appearance.getColorScheme()));

    // Listen for theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      store.dispatch(updateSystemTheme(colorScheme));
    });

    return () => subscription.remove();
  }, []);

  return <>{children}</>;
};

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Load token when app starts
    store.dispatch(loadToken());
  }, []);

  return <>{children}</>;
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthInitializer>
          <ThemeListener>
            <MainNavigator />
          </ThemeListener>
        </AuthInitializer>
      </PersistGate>
    </Provider>
  );
};

export default App;