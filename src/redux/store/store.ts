import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slice/cartSlice';
import likeReducer from '../slice/likeSlice';

// Load initial state from localStorage
const preloadedState = {
  cart: {
    cartStorage: JSON.parse(localStorage.getItem('cartStorage') || '[]')
  },
  like: {
    likedProducts: JSON.parse(localStorage.getItem('likedProducts') || '[]')
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    like: likeReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Subscribe to store changes to sync with localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cartStorage', JSON.stringify(state.cart.cartStorage));
  localStorage.setItem('likedProducts', JSON.stringify(state.like.likedProducts));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 