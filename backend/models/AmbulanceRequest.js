import mongoose from 'mongoose';

//Model schema for Ambulance Request

const ambulanceRequestSchema =  new mongoose.Schema({
     
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

const AmbulanceRequestSchema = mongoose.model('AmbulanceRequestSchema', ambulanceRequestSchema);

export default AmbulanceRequestSchema;