const isSameIdAsUserSessionIdError = require("debug")("utils:isSameIdAsUserSessionIdError");
const isSameIdAsUserSessionId = (req, res, id) => {
    if(!req.session.user || req.session.user.id !== Number(id)){
        isSameIdAsUserSessionIdError("Error, session and user id do not match.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
        return res.status(401).json("Unauthorized actions.");
    };
};

module.exports = isSameIdAsUserSessionId;