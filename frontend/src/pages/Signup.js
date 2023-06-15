import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

function Signup() {
  const userStore = useSelector((state) => state.user.value);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    await axios
      .post("/user/signup", user)
      .then((response) => {
        dispatch(login({ email }));
        localStorage.setItem("user", JSON.stringify(response.data));
        setError(null);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error("Error", setError(error.response.data.message));
      });
    // .then((res) => {
    //   if (res.status == 201) {
    //     dispatch(login({ email, password }));
    //     navigate("/");
    //   }
    // })
    // .catch((err) => console.error(err.data));

    console.log("userStore", userStore);
  };
  return (
    <div className="sm:w-3/4  mt-20 flex-row-reverse px-2 sm:mx-auto  drop-shadow-lg h-120 mx-4 flex  justify-evenly items-center ">
      <div className="bg-zinc-200 shadow-2xl shadow-zinc-400 w-1/3 h-full flex flex-col justify-center items-center">
        <h1 className="text-3xl mb-16">SIGN UP</h1>
        <form className="flex flex-col w-full gap-6">
          <div className="flex flex-col h-32 items-between gap-8">
            <div className="justify-center flex ">
              <label className="w-1/4">Email</label>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none pl-1 "
              />
            </div>
            <div className="justify-center flex">
              <label className="w-1/4">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none pl-1"
              />
            </div>
          </div>
          <div className="text-center sm:w-2/4 w-4/6 rounded hover:bg-blue-700 transition ease-linear delay-100 cursor-pointer duration-500 mx-auto  bg-blue-500 text-white py-2 font-sans  ">
            <button onClick={handleSubmit}>Sign Up</button>
          </div>

          {error && (
            <span className="text-red-100 bg-red-700 rounded-r-full shadow-lg shadow-red-900 px-12 py-1 z-10 absolute bottom-5 text-center animate-bounce">
              {error}!
            </span>
          )}
        </form>
      </div>
      <div className="custom-bg-bike bg-contain bg-no-repeat h-full w-2/3 ">
        {/* <img className="h-full" src={bikeSVG} alt="bike" /> */}
      </div>
    </div>
  );
}

export default Signup;
