import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const productId = action.payload.id;
      const product = state.products.find(product => product.id === productId);
      if (product) {
        state.products = state.products.map(product =>
          product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
        );
      } else state.products = [...state.products, { ...action.payload, quantity: 1 }];
    },
    updateItem: (state, action) => {
      const { productId, quantity } = action.payload;
      if (!quantity) state.products = state.products.filter(product => product.id !== productId);
      else
        state.products = state.products.map(product => (product.id === productId ? { ...product, quantity } : product));
    },
  },
});

export const { addItem, updateItem } = cartSlice.actions;

export default cartSlice.reducer;
