// src/redux/slices/userSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

interface UserData {
  fullName: string;
  email: string;
}

interface UserState {
  data: UserData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        return rejectWithValue("No authenticated user");
      }

      const userDoc = await firestore()
        .collection("users")
        .doc(currentUser.uid)
        .get();

      if (!userDoc.exists) {
        return rejectWithValue("User document not found");
      }

      const userData = userDoc.data();
      
      return {
        fullName: userData?.personalInfo?.fullName || '',
        email: userData?.personalInfo?.email || currentUser.email || ''
      } as UserData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;