import mongoose from 'mongoose';

const hematologySchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    documentId: {
      type: String,
      required: true,
    },
    labDate: {
      type: Date,
      required: true,
    },
    hemoglobin: {
      type: Number,
      required: true,
    },
    hematocrit: {
      type: Number,
      required: true,
    },
    rbc: {
      type: Number,
      required: true,
    },
    wbc: {
      type: Number,
      required: true,
    },
    plateletCount: {
      type: Number,
      required: true,
    },
    mcv: {
      type: Number,
      required: true,
    },
    mch: {
      type: Number,
      required: true,
    },
    mchc: {
      type: Number,
      required: true,
    },
    rdw: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hematology = mongoose.model('Hematology', hematologySchema);

export default Hematology;
