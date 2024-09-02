const mongoose = require('mongoose');


const studentAssignmentSchema = mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "student", required: true },
  assignments: [ { type: String , required: true}], // Ensure answers are an array of strings
  marks: { type: Number, default: 0 },
  feedback: { type: String, required: false }
});
const assignmentSchema = mongoose.Schema({
  assignmentName: { type: String, required: true },
  file: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'teachers', required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'classes', required: true },
  studentFiles: [studentAssignmentSchema]
}, {
  timestamps: true,
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = { Assignment };









// const mongoose = require('mongoose');

// const assignmentSchema =  mongoose.Schema({
//   assignmentName: {type: String,required: true,},
//   file: {type: String,required: true,},
//   teacherId: {type: mongoose.Schema.Types.ObjectId, ref: 'teachers',required: true,},
//   classId: {type: mongoose.Schema.Types.ObjectId,ref: 'classes',}, // Assuming you have a Class modelrequired: true,
    
// }, {
//   timestamps: true,
// });
// const Assignment = mongoose.model("Assignment", assignmentSchema);
// module.exports = {Assignment};
