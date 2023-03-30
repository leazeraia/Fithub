const error404 = require("debug")("utils:error404");
const error500 = require("debug")("utils:error500");

exports.errorCatcher = (fn) => {
    return (req,res,next) => {
        return fn(req,res,next).catch(next);
    }
}

exports.errorCollector = (err, req, res, next) => {
    const status = err.status || 500;
    error500("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`)
    res.status(status).json(err.message);
}

exports.notFound = (req,res,next) => {
    const err = new Error('Error 404');
    err.status = 404;
    error404("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`)
    next(err);
}