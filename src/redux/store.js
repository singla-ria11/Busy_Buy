import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { productsReducer } from "./reducers/productsReducer";
import { cartReducer } from "./reducers/cartReducer";
import { myOrdersReducer } from "./reducers/myOrdersReducer";

export const store = configureStore({
  reducer: { authReducer, productsReducer, cartReducer, myOrdersReducer },
});
