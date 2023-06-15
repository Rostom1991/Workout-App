import axios from "axios";
import React, { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useDispatch, useSelector } from "react-redux";
import { getWorkouts } from "../features/WorkoutSlice";
import { login, logout } from "../features/userSlice";
import Backdrop from "../components/Backdrop";
import { Navigate } from "react-router-dom";

function Home({ showLogout, setShowLogout }) {
  const fetchWorkouts = useSelector((state) => state.workout.value);
  const detailsValue = useSelector((state) => state.details.value);

  const [add, setAdd] = useState(true);
  const [updateText, setUpdateText] = useState(detailsValue.title);
  const [updateLoad, setUpdateLoad] = useState(detailsValue.load);
  const [updateReps, setUpdateReps] = useState(detailsValue.reps);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = async () => {
      const user = await JSON.parse(localStorage.getItem("user"));
      if (user) {
        console.log("YES User Exists");
        const { email } = user.userExists;
        dispatch(login({ email, connected: true }));
      } else {
        console.log("NO User dont exists");
        dispatch(logout());
      }
    };
    data();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return console.log("You Should Log In First!!!");
    }

    const API = axios.create({
      apiURL: "/",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });
    const allWorkouts = async () => {
      await API.get("workouts/")
        .then((response) => {
          dispatch(getWorkouts(response.data));
          console.log("data", response.data);
          console.log("store", fetchWorkouts);
        })
        .catch((error) => console.error(error));
    };

    allWorkouts();
  }, [dispatch, fetchWorkouts]);

  return (
    <div className=" custom-bg-class bg-cover bg-no-repeat  sm:max-w-5xl sm:mx-auto sm:my-0   sm:flex-row sm:justify-center sm:items-start sm:px-8 mt-8 px-2 sm:h-screen sm:pt-12  flex flex-col-reverse items-center">
      <div className=" sm:flex flex-col sm:flex-wrap  p-1 shadow-sm rounded drop-shadow-md md:flex-row md:flex-wrap w-3/5 lg:w-fit sm:w-3/4 sm:mr-4 sm:mt-2 gap-4  relative">
        {fetchWorkouts &&
          fetchWorkouts.map((workout) => (
            <WorkoutDetails
              key={workout._id}
              workout={workout}
              setAdd={setAdd}
              add={add}
              setUpdateText={setUpdateText}
              setUpdateLoad={setUpdateLoad}
              setUpdateReps={setUpdateReps}
            />
          ))}
      </div>
      <div>
        <WorkoutForm
          add={add}
          setAdd={setAdd}
          updateText={updateText}
          setUpdateText={setUpdateText}
          updateLoad={updateLoad}
          setUpdateLoad={setUpdateLoad}
          updateReps={updateReps}
          setUpdateReps={setUpdateReps}
        />
      </div>
      <div className=" flex justify-center items-center w-full top-0 h-screen absolute">
        {/* {showLogout && (
          <LogoutModal showLogout={showLogout} setShowLogout={setShowLogout} />
        )} */}
        {showLogout && (
          <Backdrop showLogout={showLogout} setShowLogout={setShowLogout} />
        )}
      </div>
    </div>
  );
}

export default Home;
