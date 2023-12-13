import mongoose from 'mongoose';

const emergencyRequestSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  location: {
      type: String,
      required: true,
  },
  email:{
    type:String,
    required:true,
  },
  status:{
    type:String,
    required:true,
  },
  address:{
    type:String,
    required:true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});


const EmergencyRequest = mongoose.model('EmergencyRequest', emergencyRequestSchema);

export default EmergencyRequest;
