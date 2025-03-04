const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const modelSynchronization = require('./src/DBConfig/ModelSynchronization');
const { batchRouter } = require("./src/Route/BatchRoute");
const {semesterRouter} = require("./src/Route/SemesterRoute");
const path = require("node:path");
const {courseRouter} = require("./src/Route/CourseRoute");
const {courseDetailsRouter} = require("./src/Route/CourseDetailsRoute");
const {memberRouter} = require("./src/Route/MemberRoute");

const app = express();
const port = 5000;

app.use('/static',express.static(path.join(__dirname, '/')));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/batch", batchRouter);
app.use("/api/semester", semesterRouter);
app.use("/api/course", courseRouter);
app.use("/api/courseDetails", courseDetailsRouter);
app.use("/api/member", memberRouter);

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    try {
        await modelSynchronization();
    } catch (err) {
        console.error("Failed to synchronize database:", err);
    }
});

