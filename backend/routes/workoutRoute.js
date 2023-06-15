const router = require("express").Router();
const {
  addWorkout,
  getWorkouts,
  getOneWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workout");
const requireAuth = require("../middleware/requireAuth");

// Auth Middleware
router.use(requireAuth);

//GET WORKOUTS
router.get("/", getWorkouts);

//GET ONE WORKOUT
router.get("/:id", getOneWorkout);

//ADD WORKOUTS
router.post("/", addWorkout);

//UPDATE WORKOUT
router.patch("/:id", updateWorkout);

//DELETE WORKOUT
router.delete("/:id", deleteWorkout);

module.exports = router;
