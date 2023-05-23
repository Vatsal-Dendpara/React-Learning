import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.util";

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

export const removeItemFromCart = (cartItems, productToRemove) => {
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

const INITIAL_STATE = {
  cartCount: 0,
  isCartOpen: false,
  cartItems: [],
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_IS_OPEN: "SET_CART_IS_OPEN",
};
export const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_CART_IS_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled action ${type} in user Reducer`);
  }
};
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  clearItemFromCart: () => {},
  removeItemsFromCart: () => {},
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCount = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const total = newCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: total,
        cartCount: newCount,
      })
    );
  };
  const addItemToCart = (productToAdd) => {
    const newCartItems = addToCart(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemsFromCart = (productToRemove) => {
    const newCartItems = removeItemFromCart(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, bool));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    clearItemFromCart,
    cartCount,
    cartTotal,
    addItemToCart,
    removeItemsFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
