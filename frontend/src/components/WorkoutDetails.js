import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { RxUpdate } from "react-icons/rx";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useDispatch } from "react-redux";
import { deleteWorkout } from "../features/WorkoutSlice";
import { sendDetails } from "../features/detailsSlice";
import { api } from "../api";

function WorkoutDetails({
  workout,
  add,
  setAdd,
  setUpdateText,
  setUpdateLoad,
  setUpdateReps,
}) {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const handleUpdate = () => {
    dispatch(sendDetails(workout));
    setUpdateText(workout.title);
    setUpdateLoad(workout.load);
    setUpdateReps(workout.reps);
    setAdd(!add);
  };
  const handleModal = () => {
    setOpenModal(true);
  };
  const handleDelete = async () => {
    await api
      .delete(`/workouts/${workout._id}`)
      .then((res) => dispatch(deleteWorkout(res.data)))
      .catch((error) => console.error(error));
  };
  return (
    <div className="bg-white my-2 sm:my-0 flex md:flex-wrap  items-center justify-between  w-full md:w-2/3 lg:w-80 pl-8 py-4 rounded shadow-gray-500 shadow-sm ">
      <div className=" w-2/3">
        <h1 className=" text-xl text-teal-600 font-sans "> {workout.title} </h1>
        <p className="text-sm font-mono">
          <strong> Load (kg) : </strong> {workout.load}{" "}
        </p>
        <p className="text-sm font-mono">
          <strong> Reps </strong> {workout.reps}{" "}
        </p>
        <p className="text-sm">
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      <div className=" flex flex-col items-center gap-2 p-2 w-1/12 ">
        <RxUpdate
          size={18}
          className="text-green-500 hover:cursor-pointer hover:text-green-600"
          onClick={handleUpdate}
        />
        <TiDelete
          size={25}
          className="text-red-500 hover:cursor-pointer hover:text-red-600"
          onClick={handleModal}
        />
      </div>
      <div className="bg-red-700 ">
        {" "}
        {openModal && (
          <div className="  fixed right-1/3 top-1/3 w-60 h-48  flex flex-col items-center justify-center p-4 bg-gray-400">
            <h1 className="">CONFIRM ?</h1>{" "}
            <button
              className="bg-red-500 w-full py-2 text-white uppercase "
              onClick={handleDelete}>
              Delete
            </button>
            <button
              onClick={() => setOpenModal(false)}
              className="bg-blue-400 w-full py-2 text-white uppercase">
              Cancel
            </button>
          </div>
        )}{" "}
      </div>
    </div>
  );
}

export default WorkoutDetails;
