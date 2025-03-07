//
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../../firestoreInit";

const INITIAL_STATE = {
  users: [],
  currentUser: null,
  authSuccess: false,
  authError: null,
};

export const signUpAsync = createAsyncThunk(
  "auth/signUpAsync",
  async (payload, { rejectWithValue }) => {
    const { name, email, password } = payload;
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      toast.success("Signed up successfully");
      const registeredUser = {
        uid: credential.user.uid,
        email: credential.user.email,
      };
      return { registeredUser };
    } catch (error) {
      console.log(error);
      const errorCode = error.code.split("/")[1];
      toast.error(errorCode);
      return rejectWithValue(error.message);
    }
  }
);

export const signInAsync = createAsyncThunk(
  "auth/signInAsync",
  async (payload, { rejectWithValue }) => {
    const { email, password } = payload;
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("Signed in successfully");

      const signedInUser = {
        uid: credential.user.uid,
        email: credential.user.email,
      };
      return { signedInUser };
    } catch (error) {
      console.log(error);
      toast.error("Either Invalid Credentials or Incorrect Password");
      return rejectWithValue(error.message);
    }
  }
);

export const signOutAsync = createAsyncThunk(
  "auth/signOutUserAsync",
  async (payload, { rejectWithValue }) => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error while signing out");
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setAuthUser: (state, action) => {
      console.log("setAuthUser action executed");

      const { authUser } = action.payload;
      state.currentUser = authUser;
      state.authSuccess = authUser ? true : false;
    },
    handleLogout: (state) => {
      state.currentUser = null;
      state.authSuccess = false;
      state.authError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.fulfilled, (state, action) => {
        console.log("User Signed Up successfully!!");
        console.log(action.payload.user);
        const { registeredUser } = action.payload;
        state.authSuccess = true;
        state.authError = null;
        state.users.push({
          ...registeredUser,
        });
        state.currentUser = registeredUser;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        console.log("error while signing up");

        state.authSuccess = false;
        state.authError = action.payload;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        console.log("User Signed In successfully!!");
        const { signedInUser } = action.payload;

        state.currentUser = signedInUser;
        state.authSuccess = true;
        state.authError = null;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        console.log("error while signing in");

        state.authSuccess = false;
        state.authError = action.payload;
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        console.log("User Signed Out successfully!!");

        state.currentUser = null;
        state.authSuccess = false;
        state.authError = null;
      })
      .addCase(signOutAsync.rejected, (state, action) => {
        console.log("error while signing out");

        state.authSuccess = false;
        state.authError = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;

export const authSelector = (state) => state.authReducer;
