//

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firestoreInit";
import { getProducts } from "../../Utils/firestoreUtils";


const INITIAL_STATE = {
  id: "ORD1210",
  count: 1,
  orders: [],
  isLoading: false,
  error: null,
};

export const getAllOrdersAsync = createAsyncThunk(
  "myOrders/getAllOrders",
  async (payload, { rejectWithValue }) => {
    const currentUser = payload;
    try {
      const collectionRef = collection(
        db,
        `usersOrders/${currentUser.uid}/orders`
      );
      const q = query(collectionRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const allOrdersPromises = snapshot.docs?.map(async (doc) => {
        const data = doc.data();
        const { userCart } = await getProducts(
          currentUser,
          doc.data().products
        );

        const alteredOrder = {
          ...data,
          //   createdAt: data.createdAt.toMillis(),
          products: [...userCart],
        };
        return alteredOrder;
      });

      const allOrders = await Promise.all(allOrdersPromises);

      return { allOrders: allOrders || [] };
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const addNewOrderAsync = createAsyncThunk(
  "myOrders/addNewOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const { currentUser, cartItems, databaseCart } = payload;
      const docRef = doc(
        collection(db, `usersOrders/${currentUser.uid}/orders`)
      );
      const dbNewOrder = {
        id: docRef.id,
        createdAt: Date.now(),
        shipping: 20,
        products: [...databaseCart],
      };

      const localNewOrder = {
        ...dbNewOrder,
        // createdAt: dbNewOrder.createdAt.toMillis(),
        products: [...cartItems],
      };
      await setDoc(docRef, { ...dbNewOrder });

      return { localNewOrder };
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const myOrdersSlice = createSlice({
  name: "myOrders",
  initialState: INITIAL_STATE,
  reducers: {
    addNewOrder: (state, action) => {
      const newOrder = {
        id: state.id + state.count++,
        createdAt: Date.now(),
        shipping: 20,
        products: [...action.payload.cartItems],
      };
      state.orders.unshift({ ...newOrder });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersAsync.pending, (state) => {
        console.log("getAllOrdersAsync action pending");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
        console.log("getAllOrdersAsync action fulfilled");
        state.isLoading = false;
        state.error = null;
        state.orders = [...action.payload.allOrders];
      })
      .addCase(getAllOrdersAsync.rejected, (state, action) => {
        console.log("getAllOrdersAsync action rejected");
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addNewOrderAsync.pending, (state, action) => {
        console.log("addNewOrderAsync action pending");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewOrderAsync.fulfilled, (state, action) => {
        console.log("addNewOrderAsync action fulfilled");
        state.error = null;
        state.isLoading = false;
        state.orders.unshift({ ...action.payload.localNewOrder });

        //   state.orders.unshift({ ...action.payload.localNewOrder });
      })
      .addCase(addNewOrderAsync.rejected, (state, action) => {
        console.log("addNewOrderAsync action rejected");
        state.error = action.payload;
      });
  },
});

export const myOrdersReducer = myOrdersSlice.reducer;
export const myOrdersActions = myOrdersSlice.actions;

export const myOrdersSelector = (state) => state.myOrdersReducer;


// Sample orders data.....................................
// const allOrders = [
//     {
//       id: "ORD123",
//       createdAt: 1741007677170,
//       itemsCount: 2,
//       subtotal: 100,
//       shipping: 20,
//       total: 120,
//       products: [
//         {
//           title:
//             "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
//           price: 50,
//           quantity: 1,
//           image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
//         },
//         {
//           title: "Item B",
//           price: 50,
//           quantity: 1,
//           image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
//         },
//       ],
//     },
//     {
//       id: "ORD124",
//       createdAt: 1741007596423,
//       itemsCount: 3,
//       subtotal: 75,
//       shipping: 15,
//       total: 90,
//       products: [
//         {
//           title:
//             "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
//           price: 25,
//           quantity: 1,
//           image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
//         },
//         {
//           title: "Item D",
//           price: 50,
//           quantity: 2,
//           image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
//         },
//       ],
//     },
//     {
//       id: "ORD125",
//       createdAt: 1741007380318,
//       itemsCount: 1,
//       subtotal: 130,
//       shipping: 20,
//       total: 150,
//       products: [
//         {
//           title: "Item E",
//           price: 130,
//           quantity: 1,
//           image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
//         },
//       ],
//     },
//     {
//       id: "ORD126",
//       createdAt: 1741007290650,
//       itemsCount: 1,
//       subtotal: 130,
//       shipping: 20,
//       total: 150,
//       products: [
//         {
//           title:
//             "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
//           price: 130,
//           quantity: 1,
//           image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
//         },
//       ],
//     },
//     {
//       id: "ORD127",
//       createdAt: 1741007220706,
//       itemsCount: 1,
//       subtotal: 130,
//       shipping: 20,
//       total: 150,
//       products: [
//         {
//           title: "Mens Casual Slim Fit",
//           price: 130,
//           quantity: 1,
//           image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
//         },
//       ],
//     },
//     {
//       id: "ORD128",
//       createdAt: 1741007176428,
//       itemsCount: 1,
//       subtotal: 130,
//       shipping: 20,
//       total: 150,
//       products: [
//         {
//           title: "Mens Casual Slim Fit",
//           price: 130,
//           quantity: 1,
//           image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
//         },
//       ],
//     },
//     {
//       id: "ORD129",
//       createdAt: 1741007012192,
//       itemsCount: 1,
//       subtotal: 130,
//       shipping: 20,
//       total: 150,
//       products: [
//         {
//           title: "Item E",
//           price: 130,
//           quantity: 1,
//           image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
//         },
//       ],
//     },
//     {
//       id: "ORD1210",
//       createdAt: 1741006944190,
//       itemsCount: 1,
//       subtotal: 130,
//       shipping: 20,
//       total: 150,
//       products: [
//         {
//           title: "Item E",
//           price: 130,
//           quantity: 1,
//           image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
//         },
//       ],
//     },
//   ];