const Batch = require("../Model/Batch");

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
    if (!req.body.data) {
        return res.status(400).json({ message: 'No data provided' });
    }
    let data = JSON.parse(req.body.data);
    const { name, email, password, session } = data;
    if(!name || !email || !password || !session || !req.files)
        return res.status(400).json({ message: 'Invalid data provided' });
    const profilePic = req.files.profilePic[0].path;
    const coverPic = req.files.coverPic[0].path;
    try {
        const existingBatch = await Batch.findOne({ where: { email: email } });
        if (existingBatch) {
            return res.status(409).json({ message: "Batch already exists with this email." });
        }
        const batch = await Batch.create({
            name,
            email,
            password,
            session,
            profilePic,
            coverPic
        });

        return res.status(201).json(batch);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};



module.exports = { createBatch, getAllBatch };
