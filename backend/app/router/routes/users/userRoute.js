const express = require("express");
const router = express.Router();
const userController = require("./../../../controllers/users/userController");
const { errorCatcher } = require("./../../../utils/errorHandler");
const bodySanitizer = require("./../../../utils/bodySanitizer");
const isAuthenticated = require("./../../../utils/userValidations/isAuthenticated");
const isAdmin = require("../../../utils/userValidations/isAdmin");
const upload = require("../../../utils/fileUploadConfig");

// Currently on route http://localhost:PORT/user/

router.get("/", errorCatcher(userController.findAll));
router.get("/:userId", errorCatcher(userController.findOne));
router.post("/", bodySanitizer, upload.single('image'), errorCatcher(userController.createOne));
router.patch("/:userId", isAuthenticated, upload.single('image'), bodySanitizer, errorCatcher(userController.updateOne));
router.delete("/:userId", isAdmin, bodySanitizer, errorCatcher(userController.deleteOne));
router.post("/session/login", errorCatcher(userController.login));
router.get("/session/logout", isAuthenticated, errorCatcher(userController.logout));

module.exports = router;