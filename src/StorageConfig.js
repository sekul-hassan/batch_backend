const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Batch = require("./Model/Batch");
const Semester = require("./Model/Semester");


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
        try {
            if (!fs.existsSync(baseDir)) {
                fs.mkdirSync(baseDir, { recursive: true });
            }
            let batch;
            let email;

            if(data.email){
                // save images for batch
                batch = await Batch.findOne({ where: { email: data.email } });
                if(batch){
                    if (!fs.existsSync(garbageDir)) {
                        fs.mkdirSync(garbageDir, { recursive: true });
                    }
                    return cb(null, garbageDir);
                }
                email = data.email;
                const folder = email.split('@')[0];
                const dir = path.join(baseDir, folder);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                cb(null, dir);
            }
            else{
                // save image for cr,others files
                const batchId = req.body.batchId;
                batch = await Batch.findByPk(batchId);
                if(batch){
                    email = batch.email;
                    const folder = email.split('@')[0];
                    let dir = path.join(baseDir, folder);
                    const semester = data.semester;
                    dir = path.join(dir, semester);

                    const existingSemester = await Semester.findOne({where: {
                           semester: semester,
                            batchId:batch.id,
                        }})
                    if(existingSemester && (file.fieldname==="mcrPhoto" || file.fieldname==="fcrPhoto")){
                        if (!fs.existsSync(garbageDir)) {
                            fs.mkdirSync(garbageDir, { recursive: true });
                        }
                        return cb(null, garbageDir);
                    }

                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, { recursive: true });
                    }
                    cb(null, dir);
                }
                else{
                    if (!fs.existsSync(garbageDir)) {
                        fs.mkdirSync(garbageDir, { recursive: true });
                    }
                    return cb(null, garbageDir);
                }
            }
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

const uploadCRPhoto = multer.diskStorage({
    destination: async (req, file, cb) => {
        const baseDir = 'Images';
        const garbageDir = path.join(baseDir, 'Garbed');
        let data;
        try {
            data = JSON.parse(req.body.data);
        } catch (error) {
            return cb(new Error('Invalid JSON in data field'), false);
        }
        const id = data.id;
        const batch = await Batch.findByPk(id);
        if(!batch){
            if (!fs.existsSync(garbageDir)) {
                fs.mkdirSync(garbageDir, { recursive: true });
            }
            return cb(null, garbageDir);
        }
        const email = batch.email;
        const folder = email.split('@')[0];
        const dir = path.join(baseDir, folder);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const fileName = file.fieldname;
        const extension = path.extname(file.originalname);
        const newName = `${fileName}${extension}`;
        cb(null, newName);
    }
})

module.exports = upload;
