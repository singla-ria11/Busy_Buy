import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from "react-router";
import Navbar from "./pages/Navbar/navbar";
import Home from "./pages/Home/home";
import SignIn from "./pages/Auth/login";
import SignUp from "./pages/Auth/register";
import Cart from "./pages/Cart/cartPage";
import MyOrders from "./pages/My Orders/myOrders";
import { useDispatch, useSelector } from "react-redux";
import { authActions, authSelector } from "./redux/reducers/authReducer";
import { getUserCartProductsAsync } from "./redux/reducers/cartReducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firestoreInit";
import { Loader } from "./components/Loader/loader";
import ErrorBoundary from "./pages/ErrorBoundary/errorBoundary";

export default function App() {
  const [appLoading, setAppLoading] = useState(true);
  const { authSuccess, currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
    setAppLoading(false);
      if (user) {
        const authUser = {
          uid: user.uid,
          email: user.email,
        };
        dispatch(authActions.setAuthUser({ authUser }));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserCartProductsAsync(currentUser));
      // dispatch(getAllOrdersAsync(currentUser));
    }
  }, [currentUser, dispatch]);

  const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    if (!authSuccess) {
      return <Navigate to="/signin" state={{ from: location.pathname }} />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <ErrorBoundary/>,
      children: [
        { path: "/", element: <Home /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/myorders",
          element: (
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          ),
          errorElement: <ErrorBoundary />,
        },
      ],
    },
  ]);

  if (appLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* <div className="custom-toast-container">
        <ToastContainer draggable autoClose={2000} />
      </div> */}
      <ToastContainer draggable autoClose={2000} />
      <div className="App">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
    // <div className="App">
    //   <RouterProvider router={router}></RouterProvider>
    // </div>
  );
}
