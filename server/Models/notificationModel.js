const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "classes", required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false } // Indicator for unread notifications
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = { Notification };