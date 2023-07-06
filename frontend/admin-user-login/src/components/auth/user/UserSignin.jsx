import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usersigninrequest } from "../../service/action";

const UserSignin = () => {
  const [userDetails, setUserDetails] = useState({
    accountid: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const {
      target: { name, value },
    } = e;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const goto = useNavigate();

  const token = localStorage.getItem("authtoken");

  useEffect(() => {
    if (token) {
      goto("/home");
    }
  }, [goto, token]);

  const signin = () => {
    const { email, password, accountid } = userDetails;
    if (!email) {
      toast.error("Please Enter the email");
    }

    if (!accountid) {
      toast.error("Please Enter the Account ID");
    }

    if (accountid && email && !password) {
      toast.error("Please Enter the password");
    }

    if (email && password) {
      usersigninrequest({ data: userDetails })
        .then((res) => {
          goto("/home");
        })
        .catch((err) => {
          console.log("err", err);
          const { data = {} } = err;
          const { data: message = "Error occured" } = data;
          if (message) toast.error(message);
        });
    }
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <p className="mt-8 text-xs font-light text-center text-gray-700">
        {" "}
        Do you have an admin account?{" "}
        {/* <a href="#" className="font-medium text-purple-600 hover:underline">
            Sign up
          </a> */}
        <Link
          to={`/signin`}
          className="font-medium text-purple-600 hover:underline"
        >
          Admin Signin
        </Link>
      </p>
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          User Signin
        </h1>
        <div className="mt-6">
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              accountid
            </label>
            <input
              type="text"
              name="accountid"
              value={userDetails.accountid}
              onChange={onChangeHandler}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              // for="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={onChangeHandler}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              // for="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={userDetails.password}
              onChange={onChangeHandler}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={signin}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              user signin
            </button>
          </div>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Do You Signup user account?{" "}
          {/* <a href="#" className="font-medium text-purple-600 hover:underline">
            Sign up
          </a> */}
          <Link
            to={`/usersignup`}
            className="font-medium text-purple-600 hover:underline"
          >
            user signup
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserSignin;
