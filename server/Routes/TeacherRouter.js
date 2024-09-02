const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const TeacherController = require('../Controllers/TeacherController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the upload directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append a timestamp to the filename
    },
  });
  
  const upload = multer({ storage: storage });



router.post('/AddClass', TeacherController.AddClass);


router.get('/classes', TeacherController.ViewClasses);

router.post('/AddStudent', TeacherController.AddStudent);
router.get('/students', TeacherController.ViewStudents);

router.post('/AddExam', TeacherController.AddExam);
router.get('/exams/', TeacherController.ViewExams);
router.get('/GetStudentAnswers', TeacherController.GetStudentAnswers);
router.post('/UpdateStudentMarks', TeacherController.UpdateStudentMarks);
router.post('/deleteExam', TeacherController.DeleteExam);

router.get("/exam/:examId/students", TeacherController.getExamStudents);
router.get("/exam/:examId/student/:studentId/answers", TeacherController.getStudentAnswers);
router.post("/submitMarks", TeacherController.submitMarks);



router.get('/examStudents/:examId', TeacherController.getExamStudents);

router.post('/AddAssignment', upload.single('file'), TeacherController.addAssignment);
router.get('/assignments', TeacherController.getAssignmentsForClass);
router.post('/deleteAssignment', TeacherController.DeleteAssignment);

router.get('/assignmentStudents/:assignmentId', TeacherController.getassignmentStudents);
router.get('/studentAssignmentAnswers/:assignmentId', TeacherController.getassignmentStudents);

router.get('/getPreviousquestions', TeacherController.getQuestionPapers);
router.post('/deletePreviousquestion', TeacherController.DeleteQuestionPaper);
router.post('/AddpreviousQuestionPaper', upload.single('file'), TeacherController.AddpreviousQuestionPaper);


module.exports = router;