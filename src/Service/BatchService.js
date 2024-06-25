const Batch = require("../Model/Batch");
const fs = require('fs');
const path = require('path');

const getAllBatch = async (req, res) => {
    try {
        const batches = await Batch.findAll();
        return res.status(200).json(batches);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}


const createBatch = async (req, res) => {
    const { name, email, password, session } = req.body;
    const { profilePic, coverPic } = req.files;

    try {
        const existingBatch = await Batch.findOne({ where: { email: email } });
        if (existingBatch) {
            return res.status(409).json({ message: "Batch already exists with this email." });
        }

        const uploadDirectory = path.join(__dirname, 'images');
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory);
        }
        const profilePicPath = path.join(uploadDirectory, profilePic.name);
        const coverPicPath = path.join(uploadDirectory, coverPic.name);

        profilePic.mv(profilePicPath);
        coverPic.mv(coverPicPath);

        // Save the image paths to the database
        const batch = await Batch.create({
            name,
            email,
            password,
            session,
            profilePic: profilePicPath,
            coverPic: coverPicPath
        });

        return res.status(201).json(batch);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = { createBatch, getAllBatch };
