const {createBatch, getAllBatch} = require("../Service/BatchService");


const newBatch = async (req,res) =>{
    return await createBatch(req,res);
}
const allBatch = async (req,res) =>{
    return await getAllBatch(req,res);
}

module.exports = {newBatch,allBatch};