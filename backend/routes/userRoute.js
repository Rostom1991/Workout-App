const { login, signup } = require("../controllers/userController");

const router = require("express").Router();

//LOGIN
router.post("/login", login);

//SIGNUP
router.post("/signup", signup);

module.exports = router;
