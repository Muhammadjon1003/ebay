import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  cartStorage: Product[];
}

const initialState: InitialState = {
  cartStorage: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const existingProductIndex = state.cartStorage.findIndex(
        (product) => product.id === id
      );
      if (existingProductIndex === -1) {
        state.cartStorage.push(action.payload);
        console.log(action.payload);
        
      }
    },
    removeFromCart:(state, action) => {
      const { id } = action.payload.product;
      console.log(id, action.payload);
      state.cartStorage = state.cartStorage.filter(product => product.id !== id);
    },
    incrementCount: (state, action) => {
        const product = state.cartStorage.find(product => product.id === action.payload.id);
        if (product?.amount) {
          product.amount += 1;
        }
      },
      decrementCount: (state, action) => {
        const product = state.cartStorage.find(product => product.id === action.payload.id);
        if (product?.amount && product.amount > 1) {
          product.amount -= 1;
        }
      },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, incrementCount, decrementCount } = cartSlice.actions;
