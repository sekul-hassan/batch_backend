const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const batch = '_28';
        const semester = '_4-1';
        const course = '_dip';
        const title = '_noteTrisha';
        const newName = `${batch}${semester}${course}${title}${extension}`;
        cb(null,newName);
    }
});

const storageConfig = multer({ storage });

module.exports = storageConfig;
