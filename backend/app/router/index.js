const express = require("express");
const router = express.Router();
const userRoute = require("./routes/users/userRoute");

const activityRoute = require("./routes/activities/activityRoute");
const categoryActivityRoute = require("./routes/activities/categoryActivityRoute");

const challengeRoute = require("./routes/others/challengeRoute");

router.use("/user", userRoute);

router.use("/activity", activityRoute);
router.use("/category-activity", categoryActivityRoute);

router.use("/challenge", challengeRoute);

module.exports = router;