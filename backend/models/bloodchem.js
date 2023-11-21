import mongoose from 'mongoose';

const bloodChemSchema = new mongoose.Schema(
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
    glucose: {
      type: Number,
      required: true,
    },
    altSGPT: {
      type: Number,
      required: true,
    },
    astSGOT: {
      type: Number,
      required: true,
    },
    uricAcid: {
      type: Number,
      required: true,
    },
    bun: {
      type: Number,
      required: true,
    },
    cholesterol: {
      type: Number,
      required: true,
    },
    triglycerides: {
      type: Number,
      required: true,
    },
    hdlCholesterol: {
      type: Number,
      required: true,
    },
    aLDL: {
      type: Number,
      required: true,
    },
    vLDL: {
      type: Number,
      required: true,
    },
    creatinine: {
      type: Number,
      required: true,
    },
    eGFR: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BloodChem = mongoose.model('BloodChem', bloodChemSchema);

export default BloodChem;
