// App.tsx
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor, useAppDispatch } from './app/redux/store'; // Import useAppDispatch
import { Appearance } from 'react-native';
import { updateSystemTheme } from './app/redux/slices/themeSlice';
import MainNavigator from './app/index';

const ThemeListener = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch(); // Use the custom hook here

  useEffect(() => {
    dispatch(updateSystemTheme(Appearance.getColorScheme()));
    
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      dispatch(updateSystemTheme(colorScheme));
    });

    return () => subscription.remove();
  }, [dispatch]);

  return <>{children}</>;
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeListener>
          <MainNavigator />
        </ThemeListener>
      </PersistGate>
    </Provider>
  );
};

export default App;