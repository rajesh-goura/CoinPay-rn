// src/app/redux/slices/sendMoneySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import firestore from '@react-native-firebase/firestore';


interface Recipient {
    id: string;
    name: string;
    email: string;
    amount?: number;
    image?: any;
  }

interface SendMoneyState {
  recipients: Recipient[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: SendMoneyState = {
  recipients: [],
  loading: false,
  error: null,
  searchQuery: '',
};

const sendMoneySlice = createSlice({
  name: 'sendMoney',
  initialState,
  reducers: {
    setRecipients(state, action: PayloadAction<Recipient[]>) {
      state.recipients = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    clearSendMoneyState(state) {
      state.recipients = [];
      state.loading = false;
      state.error = null;
      state.searchQuery = '';
    },
  },
});

export const {
  setRecipients,
  setLoading,
  setError,
  setSearchQuery,
  clearSendMoneyState,
} = sendMoneySlice.actions;

// Thunk for fetching recipients
export const fetchRecipients = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(
        (querySnapshot) => {
          const users: Recipient[] = [];
          querySnapshot.forEach((documentSnapshot) => {
            const userData = documentSnapshot.data();
            const personalInfo = userData.personalInfo || {};
            
            users.push({
              id: documentSnapshot.id,
              name: personalInfo.fullName || 'No Name',
              email: personalInfo.email || '',
              amount: -100,
              image: require('@/assets/images/user.png'),
            });
          });
          dispatch(setRecipients(users));
          dispatch(setLoading(false));
        },
        (error) => {
          dispatch(setError(error.message));
          dispatch(setLoading(false));
        }
      );

    return unsubscribe;
  } catch (error:any) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export default sendMoneySlice.reducer;