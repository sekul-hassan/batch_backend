const Semester = require("../Model/Semester");
const Course = require("../Model/Course");
const Batch = require("../Model/Batch");


const addCourse = async (req,res) =>{
    const {title,code,teacher,semesterId,batchId} = req.body;
    const semester = await Semester.findByPk(semesterId);
    const batch = await Batch.findByPk(batchId);
    try{
        if(!batch){
            return res.status(404).json({error: "Batch not found."});
        }
        if(!semester){
            return res.status(404).json({error: "Semester not created."});
        }

        const existingCourse = await Course.findOne({where: {
            code: code,
                semesterId:semesterId,
                batchId: batchId,
            }})
        if(existingCourse){
            return res.status(409).json({error: "Course already exist."});
        }

        const course = await Course.create({
            title,code,teacher,semesterId,batchId
        });
        return res.status(201).json({message: "Course creation is successful.",course: course});
    }catch (error){
        return res.status(500).json({error: "Internal server error. Please try later."});
    }

}

const allCourse = async (req,res)=>{
    const batchId = req.headers['batchid'];
    const semesterId = req.headers['semesterid'];
    if(!batchId || !semesterId){
        return res.status(404).json({error: "Header data not found."});
    }
    try{
        const course = await Course.findAll({where: {
            batchId: batchId,
                semesterId: semesterId,
            }})
        if(course)
            return res.status(200).json({course:course});
    }catch (error){
        return res.status(500).json({error: "Internal server error. Please try later." });
    }
}

module.exports = {addCourse,allCourse};