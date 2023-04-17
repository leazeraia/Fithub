const multer = require("multer");
const upload = multer({
    // sends the image to the temp folder
    dest: "temp/",
    fileFilter: (req, file, cb) => {
        // contains a regex allowing only jpeg, jpg and png files
        const fileType = /jpeg|jpg|png/;
        // tests if the file type is either jpeg, jpg or png file
        const isCorrectFileMimetype = fileType.test(file.mimetype);
        // tests if the file extension name is either jpeg, jpg or png file
        const isCorrectFileExtname = fileType.test(file.originalname.toLowerCase());
        
        // if mimetype and fileextname are true, then proceed to store the image
        if(isCorrectFileMimetype && isCorrectFileExtname){
            return cb (null, true);
        };
        // otherwise error
        return cb(new Error('Only jpeg, jpg and png image files are accepted.'));
    },
    limits: {
        // allows a maximum image size of 2MB
        fieldSize: 2 * 1024 * 1024
    }
});

module.exports = upload;