import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './Slices/products-slice.js'
import cartSlice from './Slices/cart-slice.js'
import favoritesSlice from './Slices/favorites.slice.js'
import searchSlice from './Slices/search-slice.js'
export const store = configureStore({
  reducer: {
    products:productsSlice,
    cart:cartSlice,
    favorites:favoritesSlice,
    search:searchSlice
  },
})