exports.errorCatcher = (fn) => {
    return (req,res,next) => {
        return fn(req,res,next).catch(next);
    }
}

exports.errorCollector = (err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
}

exports.notFound = (req,res,next) => {
    const err = new Error('Error 404');
    err.status = 404;
    next(err);
}