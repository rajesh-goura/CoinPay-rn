import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

type Transaction = {
  amount: number;
};

type UserDataState = {
  balance: number;
  transactionTotals: {
    spending: number;
    income: number;
    bills: number;
    savings: number;
  };
  isLoading: boolean;
  error: string | null;
};

const initialState: UserDataState = {
  balance: 0,
  transactionTotals: {
    spending: 0,
    income: 0,
    bills: 7500,
    savings: 33000,
  },
  isLoading: false,
  error: null,
};

export const fetchUserData = createAsyncThunk(
  "userData/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const user = auth().currentUser;
      if (!user) {
        return rejectWithValue("No user logged in.");
      }

      const userDoc = await firestore().collection("users").doc(user.uid).get();

      if (!userDoc.exists) {
        return rejectWithValue("User document not found.");
      }

      const data = userDoc.data();
      const balance = data?.balance || 0;

      const sent: Transaction[] = data?.sent || [];
      const received: Transaction[] = data?.received || [];

      const spending = sent.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
      const income = received.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

      return {
        balance,
        transactionTotals: {
          spending,
          income,
          bills: 7500,
          savings: 33000,
        },
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong.");
    }
  }
);

export const updateBalance = createAsyncThunk(
  "userData/updateBalance",
  async (
    { operation, amount }: { operation: "add" | "deduct"; amount: number },
    { rejectWithValue }
  ) => {
    try {
      const user = auth().currentUser;
      if (!user) {
        return rejectWithValue("No user logged in.");
      }

      const numericAmount = operation === "add" ? amount : -amount;

      await firestore()
        .collection("users")
        .doc(user.uid)
        .update({
          balance: firestore.FieldValue.increment(numericAmount),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      return { amount: numericAmount };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update balance");
    }
  }
);

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance = action.payload.balance;
        state.transactionTotals = action.payload.transactionTotals;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateBalance.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance += action.payload.amount;
      })
      .addCase(updateBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default userDataSlice.reducer;