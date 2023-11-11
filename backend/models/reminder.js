import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema(
    {
        reminderName: {
        type: String,
        required: true,
        },
        reminderDescription: {
        type: String,
        required: true,
        },
        patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        },
        status: {
        type: String,
        },
    }    
);

const Reminder = mongoose.model('Reminder', reminderSchema);

export default Reminder;