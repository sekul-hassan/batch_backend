const express = require('express');
const bodyParser = require('body-parser');
const modelSynchronization = require('./src/DBConfig/ModelSynchronization');

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    try {
        await modelSynchronization();
    } catch (err) {
        console.error("Failed to synchronize database:", err);
    }
});
