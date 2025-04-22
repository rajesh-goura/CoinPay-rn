import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Appearance } from 'react-native';

import { store, persistor } from './app/redux/store';
import { updateSystemTheme } from './app/redux/slices/themeSlice';
import { loadToken } from './app/redux/slices/authSlice';
import MainNavigator from './app/index';
import "./app/localization/i18n";
import { ThemeProvider } from '@react-navigation/native';


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