import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

interface CartProduct extends Product {
  amount: number;
}

interface CartState {
  cartStorage: CartProduct[];
}

const loadInitialState = (): CartState => {
  try {
    const savedCart = localStorage.getItem('cartStorage');
    return savedCart ? { cartStorage: JSON.parse(savedCart) } : { cartStorage: [] };
  } catch {
    return { cartStorage: [] };
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadInitialState(),
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      state.cartStorage = [...state.cartStorage, action.payload];
      localStorage.setItem('cartStorage', JSON.stringify(state.cartStorage));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartStorage = state.cartStorage.filter(item => item.id !== action.payload);
      localStorage.setItem('cartStorage', JSON.stringify(state.cartStorage));
    },
    clearCart: (state) => {
      state.cartStorage = [];
      localStorage.removeItem('cartStorage');
    },
    updateCartItemAmount: (state, action: PayloadAction<{ id: number; amount: number }>) => {
      state.cartStorage = state.cartStorage.map(item => 
        item.id === action.payload.id 
          ? { ...item, amount: action.payload.amount }
          : item
      );
      localStorage.setItem('cartStorage', JSON.stringify(state.cartStorage));
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCartItemAmount } = cartSlice.actions;
export default cartSlice.reducer; 