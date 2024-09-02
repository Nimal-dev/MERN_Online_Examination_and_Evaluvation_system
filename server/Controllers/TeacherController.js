const classmodels = require('../Models/ClassModel');

const studentmodels = require('../Models/StudentModel');
const authmodels = require('../Models/AuthModel');
const examModels = require('../Models/ExamModel');
const assignmentModels = require('../Models/AssignmentModel');
const teacherModels = require('../Models/TeacherModel');
const questionpaperModels = require('../Models/QuestionPaperModel');
const { Notification } = require('../Models/notificationModel');

const mongoose = require('mongoose');


const classModel = classmodels.classes;
const studentModel = studentmodels.student;
const teacherModel = teacherModels.teacher;
const authModel = authmodels.auth;
const examModel = examModels.Exam;
const assignmentModel = assignmentModels.Assignment;
const questionModel = questionpaperModels.QuestionPaper;

const bcrypt = require('bcrypt');



const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// --------------Add Classes and View Added Classes --------------------//
exports.AddClass = async (req, res) => {
    try {
        const classparam = {    
            classname: req.body.classname,
            teacherid: req.body.teacherId
        };
        await classModel.create(classparam);
        res.json('success');
    } catch (error) {
        console.error("Error Occurred:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.ViewClasses = async (req, res) => {
    try {
        const teacherId = req.query.teacherId;
        const classes = await classModel.find({ teacherid: teacherId }).populate('teacherid');
        res.json(classes);
    } catch (error) {
        console.error("Error Occurred:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// --------------Add Classes and View Added Classes END --------------------//


// --------------Add Students and View Added Students START --------------------//
exports.AddStudent = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try {
        const authparam = {    
            email: req.body.email,
            password: hashedPassword,
            usertype: req.body.usertype,
        };
        const auth = await authModel.create(authparam);
        
        const studentparam = {    
            studentName: req.body.studentName,
            classId: req.body.classId,
            admissionNumber: req.body.admissionNumber,
            authid: auth._id,
        };
        await studentModel.create(studentparam);
        res.json('success');
    } catch (error) {
        console.error("Error Occurred:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.ViewStudents = async (req, res) => {
    try {
        const teacherId = req.query.teacherId;
        const classes = await classModel.find({ teacherid: teacherId });
        const classIds = classes.map(cls => cls._id);
        const students = await studentModel.find({ classId: { $in: classIds } }).populate('classId');
        res.json(students);
    } catch (error) {
        console.error("Error Occurred:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.ViewExams = async (req, res) => {
  try {
    const teacherId = req.query.teacherId;
    const exams = await examModel.find({ teacherId }).populate('classId');
    res.json(exams);
  } catch (error) {
    console.error("Error Occurred:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// --------------Add Students and View Added Students END --------------------//


// --------------Add Exam and View Added Exams Start --------------------//

exports.AddExam = async (req, res) => {
    try {
      const examParam = {
        examName: req.body.examName,
        classId: req.body.classId,
        dateOfExam: req.body.dateOfExam,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        questions: req.body.questions,
        teacherId: req.body.teacherId,
      };
      await examModel.create(examParam);
      res.json('success');

      // Create notification
    const notification = new Notification({
      classId: req.body.classId,
      message: "An Exam has been scheduled",
      
    });
    await notification.save();
    } catch (error) {
      console.error("Error Occurred:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.DeleteExam = async (req, res) => {
    try {
      const { id } = req.body;
      await examModel.findByIdAndDelete(id);
      res.json('Exam deleted successfully');
    } catch (error) {
      console.error("Error Occurred:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  
  exports.GetStudentAnswers = async (req, res) => {
    try {
      const examId = req.query.examId;
      const exam = await examModel.findById(examId).populate('studentAnswers.studentId');
      res.json(exam.studentAnswers);
    } catch (error) {
      console.error("Error Occurred:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.UpdateStudentMarks = async (req, res) => {
    try {
      const { examId, studentId, marks } = req.body;
      const exam = await examModel.findById(examId);
      const studentAnswer = exam.studentAnswers.find(sa => sa.studentId.toString() === studentId);
      if (studentAnswer) {
        studentAnswer.marks = marks;
        await exam.save();
        res.json('success');
      } else {
        res.status(404).json({ error: 'Student answer not found' });
      }
    } catch (error) {
      console.error("Error Occurred:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };



  exports.GetExamsByClass = async (req, res) => {
    const { classId } = req.query;
    try {
      const exams = await examModel.find({ classId });
      res.json(exams);
    } catch (error) {
      console.error("Error Occurred:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
// --------------Add Exam and View Added Exams End --------------------//


exports.getExamStudents = async (req, res) => {
  try {
    const { examId } = req.params;
    // const studentId = examId.studentAnswers.studentId;
    // console.log(studentId, "idddddddddddddddddddd");
    if (!examId || !mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({ error: "Invalid or missing examId" });
    }

    const exam = await examModel.findById(examId).populate("studentAnswers.studentId");
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    
    // const students = exam.studentAnswers.map((answer) => answer.studentId);
    res.json(exam);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getassignmentStudents = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    // const studentId = assignmentId.studentAnswers.studentId;
    // console.log(studentId, "idddddddddddddddddddd");
    if (!assignmentId || !mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res.status(400).json({ error: "Invalid or missing assignmentId" });
    }

    const exam = await assignmentModel.findById(assignmentId).populate("studentFiles.studentId");
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    
    // const students = exam.studentAnswers.map((answer) => answer.studentId);
    res.json(exam);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getStudentAnswers = async (req, res) => {
  try {
    const { examId, studentId } = req.params;
    const exam = await examModel.findById(examId);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    const studentAnswers = exam.studentAnswers.find(
      (answer) => answer.studentId.toString() === studentId
    );
    res.json(studentAnswers.answers);
  } catch (error) {
    console.error("Error fetching student answers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.submitMarks = async (req, res) => {
  try {
    const { examId, studentId, marks, feedback } = req.body;
    const exam = await examModel.findById(examId);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    const studentAnswer = exam.studentAnswers.find(
      (answer) => answer.studentId.toString() === studentId
    );
    if (studentAnswer) {
      studentAnswer.marks = marks;
      studentAnswer.feedback = feedback;
      await exam.save();
      res.json({ message: "Marks and feedback submitted successfully" });
    } else {
      res.status(404).json({ error: "Student answer not found" });
    }
  } catch (error) {
    console.error("Error submitting marks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.addAssignment = async (req, res) => {
  
  try {
    const file = req.file?.path; // Assuming you're using multer for file uploads
    const assignmentParam = {
      assignmentName: req.body.assignmentName,
      classId: req.body.classId,
      teacherId: req.body.teacherId,
      file
    }
   
    // Create new assignment

    await assignmentModel.create(assignmentParam);
    res.json('success');



     // Create notification
     const notification = new Notification({
      classId: req.body.classId,
      message: "An Assignment has been added",
      
    });
    await notification.save();
   
    
  } catch (error) {
    console.error("Error Occurred:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//     const assignment = new assignmentModel({
//       assignmentName,
//       file,
//       teacherId,
//       classId,
//     });

//     await assignment.save();
//     res.status(201).json({ message: 'Assignment added successfully', assignment });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// Get all assignments for a class
exports.getAssignmentsForClass = async (req, res) => {
  try {
    // const teacherId = req.params.teacherId;
    // console.log("teacherId:", teacherId);

    // Check if classId is valid
    // const classExists = await classModel.findById(teacherId);
    // if (!classExists) {
    //   return res.status(400).json({ message: 'Invalid class ID' });
    // }

    // Find assignments for the given class
    const assignments = await assignmentModel.find();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.DeleteAssignment = async (req, res) => {
  try {
    const { id } = req.body;
    await assignmentModel.findByIdAndDelete(id);
    res.json('Assignment deleted successfully');
  } catch (error) {
    console.error("Error Occurred:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




// -----------Prev Qn paper---------
exports.AddpreviousQuestionPaper = async (req, res) => {
  
  try {
    const file = req.file?.path; // Assuming you're using multer for file uploads
    const questionpaperParam = {
      questionpaperName: req.body.questionpaperName,
      classId: req.body.classId,
      teacherId: req.body.teacherId,
      file
    }
   
    // Create new assignment

    await questionModel.create(questionpaperParam);
    res.json('success');
  } catch (error) {
    console.error("Error Occurred:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getQuestionPapers = async (req, res) => {
  try {
    // const teacherId = req.params.teacherId;
    // console.log("teacherId:", teacherId);

    // Check if classId is valid
    // const classExists = await classModel.findById(teacherId);
    // if (!classExists) {
    //   return res.status(400).json({ message: 'Invalid class ID' });
    // }

    // Find assignments for the given class
    const questionpaper = await questionModel.find().populate('teacherId');
    res.status(200).json(questionpaper);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.DeleteQuestionPaper = async (req, res) => {
  try {
    const { id } = req.body;
    await questionModel.findByIdAndDelete(id);
    res.json('Question Paper deleted successfully');
  } catch (error) {
    console.error("Error Occurred:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

