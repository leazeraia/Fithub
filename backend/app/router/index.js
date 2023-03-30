const express = require("express");
const router = express.Router();
const userRoute = require("./routes/users/userRoute");

const challengeRoute = require("./routes/others/challengeRoute");

// user

router.use("/user", userRoute);

// challenge

router.use("/challenge", challengeRoute);

module.exports = router;