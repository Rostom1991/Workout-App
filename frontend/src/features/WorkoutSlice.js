import { createSlice } from "@reduxjs/toolkit";

export const workoutSlice = createSlice({
  name: "workout",
  initialState: { value: [] },
  reducers: {
    getWorkouts: (state, action) => {
      state.value = action.payload;
    },
    addWorkout: (state, action) => {
      state.value = [action.payload, ...state.value];
      //   state.value.unshift = action.payload;
    },
    deleteWorkout: (state, action) => {
      state.value = state.value.filter(
        (workout) => workout._id !== action.payload._id
      );
    },
    updateWorkout: (state, action) => {
      state.value.map((workout) => {
        if (workout._id === action.payload._id) {
          return [
            (workout.title = action.payload.title),
            (workout.load = action.payload.load),
            (workout.reps = action.payload.reps),
          ];
        }
      });
    },
  },
});

export const { getWorkouts, addWorkout, deleteWorkout, updateWorkout } =
  workoutSlice.actions;
export default workoutSlice.reducer;
