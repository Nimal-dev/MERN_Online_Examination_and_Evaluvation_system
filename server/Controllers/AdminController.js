// Importing required models
const teachermodels = require('../Models/TeacherModel');
const authmodels = require('../Models/AuthModel');
const studentmodels = require('../Models/StudentModel');
const classmodels = require('../Models/ClassModel');


// Creating instances of models
const teacherModel = teachermodels.teacher;
const authModel = authmodels.auth;
const studentModel = studentmodels.student;
const classModel = classmodels.classes;


// Importing bcrypt library for password encryption
const bcrypt = require('bcrypt');

exports.teacherRegister = async (req, res) => {
    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const authparam = {
            email: req.body.email,
            password: hashedPassword,
            usertype: req.body.usertype,
        };
        const auth = await authModel.create(authparam);

const teacherparam = {    
    teacherName: req.body.teacherName,
    subject: req.body.subject,
    contact: req.body.contact,
    location: req.body.location,
    address: req.body.address,
    authid: auth._id
};
        await teacherModel.create(teacherparam);
        res.json('success');
    } catch (error) {
        console.error("Error Occurred:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.viewTeacher = async (req, res) => {
    try {
        const teachers = await teacherModel.find().populate('authid');
        res.json(teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.viewstudents = async (req, res) => {
    try {
        const classes = await classModel.find();
        const classIds = classes.map(cls => cls._id);
        const students = await studentModel.find({ classId: { $in: classIds } }).populate('classId');
        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const teacherId = req.body.id;
        const teacher = await teacherModel.findById(teacherId);

        if (!teacher) {
            return res.status(404).json({ error: 'Teacher is not found' });
        }

        // Delete associated auth details
        await authModel.findByIdAndDelete(teacher.authid);

        // Delete the state
        await teacherModel.findByIdAndDelete(teacherId);

        res.json({ message: 'Teacher and associated auth details deleted successfully' });
    } catch (error) {
        console.error("Error in deleting Teacher:", error);
        res.status(500).json({ error: "An error occurred while deleting the Teacher" });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const studentId = req.body.id;
        const student = await studentModel.findById(studentId);

        if (!student) {
            return res.status(404).json({ error: 'Student is not found' });
        }

        // Delete associated auth details
        await authModel.findByIdAndDelete(student.authid);

        // Delete the state
        await studentModel.findByIdAndDelete(studentId);

        res.json({ message: 'Student and associated auth details deleted successfully' });
    } catch (error) {
        console.error("Error in deleting Student:", error);
        res.status(500).json({ error: "An error occurred while deleting the Student" });
    }
};


exports.getTeacherById = async (req, res) => {
    try {
        const teacher = await teacherModel.findById(req.body.id).populate('authid');
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.json({
            teacherDetails: teacher,
            authDetails: teacher.authid
        });
    } catch (error) {
        console.error('Error fetching teacher:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.editAndUpdateTeacher = async (req, res) => {
    try {
        const { id, teachername, contact, address, email, authid } = req.body;
        
        // Update auth details
        await authModel.findByIdAndUpdate(authid, { email });

        // Update teacher details
        await teacherModel.findByIdAndUpdate(id, {
            teacherName: teachername,
            contact,
            address
        });

        res.json('Teacher updated successfully');
    } catch (error) {
        console.error("Error updating teacher:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


exports.deleteClass = async (req, res) => {
    try {
      const { id } = req.body;
      const classToDelete = await classModel.findById(id);
  
      if (!classToDelete) {
        return res.status(404).json({ error: "Class not found" });
      }
  
      await classModel.findByIdAndDelete(id);
  
      res.json({ message: "Class deleted successfully" });
    } catch (error) {
      console.error("Error in deleting class:", error);
      res.status(500).json({ error: "An error occurred while deleting the class" });
    }
  };