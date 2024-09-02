const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  studentName: { type: String, required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "classes" },
  admissionNumber: { type: String, required: true },
  authid: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
});

const student = mongoose.model("student", studentSchema);

module.exports = { student };
