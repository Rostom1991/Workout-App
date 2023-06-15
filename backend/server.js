const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
require("dotenv").config();
const workoutRoutes = require("./routes/workoutRoute");
const userRoutes = require("./routes/userRoute");

const app = express();

//MIDDLEWARES
app.use(express.json());
// app.use(cors());
app.use("/workouts", workoutRoutes);
app.use("/user", userRoutes);

const port = process.env.PORT;
const mongo = process.env.MONGO;

mongoose
  .connect(mongo)
  .then(() => console.log("Connected To Database"))
  .catch(() => console.log("Unable To Connect to DB"));

app.listen(port, () => console.log("Server Running"));
