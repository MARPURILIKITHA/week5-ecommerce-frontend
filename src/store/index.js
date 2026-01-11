import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import wishlistReducer from './wishlistSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
