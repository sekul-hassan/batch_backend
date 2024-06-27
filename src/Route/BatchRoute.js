const express = require("express");
const { allBatch, newBatch } = require("../Controller/BatchController");
const upload = require("../StorageConfig");

const batchRouter = express.Router();

batchRouter.get("/allBatch", allBatch);
batchRouter.post("/createBatch", upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'coverPic', maxCount: 1 }]), newBatch);

module.exports = { batchRouter };
