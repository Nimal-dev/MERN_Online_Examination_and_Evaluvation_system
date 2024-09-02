const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
});

const studentAnswerSchema = mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "student", required: true },
  answers: [{ type: String, required: true }], // Ensure answers are an array of strings
  marks: { type: Number, default: 0 },
  feedback: { type: String, required: false }
});

const examSchema = mongoose.Schema({
  examName: { type: String, required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "classes", required: true },
  dateOfExam: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  questions: [questionSchema],
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "teachers", required: true },
  studentAnswers: [studentAnswerSchema],
});

const Exam = mongoose.model("Exam", examSchema);

module.exports = { Exam };
