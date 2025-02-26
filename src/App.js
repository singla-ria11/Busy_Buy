import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router";
import Navbar from "./pages/Navbar/navbar";
import Home from "./pages/Home/home";
import SignIn from "./pages/Auth/login";
import SignUp from "./pages/Auth/register";
import Cart from "./pages/Cart/cartPage";
import MyOrders from "./pages/My Orders/myOrders";
import { useSelector } from "react-redux";
import { authSelector } from "./redux/reducers/authReducer";

export default function App() {
  const { authSuccess } = useSelector(authSelector);
  // const navigate = useNavigate();

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
        },
        {
          path: "/myorders",
          element: (
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

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
