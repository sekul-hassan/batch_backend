const express = require("express");
const {allBatch, newBatch} = require("../Controller/BatchController");

const batchRouter = express.Router();

batchRouter.get("/allBatch",allBatch);
batchRouter.post("/createBatch",newBatch);

module.exports = {batchRouter};