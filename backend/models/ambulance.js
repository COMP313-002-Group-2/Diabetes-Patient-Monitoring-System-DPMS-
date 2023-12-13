import mongoose from 'mongoose';

//Model schema for Ambulance
const ambulanceSchema = new mongoose.Schema({
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

const AmbulanceSchema = mongoose.model('AmbulanceSchema', ambulanceSchema);

export default AmbulanceSchema;