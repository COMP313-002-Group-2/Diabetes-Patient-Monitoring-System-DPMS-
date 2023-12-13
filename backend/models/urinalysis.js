import mongoose from 'mongoose';

const urinalysisSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Patient', // Replace 'Patient' with your actual Patient model reference
    },
    documentId: {
      type: String,
      required: true,
    },
    labDate: {
      type: Date,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    transparency: {
      type: String,
      required: true,
    },
    ph: {
      type: Number,
      required: true,
    },
    specificGravity: {
      type: Number,
      required: true,
    },
    glucose: {
      type: String,
      required: true,
    },
    protein: {
      type: String,
      required: true,
    },
    ketones: {
      type: String,
      required: true,
    },
    nitrites: {
      type: String,
      required: true,
    },
    leucocytesEsterases: {
      type: String,
      required: true,
    },
    blood: {
      type: String,
      required: true,
    },
    bilirubin: {
      type: String,
      required: true,
    },
    urobilinogen: {
      type: String,
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
    epithelialCells: {
      type: Number,
    },
    bacteria: {
      type: Number,
    },
    crystals: {
      type: String,
    },
    casts: {
      type: String,
    },
    micralTest: {
      type: Number,
    },
  },
  { timestamps: true }
);

const UrinalysisModel = mongoose.model('Urinalysis', urinalysisSchema);

export default UrinalysisModel;
