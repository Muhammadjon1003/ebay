import { configureStore } from '@reduxjs/toolkit';
import likeReducer from "../slice/likeSlice";
import cartReducer from "../slice/cartSlice"; // Import the cart reducer
import { loadFromLocalStorage } from '../../Utils';

// Load liked products and cart items from local storage
const likedProducts = loadFromLocalStorage('likedProducts') || [];
const cartStorage = loadFromLocalStorage('cartStorage') || [];

const preloadedState = {
  like: {
    likedProducts,
  },
  cart: {
    cartStorage,
  },
};

export const store = configureStore({
  reducer: {
    like: likeReducer,
    cart: cartReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
