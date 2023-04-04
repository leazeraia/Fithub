const multer = require("multer");
const upload = multer({
    dest: "uploads/",
    fileFilter: (req, file, cb) => {
        const fileType = /jpeg|jpg|png/;
        const isCorrectFileMimetype = fileType.test(file.mimetype);
        const isCorrectFileExtname = fileType.test(file.originalname.toLowerCase());
        
        if(isCorrectFileMimetype && isCorrectFileExtname){
            return cb (null, true);
        };

        return cb(new Error('Only jpeg, jpg and png image files are accepted.'));
    },
    limits: {
        fieldSize: 2 * 1024 * 1024 // 2MB
    }
});

module.exports = upload;