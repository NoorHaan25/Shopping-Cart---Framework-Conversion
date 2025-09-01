import { createSlice } from "@reduxjs/toolkit";
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      const item = state.find(i => i.id === action.payload.id);
      if (!item) {
        state.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    clearFavorites: () => {
      return [];
    }
  }
});
export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;