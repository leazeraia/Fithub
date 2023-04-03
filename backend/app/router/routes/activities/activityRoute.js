const express = require("express");
const activityController = require("./../../../controllers/activities/activityController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
const { errorCatcher } = require("./../../../utils/errorHandler");
const isAdmin = require("./../../../utils/userValidations/isAdmin");
const isAuthenticated = require("./../../../utils/userValidations/isAuthenticated");
// Currently on route http://localhost:PORT/activity/

router.get("/", errorCatcher(activityController.findAll));
// remove isAdmin to create activities
router.post("/", isAdmin, bodySanitizer, errorCatcher(activityController.createOne));

module.exports = router;