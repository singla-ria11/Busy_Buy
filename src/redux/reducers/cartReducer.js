//

import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  cartItems: [],
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    addToCart: (state, action) => {
      console.log("addToCart action executed!");

      state.cartItems.unshift({ ...action.payload.item, quantity: 1 });
    },

    incQuantity: (state, action) => {
      console.log("incQuantity action executed!");

      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.item.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    },

    decQuantity: (state, action) => {
      console.log("decQuantity action executed!");

      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.item.id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
    },
    removeFromCart: (state, action) => {
      console.log("removeCart action executed!");

      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.item.id
      );
    },
    clearCart: (state) => {
      console.log("clearCart action executed!");

      state.cartItems = [];
    },
    setError: (state, action) => {
      console.log("setError action executed!");

      state.error = action.payload;
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const cartActions = cartSlice.actions;

export const cartSelector = (state) => state.cartReducer;
