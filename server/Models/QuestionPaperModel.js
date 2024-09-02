const mongoose = require('mongoose');



const questionpaperSchema = mongoose.Schema({
  questionpaperName: { type: String, required: true },
  file: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher', required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'classes', required: true },
}, {
  timestamps: true,
});

const QuestionPaper = mongoose.model("QuestionPaper", questionpaperSchema);
module.exports = { QuestionPaper };







