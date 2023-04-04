const express = require("express");
const router = express.Router();

const userRoute = require("./routes/users/userRoute");
const activityRoute = require("./routes/activities/activityRoute");
const challengeRoute = require("./routes/others/challengeRoute");

// user

router.use("/user", userRoute);

// activity

router.use("/activity", activityRoute);

// challenge

router.use("/challenge", challengeRoute);

module.exports = router;