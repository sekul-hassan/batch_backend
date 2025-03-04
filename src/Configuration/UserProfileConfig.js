const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Batch = require("../Model/Batch");
const res = require("express/lib/response");


const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const baseDir = "Images";
        const garbageDir = path.join(baseDir, "Garbed");
        console.log("From here")

        try {
            console.log(req);
            return res.status(200).json({data: null});
            const data = JSON.parse(req.body.data);
            console.log(data);
            const batchId = data.id;

            const batch = await Batch.findOne({ where: { id: batchId } });

            if (!batch) {
                console.error("Batch not found, saving to Garbed directory.");
                return cb(null, garbageDir);
            }

            const email = batch.email;
            const folder = email.split("@")[0];
            const dir1 = path.join(baseDir, folder);
            const dir = path.join(dir1, "user");

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            cb(null, dir);
        } catch (err) {
            console.error("Error determining storage directory:", err.message);
            cb(err);
        }
    },
    filename: (req, file, cb) => {
        const fileName = file.fieldname;
        const extension = path.extname(file.originalname);
        // const newName = ${fileName}${extension};
        let newName = `${fileName}${extension}`;
        cb(null, newName);
    },
});


const profileStorage = multer({ storage });

module.exports = profileStorage;
