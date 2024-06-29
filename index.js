const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const modelSynchronization = require('./src/DBConfig/ModelSynchronization');
const { batchRouter } = require("./src/Route/BatchRoute");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/batch", batchRouter);

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    try {
        await modelSynchronization();
    } catch (err) {
        console.error("Failed to synchronize database:", err);
    }
});

