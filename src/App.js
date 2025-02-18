import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Navbar from "./pages/Navbar/navbar";
import Home from "./pages/Home/home";
import SignIn from "./pages/Auth/login";
import SignUp from "./pages/Auth/register";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { path: "/", element: <Home /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}
