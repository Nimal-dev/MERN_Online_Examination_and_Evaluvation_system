const examModels = require("../Models/ExamModel");
const assignmentModels = require('../Models/AssignmentModel');
const { Notification } = require('../Models/notificationModel');

const examModel = examModels.Exam;
const assignmentModel = assignmentModels.Assignment;


exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ read: false }).sort({ timestamp: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.markNotificationsRead = async (req, res) => {
  try {
    const { ids } = req.body;
    await Notification.updateMany({ _id: { $in: ids } }, { read: true });
    res.status(200).json({ message: 'Notifications marked as read' });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.ExamDetails = async (req, res) => {
  try {
    const exam = await examModel.find({ classId: req.body.id });
    res.json(exam);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.submitExam = async (req, res) => {
  try {
    const { examId, studentId, answers } = req.body;

    const exam = await examModel.findById(examId);

    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    const studentAnswer = {
      studentId,
      answers,
    };

    exam.studentAnswers.push(studentAnswer);
    await exam.save();

    res.json({ message: "Exam submitted successfully" });
  } catch (error) {
    console.error("Error submitting exam:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.uploadStudentAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;
    const studentId = req.body.studentId; // Assuming studentId is sent in the body
    const assignments = req.file.path;

    // Find the assignment and add the student's file to the studentFiles array
    const assignment = await assignmentModel.findById(assignmentId);


    const existingFile = assignment.studentFiles.find(file => file.studentId.toString() === studentId);
    if (existingFile) {
      return res.status(400).json({ message: "File already uploaded for this assignment." });
    }

    assignment.studentFiles.push({ studentId, assignments });
    await assignment.save();

    res.status(200).json({ message: 'Assignment uploaded successfully', assignments });
  } catch (error) {
    console.error("Error uploading assignment:", error);
    res.status(500).json({ message: 'Error uploading assignment', error });
  }
};

exports.getExamDetails = async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await examModel.findById(examId);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.json(exam);
  } catch (error) {
    console.error("Error fetching exam details:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




















// const examModels = require("../Models/ExamModel");
// const assignmentModels = require('../Models/AssignmentModel');

// const examModel = examModels.Exam;
// const assignmentModel = assignmentModels.Assignment;
// exports.ExamDetails = async (req, res) => {
//   try {
//     const exam = await examModel.find({ classId: req.body.id });
//     res.json(exam);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// exports.submitExam = async (req, res) => {
//   try {
//     const { examId, studentId, answers } = req.body;

//     const exam = await examModel.findById(examId);

//     if (!exam) {
//       return res.status(404).json({ error: "Exam not found" });
//     }

//     const studentAnswer = {
//       studentId,
//       answers,
//     };

//     exam.studentAnswers.push(studentAnswer);
//     await exam.save();

//     res.json({ message: "Exam submitted successfully" });
//   } catch (error) {
//     console.error("Error submitting exam:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.uploadStudentAssignment = async (req, res) => {
//   try {
//     const assignmentId = req.params.assignmentId;
//     const studentId = req.body.studentId; // Assuming studentId is sent in the body
//     const filePath = req.file.path;

//     // Find the assignment and add the student's file to the array
//     await assignmentModel.findByIdAndUpdate(assignmentId, {
//       $push: { studentFiles: { studentId, filePath } }
//     });

//     res.status(200).json({ message: 'Assignment uploaded successfully', filePath });
//   } catch (error) {
//     res.status(500).json({ message: 'Error uploading assignment', error });
//   }
// };


// exports.getExamDetails = async (req, res) => {
//   try {
//     const { examId } = req.params;
//     const exam = await examModel.findById(examId);
//     if (!exam) {
//       return res.status(404).json({ error: 'Exam not found' });
//     }
//     res.json(exam);
//   } catch (error) {
//     console.error("Error fetching exam details:", error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };



// // exports.uploadStudentAssignment = async (req, res) => {
// //   try {
// //     const assignmentId = req.params.assignmentId;
// //     const filePath = req.file.path;

// //     // Update the studentFile field with the new file path
// //     const updatedAssignment = await assignmentModel.findByIdAndUpdate(
// //       assignmentId,
// //       { studentFile: filePath },
// //       { new: true }
// //     );

// //     res.status(200).json({ message: 'Assignment uploaded successfully', filePath: updatedAssignment.studentFile });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error uploading assignment', error });
// //   }
// // };

