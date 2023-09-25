const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  alertName: {
    type: String,
    required: true,
  },
  alertDescription: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    ref: "user",
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Alert", alertSchema);
