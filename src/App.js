import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Navbar from "./pages/Navbar/navbar";
import Home from "./pages/Home/home";
import SignIn from "./pages/Auth/login";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { path: "/", element: <Home /> },
        { path: "signIn", element: <SignIn /> },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}
