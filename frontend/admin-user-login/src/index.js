// import React from "react";
// import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter } from "react-router-dom";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );

import ReactDOM from "react-dom/client";
import "./index.css";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import App from "./App";
import Home from "./components/home/Home";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
