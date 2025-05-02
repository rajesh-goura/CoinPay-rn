// src/app/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import auth from '@react-native-firebase/auth';

interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
  
}

const initialState: AuthState = {
  token: null,
  isLoading: true, // Start with true to check auth state on app launch
  error: null,
  
};

// Async thunk to load token and card setup status on app start
export const loadToken = createAsyncThunk(
  'auth/loadToken',
  async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      const hasCompletedCardSetup = await SecureStore.getItemAsync('hasCompletedCardSetup');
      return {
        token,
        hasCompletedCardSetup: hasCompletedCardSetup === 'true'
      };
    } catch (error) {
      throw new Error('Failed to load token');
    }
  }
);

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      );
      const user = userCredential.user;
      
      if (user && !user.emailVerified) {
        await auth().signOut();
        return rejectWithValue('EMAIL_NOT_VERIFIED');
      }

      const token = await user?.getIdToken() || user?.uid || 'custom-token';
      await SecureStore.setItemAsync('userToken', token);
      
      // Check if user has completed card setup
      const hasCompletedCardSetup = await SecureStore.getItemAsync('hasCompletedCardSetup');
      
      return {
        token,
        hasCompletedCardSetup: hasCompletedCardSetup === 'true'
      };
    } catch (error: any) {
      let errorMessage = 'Login failed';
      
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'User not found';
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await auth().signOut();
      await SecureStore.deleteItemAsync('userToken');
      
    } catch (error) {
      throw new Error('Logout failed');
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Load Token cases
      .addCase(loadToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        
        state.isLoading = false;
      })
      .addCase(loadToken.rejected, (state) => {
        state.isLoading = false;
      })
      
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
       
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Logout cases
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.isLoading = false;
        
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      })
      
  }
});

export default authSlice.reducer;