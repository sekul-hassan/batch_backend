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
    // console.log(req.files);

    if (!req.body.data) {
        return res.status(400).json({ message: 'No data provided' });
    }

    const { name, email, password, session } = JSON.parse(req.body.data);

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
        });

        return res.status(201).json(batch);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};




module.exports = { createBatch, getAllBatch };
