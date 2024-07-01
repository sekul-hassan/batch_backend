const express = require("express");
const upload = require("../StorageConfig");
const {getAllBatch, createBatch, login} = require("../Service/BatchService");

const batchRouter = express.Router();

batchRouter.get("/allBatch", getAllBatch);
batchRouter.post("/createBatch", upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'coverPic', maxCount: 1 }
]), createBatch);

batchRouter.post("/login",login);

module.exports = { batchRouter };

