import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { Link } from "react-router-dom";
import runSVG from "../images/runSVG.svg";
function Login() {
  // const userStore = useSelector((state) => state.user.email);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    await axios
      .post("/user/login", user)
      .then((res) => {
        if (res.status === 200) {
          setError(null);
          dispatch(login({ email, connected: true }));
          localStorage.setItem("user", JSON.stringify(res.data));
        }
      })

      .catch((err) => {
        setError(err.response.data.error);
      });
  };
  return (
    <div className="lg:w-5/6 w-full lg:mx-auto sm:mx-2   sm:flex sm:flex-row flex-col justify-between  sm:pt-24 h-full  ">
      <div className=" w-2/3  lg:w-2/5 px-6 sm:my-0 my-12 sm:mr-16 m-auto  rounded   sm:mx-16  bg-white box-shadow-login h-100  flex flex-col justify-evenly items-center ">
        <h1 className="text-3xl font-primary">LOGIN</h1>
        <form className="flex flex-col w-full gap-6">
          <div className="flex flex-col h-32 items-between gap-8">
            <div className="justify-between flex ">
              <label className="w-1/4">Email:</label>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none pl-1 w-40 md:w-auto bg-gray-200 "
              />
            </div>
            <div className="justify-between flex">
              <label className="w-1/4">Password:</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none w-40 md:w-auto pl-1 bg-gray-200"
              />
            </div>
          </div>
          <div className="text-center sm:w-2/4 w-4/6 rounded hover:bg-blue-700 transition ease-linear delay-100 cursor-pointer duration-500 mx-auto  bg-blue-500 text-white py-2 font-sans  ">
            <button onClick={handleSubmit}>Login</button>
          </div>
          {error && (
            <span className="text-red-100 bg-red-700 rounded-r-full shadow-lg shadow-red-900 py-1 z-10 text-center animate-bounce">
              {error}!
            </span>
          )}
          <h1 className="flex justify-evenly items-center">
            Don't Have an Account?
            <span className="transition ease-linear delay-300 cursor-pointer duration-500 hover:bg-gradient-to-r  hover:from-teal-400 hover:to-teal-700 bg-gradient-to-r from-teal-700 to-teal-400 text-white px-5 py-1 text-sm rounded-full">
              <Link to="/signup">Sign Up</Link>{" "}
            </span>
          </h1>
        </form>
      </div>
      <div className="  sm:w-full">
        <img src={runSVG} alt="run" className="h-full" />
      </div>
    </div>
  );
}

export default Login;
