const isAdminError = require("debug")("utils:isAdminError");
const isAdmin = (req, res, next) => {
    // Checks if the user is logged
    if(!req.session.user){
        isAdminError("Error, not authenticated.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
        return res.status(403).json("Access denied.");
    };
    // checks if the user has the role admin
    if(req.session.user.role !== "admin"){
        isAdminError("Error, not admin.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
        return res.status(403).json("Access denied.");
    };

    next();
};

module.exports = isAdmin;