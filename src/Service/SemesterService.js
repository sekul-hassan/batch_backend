const Batch = require("../Model/Batch");
const Semester = require("../Model/Semester");

const addSemester = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'No data provided' });
    }
    let data =req.body
    console.log(req)
    const { batchId, semester, mcrName, fcrName } = data;
    const batch = await Batch.findByPk(batchId);
    if (!batch) {
        return res.status(404).json({ message: 'No batch is found' });
    }
    // mcrPhoto mcrPhoto
    const mcrPhoto = req.files.mcrPhoto[0].path;
    const fcrPhoto = req.files.fcrPhoto[0].path;
    console.log(data);
    const existingSemester = await Semester.findOne({where: {
            semester: semester,
            batchId: batchId,
        }});
    if(existingSemester) {
        return res.status(409).json({ message: 'This semester already exist.'});
    }
    const newSemester = await Semester.create({
        semester,
        mcrName,
        fcrName,
        mcrPhoto,
        fcrPhoto,
        batchId
    })
    return res.status(201).json({ message: 'okk',newSemester: newSemester });
};

module.exports = { addSemester };
