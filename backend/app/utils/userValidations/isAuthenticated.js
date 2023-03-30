const userValidations = require("debug")("utils:isAuthenticated");
const isAuthenticated = (req, res, next) => {
    // checks if there is an ongoing user session
    if(!req.session.user){
        userValidations("Error", `${req.protocol}://${req.get("host")}${req.originalUrl}`)
        return res.status(403).json("Access denied, user must be logged in.");
    };

    next();
}

module.exports = isAuthenticated;