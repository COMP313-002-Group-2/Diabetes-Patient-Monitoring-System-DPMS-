import mongoose from 'mongoose';

const appoinmentSchema = new mongoose.Schema(
  {
    physician: {
      type: String,
      required: true,
    },
    
    date: {
      type: date,
      required: true,
    },
    time: {
      type: time,
      required: true,
    },
    patient: {
      type: String,
      required: true,
    },
  }
 
);

const Appointment = mongoose.model('Appointment', appoinmentSchema);

export default Appointment;
