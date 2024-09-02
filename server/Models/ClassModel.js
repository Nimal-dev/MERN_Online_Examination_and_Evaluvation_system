const mongoose = require("mongoose");
const classSchema = mongoose.Schema({
  classname: {type:String, required:true},
  teacherid: { type: mongoose.Schema.Types.ObjectId, ref: "teacher" },
});
const classes = mongoose.model("classes", classSchema);


module.exports = { classes };