import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    physicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    appointmentName: {
      type: String,
      required: true,
    },

    request: {
      type: String,
      required: true,
    },

    patientName: {
      type: String,
      required: true,
    },
    
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    meetingId:{
      type:String
    }

  }
 
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
