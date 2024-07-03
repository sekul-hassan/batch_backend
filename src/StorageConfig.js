const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Batch = require("./Model/Batch");
const Semester = require("./Model/Semester");

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const baseDir = 'Images';
        const garbageDir = path.join(baseDir, 'Garbed');
        try {
            let data = JSON.parse(req.body.data);
            let batch;
            let email;
            if (!fs.existsSync(baseDir)) {
                fs.mkdirSync(baseDir, { recursive: true });
            }
            if (!fs.existsSync(garbageDir)) {
                fs.mkdirSync(garbageDir, { recursive: true });
            }

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
                const batchId = req.body.batchId;
                const {semester} = data;
                batch = await Batch.findByPk(batchId);
                if(batch){
                    email = batch.email;
                    const folder = email.split('@')[0];
                    let dir = path.join(baseDir, folder);

                    const existingSemester = await Semester.findOne({where:{
                        batchId:batchId,
                            semester: semester,
                        }})
                    if(existingSemester){
                        return cb(null,garbageDir);
                    }

                    dir = path.join(dir, semester);
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, { recursive: true });
                    }
                    return cb(null, dir);
                }
               return cb(null,garbageDir);
            }
        } catch (error) {
            console.log("From final error" + error);
            return cb(null,garbageDir);
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
