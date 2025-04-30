// src/app/redux/slices/cardsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

export type Card = {
  id: string;
  lastFour: string;
  type: "visa" | "mastercard" | "amex" | "other";
  name: string;
  expiry: string;
  createdAt?: Date;
};

interface CardsState {
  cards: Card[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CardsState = {
  cards: [],
  isLoading: false,
  error: null,
};

// Async thunk to fetch cards from Firestore
export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (_, { rejectWithValue }) => {
    try {
      const user = auth().currentUser;
      if (!user) {
        return rejectWithValue('User not authenticated');
      }
      
      const cardsSnapshot = await firestore()
        .collection('cards')
        .doc(user.uid)
        .collection('userCards')
        .orderBy('createdAt', 'desc')
        .get();
      
      const cardsData = cardsSnapshot.docs.map(doc => ({
        id: doc.id,
        lastFour: doc.data().lastFour,
        type: doc.data().type || 'other',
        name: doc.data().accountHolderName,
        expiry: doc.data().expiryDate,
        createdAt: doc.data().createdAt?.toDate().toISOString(),
      }));
      
      return cardsData;
    } catch (error) {
      console.error("Error fetching cards:", error);
      return rejectWithValue('Failed to fetch cards');
    }
  }
);

// Async thunk to delete a card
export const deleteCard = createAsyncThunk(
  'cards/deleteCard',
  async (cardId: string, { rejectWithValue }) => {
    try {
      const user = auth().currentUser;
      if (!user) {
        return rejectWithValue('User not authenticated');
      }
      
      await firestore()
        .collection('cards')
        .doc(user.uid)
        .collection('userCards')
        .doc(cardId)
        .delete();
      
      return cardId;
    } catch (error) {
      console.error("Error deleting card:", error);
      return rejectWithValue('Failed to delete card');
    }
  }
);

// Async thunk to add a new card
export const addCard = createAsyncThunk(
  'cards/addCard',
  async (cardData: Omit<Card, 'id'>, { rejectWithValue }) => {
    try {
      const user = auth().currentUser;
      if (!user) {
        return rejectWithValue('User not authenticated');
      }
      
      const docRef = await firestore()
        .collection('cards')
        .doc(user.uid)
        .collection('userCards')
        .add({
          ...cardData,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      
      return {
        id: docRef.id,
        ...cardData,
        createdAt: new Date(),
      };
    } catch (error) {
      console.error("Error adding card:", error);
      return rejectWithValue('Failed to add card');
    }
  }
);

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    // You can add manual reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cards
      .addCase(fetchCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Delete Card
      .addCase(deleteCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.cards = state.cards.filter(card => card.id !== action.payload);
        state.isLoading = false;
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Add Card
      .addCase(addCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.cards.unshift(action.payload);
        state.isLoading = false;
      })
      .addCase(addCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default cardsSlice.reducer;