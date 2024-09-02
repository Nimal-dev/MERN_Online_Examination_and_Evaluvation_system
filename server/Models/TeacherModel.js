const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
    teacherName: {type:String, required:true},
    subject: {type:String, required:true},
    contact: {type:Number, required:true},
    address: {type:String, required:true},
    authid: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
    
    
});
const teacher = mongoose.model("teacher", teacherSchema);

module.exports = {teacher}