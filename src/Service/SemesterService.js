const Batch = require("../Model/Batch");
const Semester = require("../Model/Semester");

const addSemester = async (req, res) => {
    try {
        let data = JSON.parse(req.body.data);
        if (!data) {
            return res.status(400).json({ message: 'No data provided' });
        }
        const batchId = req.body.batchId;
        const {semester, mcrName, fcrName } = data;
        const batch = await Batch.findByPk(batchId);
        if (!batch) {
            return res.status(404).json({ message: 'Batch not found' });
        }

        // Check if files are provided
        if (!req.files.mcrPhoto || !req.files.fcrPhoto) {
            return res.status(400).json({ message: 'MCR and FCR photos are required' });
        }
        // Get file paths
        const mcrPhoto = req.files.mcrPhoto[0].path;
        const fcrPhoto = req.files.fcrPhoto[0].path;

        // Check if the semester already exists for the batch
        const existingSemester = await Semester.findOne({
            where: {
                semester: semester,
                batchId: batchId,
            }
        });

        if (!existingSemester) {
            const newSemester = await Semester.create({
                semester,
                mcrName,
                fcrName,
                mcrPhoto,
                fcrPhoto,
                batchId
            });

            return res.status(201).json({ message: 'Semester added successfully', newSemester });
        }
        return res.status(409).json({ message: 'This semester already exists.' });

    } catch (error) {
        console.error('Error creating semester:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getSemesters = async (req, res) => {
    const batchId = req.headers['batchid'];
    if(batchId){
        const semesters = await Semester.findAll({where: {batchId: batchId}});
        const updatedSemesters = semesters.map(semester => ({
            ...semester.dataValues,
            mcrPhoto: `${req.protocol}://${req.get('host')}/static/${encodeFilePath(semester.mcrPhoto)}`,
            fcrPhoto: `${req.protocol}://${req.get('host')}/static/${encodeFilePath(semester.fcrPhoto)}`
        }));

        return res.status(200).json(updatedSemesters);
    }
    return res.status(500).json({ error: "Internal Server Error" });
}
const encodeFilePath = (filePath) => {
    return filePath.split('\\').map(encodeURIComponent).join('/');
}

module.exports = { addSemester,getSemesters ,encodeFilePath};
