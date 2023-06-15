import { createSlice } from "@reduxjs/toolkit";

export const detailsSlice = createSlice({
  name: "details",
  initialState: { value: {} },
  reducers: {
    sendDetails: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { sendDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
