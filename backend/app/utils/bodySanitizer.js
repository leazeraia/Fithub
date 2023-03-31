const sanitizeHtml = require("sanitize-html");

const bodySanitizer = (req,res,next) => {
    // sanitize body to prevent XSS attacks
    if(req.body){
        for(let element in req.body){
            req.body[element] = sanitizeHtml(req.body[element]);
        }
    }

    next();
}

module.exports = bodySanitizer;