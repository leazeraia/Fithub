const idOrAdminError = require("debug")("utils:idOrAdminError");
const isSameIdOrAdmin = (req, res, id) => {
    // checks if user is connected
    // then checks if the session user's id is the same as the id it is trying to modify
    if(!req.session.user || req.session.user.id !== id || req.session.user.role !== "admin"){
        idOrAdminError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
        return res.status(401).json("Unauthorized actions.");
    };
}

module.exports = isSameIdOrAdmin;