const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Batch = require("./Model/Batch");

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const baseDir = 'Images';
        const garbageDir = path.join(baseDir, 'Garbed');
        let data;
        try {
            data = JSON.parse(req.body.data);
        } catch (error) {
            return cb(new Error('Invalid JSON in data field'), false);
        }
        const email = data.email;
        const folder = email.split('@')[0];
        const dir = path.join(baseDir, folder);

        try {
            if (!fs.existsSync(baseDir)) {
                fs.mkdirSync(baseDir, { recursive: true });
            }
            const batch = await Batch.findOne({ where: { email: email } });
            if (batch) {
                if (!fs.existsSync(garbageDir)) {
                    fs.mkdirSync(garbageDir, { recursive: true });
                }
                return cb(null, garbageDir);
            }
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            cb(null, dir);
        } catch (error) {
            cb(new Error('Failed to check or create directory'), false);
        }
    },
    filename: (req, file, cb) => {
        const fileName = file.fieldname;
        const extension = path.extname(file.originalname);
        const newName = `${fileName}${extension}`;
        cb(null, newName);
    }
});

const upload = multer({ storage });

module.exports = upload;
