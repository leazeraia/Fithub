const express = require("express");
const router = express.Router();
const userRouter = require("./user/userRoute");

router.use("/user", userRouter);

module.exports = router;