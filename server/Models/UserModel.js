const mongoose = require("mongoose");

//--------------------User Details Model---------------------------- // 
const userSchema = mongoose.Schema({
  fullname: {type:String, required:true},
  authid: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" }, //Collection should be called
});
const user = mongoose.model("user", userSchema);


module.exports = { user };