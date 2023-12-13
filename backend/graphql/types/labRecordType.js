import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from 'graphql';

const BloodchemType = new GraphQLObjectType({
  name: 'Bloodchem',
  fields: () => ({
    _id: { type: GraphQLID },
    patientId: { type: new GraphQLNonNull(GraphQLID) },
    documentId: { type: new GraphQLNonNull(GraphQLString) },
    labDate: { type: new GraphQLNonNull(GraphQLString) },
    glucose: { type: new GraphQLNonNull(GraphQLFloat) },
    altSGPT: { type: new GraphQLNonNull(GraphQLFloat) },
    astSGOT: { type: new GraphQLNonNull(GraphQLFloat) },
    uricAcid: { type: new GraphQLNonNull(GraphQLFloat) },
    bun: { type: new GraphQLNonNull(GraphQLFloat) },
    cholesterol: { type: new GraphQLNonNull(GraphQLFloat) },
    triglycerides: { type: new GraphQLNonNull(GraphQLFloat) },
    hdlCholesterol: { type: new GraphQLNonNull(GraphQLFloat) },
    aLDL: { type: new GraphQLNonNull(GraphQLFloat) },
    vLDL: { type: new GraphQLNonNull(GraphQLFloat) },
    creatinine: { type: new GraphQLNonNull(GraphQLFloat) },
    eGFR: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

const HematologyType = new GraphQLObjectType({
  name: 'Hematology',
  fields: () => ({
    _id: { type: GraphQLID },
    patientId: { type: new GraphQLNonNull(GraphQLID) },
    documentId: { type: new GraphQLNonNull(GraphQLString) },
    labDate: { type: new GraphQLNonNull(GraphQLString) },
    hemoglobin: { type: new GraphQLNonNull(GraphQLFloat) },
    hematocrit: { type: new GraphQLNonNull(GraphQLFloat) },
    rbc: { type: new GraphQLNonNull(GraphQLFloat) },
    wbc: { type: new GraphQLNonNull(GraphQLFloat) },
    plateletCount: { type: new GraphQLNonNull(GraphQLFloat) },
    mcv: { type: new GraphQLNonNull(GraphQLFloat) },
    mch: { type: new GraphQLNonNull(GraphQLFloat) },
    mchc: { type: new GraphQLNonNull(GraphQLFloat) },
    rdw: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

const HematologyInputType = new GraphQLInputObjectType({
  name: 'HematologyInput',
  fields: {
    _id: { type: GraphQLID }, // Optional, mainly used for updates
    patientId: { type: new GraphQLNonNull(GraphQLID) },
    documentId: { type: new GraphQLNonNull(GraphQLString) },
    labDate: { type: new GraphQLNonNull(GraphQLString) },
    hemoglobin: { type: new GraphQLNonNull(GraphQLFloat) },
    hematocrit: { type: new GraphQLNonNull(GraphQLFloat) },
    rbc: { type: new GraphQLNonNull(GraphQLFloat) },
    wbc: { type: new GraphQLNonNull(GraphQLFloat) },
    plateletCount: { type: new GraphQLNonNull(GraphQLFloat) },
    mcv: { type: new GraphQLNonNull(GraphQLFloat) },
    mch: { type: new GraphQLNonNull(GraphQLFloat) },
    mchc: { type: new GraphQLNonNull(GraphQLFloat) },
    rdw: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

const HbA1cType = new GraphQLObjectType({
  name: 'HbA1c',
  fields: () => ({
    _id: { type: GraphQLID },
    patientId: { type: new GraphQLNonNull(GraphQLID) },
    documentId: { type: new GraphQLNonNull(GraphQLString) },
    labDate: { type: new GraphQLNonNull(GraphQLString) },
    result: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

const HbA1cInputType = new GraphQLInputObjectType({
  name: 'HbA1cInput',
  fields: {
    _id: { type: GraphQLID }, // Optional, mainly used for updates
    patientId: { type: new GraphQLNonNull(GraphQLID) },
    documentId: { type: new GraphQLNonNull(GraphQLString) },
    labDate: { type: new GraphQLNonNull(GraphQLString) },
    result: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

const UrinalysisType = new GraphQLObjectType({
  name: 'Urinalysis',
  fields: () => ({
    _id: { type: GraphQLID },
    patientId: { type: new GraphQLNonNull(GraphQLID) },
    documentId: { type: new GraphQLNonNull(GraphQLString) },
    labDate: { type: new GraphQLNonNull(GraphQLString) },
    color: { type: new GraphQLNonNull(GraphQLString) },
    transparency: { type: new GraphQLNonNull(GraphQLString) },
    ph: { type: new GraphQLNonNull(GraphQLFloat) },
    specificGravity: { type: new GraphQLNonNull(GraphQLFloat) },
    glucose: { type: new GraphQLNonNull(GraphQLString) },
    protein: { type: new GraphQLNonNull(GraphQLString) },
    ketones: { type: new GraphQLNonNull(GraphQLString) },
    nitrites: { type: new GraphQLNonNull(GraphQLString) },
    leucocytesEsterases: { type: new GraphQLNonNull(GraphQLString) },
    blood: { type: new GraphQLNonNull(GraphQLString) },
    bilirubin: { type: new GraphQLNonNull(GraphQLString) },
    urobilinogen: { type: new GraphQLNonNull(GraphQLString) },
    rbc: { type: new GraphQLNonNull(GraphQLFloat) },
    wbc: { type: new GraphQLNonNull(GraphQLFloat) },
    epithelialCells: { type: GraphQLFloat }, // Made nullable
    bacteria: { type: GraphQLFloat }, // Made nullable
    crystals: { type: GraphQLString }, // Made nullable
    casts: { type: GraphQLString }, // Made nullable
    micralTest: { type: GraphQLFloat }, // Made nullable
  }),
});

const UrinalysisInputType = new GraphQLInputObjectType({
  name: 'UrinalysisInput',
  fields: {
    _id: { type: GraphQLID }, // Optional, mainly used for updates
    patientId: { type: new GraphQLNonNull(GraphQLID) },
    documentId: { type: new GraphQLNonNull(GraphQLString) },
    labDate: { type: new GraphQLNonNull(GraphQLString) },
    color: { type: new GraphQLNonNull(GraphQLString) },
    transparency: { type: new GraphQLNonNull(GraphQLString) },
    ph: { type: new GraphQLNonNull(GraphQLFloat) },
    specificGravity: { type: new GraphQLNonNull(GraphQLFloat) },
    glucose: { type: new GraphQLNonNull(GraphQLString) },
    protein: { type: new GraphQLNonNull(GraphQLString) },
    ketones: { type: new GraphQLNonNull(GraphQLString) },
    nitrites: { type: new GraphQLNonNull(GraphQLString) },
    leucocytesEsterases: { type: new GraphQLNonNull(GraphQLString) },
    blood: { type: new GraphQLNonNull(GraphQLString) },
    bilirubin: { type: new GraphQLNonNull(GraphQLString) },
    urobilinogen: { type: new GraphQLNonNull(GraphQLString) },
    rbc: { type: new GraphQLNonNull(GraphQLFloat) },
    wbc: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

export {
  BloodchemType,
  HematologyType,
  HematologyInputType,
  HbA1cType,
  HbA1cInputType,
  UrinalysisType,
  UrinalysisInputType,
};
