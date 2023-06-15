import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWorkout, updateWorkout } from "../features/WorkoutSlice";

function WorkoutForm({
  add,
  setAdd,
  updateText,
  setUpdateText,
  updateLoad,
  setUpdateLoad,
  updateReps,
  setUpdateReps,
}) {
  const workoutInStore = useSelector((state) => state.details.value);
  const allWorkouts = useSelector((state) => state.workout.value);
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [notConnected, setNotConnected] = useState("");
  const userEmail = useSelector((state) => state.user.email);

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      return setNotConnected("You are not Logged In");
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;

    const api = axios.create({
      baseURL: "/",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (add) {
      const workout = { title, load, reps };
      await api
        .post("/workouts", workout)
        .then((response) => {
          dispatch(
            addWorkout({
              _id: response.data.workout._id,
              title,
              load,
              reps,
              createdAt: response.data.workout.createdAt,
            })
          );
        })
        .catch((error) => console.log(error));
      setTitle("");
      setLoad("");
      setReps("");
    } else {
      const updatedWorkout = {
        title: updateText,
        load: updateLoad,
        reps: updateReps,
      };
      await api
        .patch(`/workouts/${workoutInStore._id}`, updatedWorkout)
        .then((res) => {
        
          dispatch(
            updateWorkout({
              _id: res.data._id,
              title: updateText,
              load: updateLoad,
              reps: updateReps,
              createdAt: res.data.createdAt,
            })
          );

          console.log("all workouts", allWorkouts);
          console.log("update workout", updatedWorkout);
          setUpdateText("");
          setUpdateLoad("");
          setUpdateReps("");
          setAdd(!add);
        })
        .catch((error) => console.error(error));
    }
  };
  return (
    <div className="w-64 sm:w-60 mb-4">
      <form
        className="flex flex-col gap-2 mt-2 bg-zinc-200 shadow-slate-400  shadow-md p-8 rounded"
        onSubmit={handleSubmit}>
        <h1 className="text-teal-700 text-xl mb-4">Add Workout</h1>
        <label htmlFor="title">Exercice Title:</label>
        <input
          className="w-full"
          type="text"
          id="title"
          onChange={(e) =>
            add ? setTitle(e.target.value) : setUpdateText(e.target.value)
          }
          value={add ? title : updateText}
        />
        <label>Load (kg):</label>
        <input
          className="w-full"
          type="number"
          onChange={(e) =>
            add ? setLoad(e.target.value) : setUpdateLoad(e.target.value)
          }
          value={add ? load : updateLoad}
        />
        <label>Reps:</label>
        <input
          className="w-full"
          type="number"
          onChange={(e) =>
            add ? setReps(e.target.value) : setUpdateReps(e.target.value)
          }
          value={add ? reps : updateReps}
        />
        <button className="w-full mt-2 rounded hover:bg-cyan-600 duration-700 bg-cyan-700 text-white p-2 text-sm shadow-lg">
          {add ? "Add Workout" : "Update Workout"}
        </button>
        {notConnected ? (
          <h1 className="bg-red-500 p-4"> {notConnected} </h1>
        ) : null}
      </form>
    </div>
  );
}

export default WorkoutForm;
