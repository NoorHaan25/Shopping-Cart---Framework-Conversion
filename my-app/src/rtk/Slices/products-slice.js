import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";
export const fetchProducts = createAsyncThunk(
  "productsSlice/fetchProducts",
  async () => {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      throw new Error(error.message);
    }
    console.log('fetched products:', data);
    
    return data;
  }
);
const productsSlice = createSlice({
  name: "productsSlice",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
