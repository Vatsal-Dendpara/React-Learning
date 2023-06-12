import { createSlice } from "@reduxjs/toolkit";

export const INITIAL_STATE = {
  cartCount: 0,
  isCartOpen: false,
  cartItems: [],
  cartTotal: 0,
};

export const addToCart = (cartItems, productToAdd) => {
  const existingCartItems = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  if (existingCartItems) {
    return cartItems.map((item) => {
      return item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItems = cartItems.find(
    (item) => item.id === productToRemove.id
  );

  if (existingCartItems.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }

  return cartItems.map((item) => {
    return item.id === productToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item;
  });
};

export const clearCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((item) => item.id !== cartItemToRemove.id);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    addItemToCart(state, action) {
      state.cartItems = addToCart(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart(state, action) {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
  },
});

export const {
  setIsCartOpen,
  clearItemFromCart,
  removeItemFromCart,
  addItemToCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
