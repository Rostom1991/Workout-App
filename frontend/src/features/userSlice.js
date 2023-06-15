const { createSlice } = require("@reduxjs/toolkit");
export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    connected: true,
  },
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.connected = true;
      // localStorage.setItem("user", JSON.stringify(action.payload.email));
    },
    logout: (state, action) => {
      state.email = null;
      state.connected = false;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
