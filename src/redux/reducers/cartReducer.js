//

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firestoreInit";
import { getProducts } from "../../Utils/firestoreUtils";
import { addNewOrderAsync } from "./myOrdersReducer";

const INITIAL_STATE = {
  cartItems: [],
  databaseCart: [],
  isLoading: false,
  error: null,
};

export const getUserCartProductsAsync = createAsyncThunk(
  "cart/getUserCartProducts",
  async (currentUser, { getState, rejectWithValue }) => {
    try {
      const snapshot = await getDoc(doc(db, "usersCart", currentUser.uid));
      const databaseCart = snapshot.exists()
        ? snapshot.data().myCart || []
        : [];
      const { userCart } = await getProducts(currentUser, databaseCart);
      return { userCart, databaseCart };
    } catch (error) {
      console.log(error.message);

      return rejectWithValue(error.message);
    }
  }
);

// Create Async Thunks....................................................................
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async (payload, { rejectWithValue }) => {
    try {
      const { item, currentUser } = payload;

      // Adding new product to the current user's cart
      await setDoc(
        doc(db, "usersCart", currentUser.uid),
        {
          myCart: arrayUnion({
            productId: item.id,
            quantity: 1,
          }),
        },
        { merge: true }
      );

      // Getting the current user's cart products
      // const { userCart, databaseCart } = await getUserCartProducts(currentUser);
      return { item };
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateQuantityAsync = createAsyncThunk(
  "cart/incQuantityAsync",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const { currentUser, type } = payload;
      const { cartItems, databaseCart } = getState().cartReducer;
      // const { userCart, databaseCart } = await getUserCartProducts(currentUser);

      const updatedCartItems = cartItems.map((item) => {
        if (item.id === payload.item.id) {
          return {
            ...item,
            quantity: item.quantity + (type === "inc" ? 1 : -1),
          };
        }
        return item;
      });

      const updatedDatabaseCart = databaseCart.map((item) => {
        if (item.productId === payload.item.id) {
          return {
            ...item,
            quantity: item.quantity + (type === "inc" ? 1 : -1),
          };
        }
        return item;
      });

      await updateDoc(
        doc(db, "usersCart", currentUser.uid),
        {
          myCart: [...updatedDatabaseCart],
        },
        { merge: true }
      );
      return { updatedCartItems, updatedDatabaseCart };
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCartAsync",
  async (payload, { rejectWithValue }) => {
    try {
      const { item, currentUser } = payload;
      await updateDoc(
        doc(db, "usersCart", currentUser.uid),
        {
          myCart: arrayRemove({ productId: item.id, quantity: item.quantity }),
        },
        { merge: true }
      );
      return { item };
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const clearCartAsync = createAsyncThunk(
  "cart/clearCartAsync",
  async (payload, { rejectWithValue }) => {
    try {
      const { currentUser } = payload;
      await updateDoc(doc(db, "usersCart", currentUser.uid), {
        myCart: [],
      });
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    setError: (state, action) => {
      console.log("setError action executed!");

      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserCartProductsAsync.pending, (state) => {
        console.log("getUserCartProductsAsync action pending!");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserCartProductsAsync.fulfilled, (state, action) => {
        console.log("getUserCartProductsAsync action fulfilled!");
        state.isLoading = false;
        state.cartItems = action.payload.userCart;
        state.databaseCart = action.payload.databaseCart;
        state.error = null;
      })
      .addCase(getUserCartProductsAsync.rejected, (state, action) => {
        console.log("getUserCartProductsAsync action rejected!");
        state.error = action.payload;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        console.log("addToCartAsync action fulfilled!");
        const { item } = action.payload;
        state.cartItems.unshift({ ...item, quantity: 1 });
        state.databaseCart.unshift({ productId: item.id, quantity: 1 });
        state.error = null;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        console.log("addToCartAsync action rejected!");
        state.error = action.payload;
      })
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        console.log("updateQuantityAsync action fulfilled!");
        const { updatedCartItems, updatedDatabaseCart } = action.payload;
        state.cartItems = [...updatedCartItems];
        state.databaseCart = [...updatedDatabaseCart];
        state.error = null;
      })
      .addCase(updateQuantityAsync.rejected, (state, action) => {
        console.log("updateQuantityAsync action rejected!");
        state.error = action.payload;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        console.log("removeFromCartAsync action fulfilled!");
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.item.id
        );
        state.databaseCart = state.databaseCart.filter(
          (item) => item.productId !== action.payload.item.id
        );
        state.error = null;
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        console.log("removeFromCartAsync action rejected!");
        state.error = action.payload;
      })
      .addCase(clearCartAsync.fulfilled, (state, action) => {
        console.log("clearCartAsync action fulfilled!");
        state.cartItems = [];
        state.databaseCart = [];
        state.error = null;
      })
      .addCase(clearCartAsync.rejected, (state, action) => {
        console.log("clearCartAsync action rejected!");
        state.error = action.payload;
      });
  },
});

export const cartReducer = cartSlice.reducer;

export const cartActions = cartSlice.actions;

export const cartSelector = (state) => state.cartReducer;

// Handling async actions Thunks through extraReducers

// addToCart: (state, action) => {
//   console.log("addToCart action executed!");

//   const { item } = action.payload;
//   state.cartItems.unshift({ ...item, quantity: 1 });
//   state.databaseCart.unshift({ productId: item.id, quantity: 1 });
//   state.error = null;
// },

// incQuantity: (state, action) => {
//   console.log("incQuantity action executed!");

//   state.cartItems = state.cartItems.map((item) => {
//     if (item.id === action.payload.item.id) {
//       return {
//         ...item,
//         quantity: item.quantity + 1,
//       };
//     }
//     return item;
//   });

//   state.databaseCart = state.databaseCart.map((item) => {
//     if (item.productId === action.payload.item.id) {
//       return {
//         ...item,
//         quantity: item.quantity + 1,
//       };
//     }
//     return item;
//   });
//   state.error = null;
// },

// decQuantity: (state, action) => {
//   console.log("decQuantity action executed!");

//   state.cartItems = state.cartItems.map((item) => {
//     if (item.id === action.payload.item.id) {
//       return {
//         ...item,
//         quantity: item.quantity - 1,
//       };
//     }
//     return item;
//   });

//   state.databaseCart = state.databaseCart.map((item) => {
//     if (item.productId === action.payload.item.id) {
//       return {
//         ...item,
//         quantity: item.quantity - 1,
//       };
//     }
//     return item;
//   });
//   state.error = null;
// },
// removeFromCart: (state, action) => {
//   console.log("removeCart action executed!");

//   state.cartItems = state.cartItems.filter(
//     (item) => item.id !== action.payload.item.id
//   );
//   state.databaseCart = state.databaseCart.filter(
//     (item) => item.productId !== action.payload.item.id
//   );
//   state.error = null;
// },
// clearCart: (state) => {
//   console.log("clearCart action executed!");
//   state.cartItems = [];
//   state.databaseCart = [];
//   state.error = null;
// },
