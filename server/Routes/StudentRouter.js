const express = require('express');
const router = express.Router();
const TeacherController = require('../Controllers/TeacherController');
const StudentController = require('../Controllers/StudentController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post('/examDetails', StudentController.ExamDetails);
router.post('/submitExam', StudentController.submitExam);
router.get('/exam/:examId', StudentController.getExamDetails);
router.post('/uploadAssignment/:assignmentId', upload.single('file'), StudentController.uploadStudentAssignment);


router.get('/notifications', StudentController.getNotifications);
router.post('/markAsRead', StudentController.markNotificationsRead);

module.exports = router;










// In your routes file (e.g., examRoutes.js)
// const express = require('express');
// const router = express.Router();
// const TeacherController = require('../Controllers/TeacherController');
// const StudentController = require('../Controllers/StudentController');
// const multer = require('multer');
// const path = require('path');


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     },
//   });
  
//   const upload = multer({ storage: storage });

// router.post('/examDetails', StudentController.ExamDetails);
// router.post('/submitExam', StudentController.submitExam);

// router.get('/exam/:examId', StudentController.getExamDetails);
// // router.post('/uploadAssignment/:assignmentId',upload.single('file'),StudentController.uploadStudentAssignment);
// router.post('/uploadAssignment/:assignmentId', upload.single('file'), StudentController.uploadStudentAssignment);
 
  

// module.exports = router;
