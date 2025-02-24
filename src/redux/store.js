import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { productsReducer } from "./reducers/productsReducer";
import { cartReducer } from "./reducers/cartReducer";

export const store = configureStore({
  reducer: { authReducer, productsReducer, cartReducer },
});
