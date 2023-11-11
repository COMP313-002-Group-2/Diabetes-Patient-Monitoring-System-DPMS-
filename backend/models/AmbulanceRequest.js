const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Model schema for Ambulance Request

const AmbulanceRequestSchema = new Schema({
     
  ambulanceRequestId: {
    type: String,
    required: true,
  },
      location: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['Pending', 'Assigned', 'Completed', 'Cancelled'],
        default: 'Pending',
      },
      emergencyInfo:{
        type: String,
        required: true,
      },
      requesterName:{
        type: String,
        required: true,
      },
      assignedAmbulance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ambulance',
      },
});

module.exports = mongoose.model('AmbulanceRequest', AmbulanceRequestSchema);