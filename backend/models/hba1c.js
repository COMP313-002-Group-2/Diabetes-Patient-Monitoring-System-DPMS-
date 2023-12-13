import mongoose from 'mongoose';

const hbA1cSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    documentId: {
      type: String,
      required: true,
    },
    labDate: {
      type: Date,
      required: true,
    },
    result: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const HbA1cModel = mongoose.model('HbA1c', hbA1cSchema);

export default HbA1cModel;
