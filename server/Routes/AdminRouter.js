const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/AdminController');


router.post('/teacherRegister', adminController.teacherRegister);
router.post('/deleteTeacher', adminController.deleteTeacher);
router.post('/deleteStudent', adminController.deleteStudent);
router.post('/deleteClass', adminController.deleteClass);
router.post('/editAndUpdateTeacher', adminController.editAndUpdateTeacher);
router.post('/getTeacherById', adminController.getTeacherById);
router.get('/viewTeacher', adminController.viewTeacher);
router.get('/viewstudents', adminController.viewstudents);

module.exports = router;