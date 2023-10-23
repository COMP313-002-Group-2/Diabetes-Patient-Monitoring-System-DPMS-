const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Model schema for Ambulance
const AmbulanceSchema = new Schema({
  ambulanceId: {
    type: String,
  },
  crewMembers: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  eta: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Ambulance', AmbulanceSchema);