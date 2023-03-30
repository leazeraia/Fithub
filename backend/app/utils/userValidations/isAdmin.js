const userValidations = require("debug")("utils:isAdmin");
const isAdmin = (req, res, next) => {
    // Checks if there is a user and then if it's an admin
    if(!req.session.user || req.session.user.role !== "admin"){
        userValidations("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
        return res.status(403).json("Access denied.");
    };

    next();
};

module.exports = isAdmin;