const express = require('express');
const router = express.Router();
const assignmentModel = require('../Models/AssignmentModel').Assignment;
const examModel = require('../Models/ExamModel').Exam;

router.get('/notifications/:classId', async (req, res) => {
  try {
    const { classId } = req.params;
    const assignments = await assignmentModel.find({ classId });
    const exams = await examModel.find({ classId });
    
    const notifications = [];

    assignments.forEach(assignment => {
      notifications.push({
        type: 'assignment',
        message: `New assignment: ${assignment.assignmentName}`,
      });
    });

    exams.forEach(exam => {
      notifications.push({
        type: 'exam',
        message: `Upcoming exam: ${exam.examName} on ${new Date(exam.dateOfExam).toLocaleDateString()}`,
      });
    });

    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
