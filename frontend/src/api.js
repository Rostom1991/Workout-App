import axios from "axios";

export const api = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;

  axios.create({
    baseURL: "/",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
