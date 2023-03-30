const express = require("express");
const isAdmin = require("../../../utils/userValidations/isAdmin");
const isAuthenticated = require("../../../utils/userValidations/isAuthenticated");
const challengeController = require("./../../../controllers/others/challengeController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
const { errorCatcher } = require("./../../../utils/errorHandler");

// Currently on route http://localhost:PORT/challenge/

router.get("/", errorCatcher(challengeController.findAll));
router.get("/:challengeId", errorCatcher(challengeController.findOne));
router.post("/", isAdmin, bodySanitizer, errorCatcher(challengeController.createOne));
router.patch("/:challengeId", isAdmin, bodySanitizer, errorCatcher(challengeController.updateOne));
router.delete("/:challengeId", isAdmin, errorCatcher(challengeController.deleteOne));
router.post("/user", isAuthenticated, bodySanitizer, errorCatcher(challengeController.assignChallenge));
router.patch("/user/:userId", isAuthenticated, bodySanitizer, errorCatcher(challengeController.challengeChecker));

module.exports = router;