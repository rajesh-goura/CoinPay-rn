// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeReducer from './slices/themeSlice';
import { useDispatch } from 'react-redux'; // Add this import

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme'],
  version: 1,
};

const rootReducer = combineReducers({
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

// Type definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Corrected custom dispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();