const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const modelSynchronization = require('./src/DBConfig/ModelSynchronization');
const {batchRouter} = require("./src/Route/BatchRoute");
const storageConfig = require("./src/StorageConfig");

const app = express();
const port = 5000;

app.post('/upload',storageConfig.single('file'),(req,res)=>{
    res.json({ message: 'File uploaded successfully!' });
})

//
//
// app.use(bodyParser.json());
// app.use(cors());
// app.get("/", (req, res) => {
//     res.send("Hello world");
// });
//
// app.use("/api/batch",batchRouter);
//
app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    // try {
    //     await modelSynchronization();
    // } catch (err) {
    //     console.error("Failed to synchronize database:", err);
    // }
});



