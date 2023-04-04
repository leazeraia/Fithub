const express = require("express");
const categoryActivityController = require("./../../../controllers/activities/categoryActivityController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
const { errorCatcher } = require("./../../../utils/errorHandler");
const isAdmin = require("./../../../utils/userValidations/isAdmin");

// Currently on route http://localhost:PORT/category-activity/

router.get("/", errorCatcher(categoryActivityController.findAll));
router.get("/:categoryActivityId", errorCatcher(categoryActivityController.findOne));
router.post("/", bodySanitizer, isAdmin, errorCatcher(categoryActivityController.createOne));
router.patch("/:categoryActivityId", isAdmin, bodySanitizer, errorCatcher(categoryActivityController.updateOne));
router.delete("/:categoryActivityId", isAdmin, errorCatcher(categoryActivityController.deleteOne));

module.exports = router;