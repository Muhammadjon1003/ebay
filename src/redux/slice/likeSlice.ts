import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

interface LikeState {
  likedProducts: Product[];
}

const initialState: LikeState = {
  likedProducts: [],
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    likeProduct: (state, action: PayloadAction<Product>) => {
      state.likedProducts.push(action.payload);
      localStorage.setItem('likedProducts', JSON.stringify(state.likedProducts));
    },
    dislikeProduct: (state, action: PayloadAction<Product>) => {
      state.likedProducts = state.likedProducts.filter(
        (product) => product.id !== action.payload.id
      );
      localStorage.setItem('likedProducts', JSON.stringify(state.likedProducts));
    },
  },
});

export const { likeProduct, dislikeProduct } = likeSlice.actions;
export default likeSlice.reducer; 