//
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../firestoreInit";

const INITIAL_STATE = {
  users: [],
  authSuccess: false,
  authError: null,
};

export const auth = getAuth(app);

export const signUpUserAsync = createAsyncThunk(
  "auth/signUpUserAsync",
  async (payload, { rejectWithValue }) => {
    const { email, password } = payload;
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { uid: credential.user.uid, email: credential.user.email };
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const signInUserAsync = createAsyncThunk(
  "auth/signInUserAsync",
  async (payload, { rejectWithValue }) => {
    const { email, password } = payload;
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return credential.user.uid;
    } catch (error) {
      console.log(error);
      toast.error("Invalid Credentials");
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    handleLogout: (state) => {
      state.authSuccess = false;
      state.authError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUserAsync.fulfilled, (state, action) => {
        console.log("User Signed Up successfully!!");
        console.log(action.payload.user);

        state.authSuccess = true;
        state.authError = null;
        state.users.push({
          uid: action.payload.uid,
          email: action.payload.email,
        });
      })
      .addCase(signUpUserAsync.rejected, (state, action) => {
        console.log("error while signing up");

        state.authSuccess = false;
        state.authError = action.payload;
      })
      .addCase(signInUserAsync.fulfilled, (state, action) => {
        console.log("User Signed In successfully!!");

        state.authSuccess = true;
        state.authError = null;
      })
      .addCase(signInUserAsync.rejected, (state, action) => {
        console.log("error while signing in");

        state.authSuccess = false;
        state.authError = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;

export const authSelector = (state) => state.authReducer;
