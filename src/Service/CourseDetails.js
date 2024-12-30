const CourseDetails = require("../Model/CouseDetails");
const {encodeFilePath} = require("./SemesterService");

const addCourseDetails = async (req, res) => {
    let data;

    try {
        if (!req.body.data) {
            return res.status(400).json({ error: "Data is not provided." });
        }
        data = JSON.parse(req.body.data);
        const description = data.description;
        const courseId = req.body.title;
        const batchId = req.body.batchId;
        const semesterId = req.body.semesterId;
        if(!description || !courseId || !batchId || !semesterId){
            return res.status(404).json({error: "Some data is missing."});
        }
        const existingCourse = await CourseDetails.findOne({where:{
                batchId:batchId,
                semesterId: semesterId,
                courseId:courseId,
                description:description,
            }})
        if(existingCourse){
            return res.status(409).json({error: "This course is already exist."});
        }
        const image = req.file.path;
        const courseDetails = await CourseDetails.create({
            description:description,
            image: image,
            batchId:batchId,
            semesterId: semesterId,
            courseId: courseId,
        })

        const updatedCourseDetails = {

        }
        return res.status(200).json({ message: "Course details added successfully",courseDetails: courseDetails });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error. Please try later." });
    }

}

const getCourseDetails = async (req,res) =>{
    const batchId = req.headers['batchid'];
    const semesterId = req.headers['semesterid'];
    const courseId = req.headers['courseid'];

    if(!batchId || !semesterId || !courseId){
        return res.status(400).json({error: "Your data is missing."});
    }

    try{
        const courseDetails = await CourseDetails.findAll({where: {
                batchId:batchId,
                semesterId:semesterId,
                courseId: courseId,
            }});

        const updatedSemesters = courseDetails.map(details => ({
            ...details.dataValues,
            image: `${req.protocol}://${req.get('host')}/static/${encodeFilePath(details.image)}`,
        }));
        return res.status(200).json({courseDetails: updatedSemesters});
    }catch (err){
        console.log(err);
        return res.status(500).json({error: "Internal server error. Please try later."});
    }
}

module.exports = { addCourseDetails,getCourseDetails };
