const Batch = require("../Model/Batch");
const Semester = require("../Model/Semester");
const Member = require("../Model/Member");
const Course = require("../Model/Course");
const CRInfo = require("../Model/CRInfo");
const CourseDetails = require("../Model/CouseDetails");

const defineAssociations = () => {
    // Batch to Semester (One-to-Many)
    Batch.hasMany(Semester, { foreignKey: 'batchId', as: 'semesters' });
    Semester.belongsTo(Batch, { foreignKey: 'batchId', as: 'batch' });

    // Batch to Member (One-to-Many)
    Batch.hasMany(Member, { foreignKey: 'batchId', as: 'members' });
    Member.belongsTo(Batch, { foreignKey: 'batchId', as: 'batch' });

    // Semester to Course (One-to-Many)
    Semester.hasMany(Course, { foreignKey: 'semesterId', as: 'courses' });
    Course.belongsTo(Semester, { foreignKey: 'semesterId', as: 'semester' });

    // Semester to CRInfo (One-to-One)
    Semester.hasOne(CRInfo, { foreignKey: 'semesterId', as: 'crInfo' });
    CRInfo.belongsTo(Semester, { foreignKey: 'semesterId', as: 'semester' });

    // Course to Course Details (one-to-many)
    Course.hasMany(CourseDetails,{foreignKey: 'courseId', as: 'course_details'});
    CourseDetails.belongsTo(Course,{foreignKey: 'courseId', as: 'course'});
};

module.exports = defineAssociations;
