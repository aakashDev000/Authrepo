import ReactDOM from "react-dom/client";
import "./index.css";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import App from "./App";
import Home from "./components/home/Home";
import UserSignup from "./components/auth/user/UserSignup";
import UserSignin from "./components/auth/user/UserSignin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/usersignup",
    element: <UserSignup />,
  },
  {
    path: "/usersignin",
    element: <UserSignin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
