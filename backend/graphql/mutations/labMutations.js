import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLObjectType,
  GraphQLInputObjectType,
} from 'graphql';
import {
  BloodchemType,
  HematologyType,
  HematologyInputType,
  HbA1cType,
  HbA1cInputType,
  UrinalysisType,
  UrinalysisInputType,
} from '../types/labRecordType.js';
import Bloodchem from '../../models/bloodchem.js';
import Hematology from '../../models/hematology.js';
import HbA1cModel from '../../models/hba1c.js';
import UrinalysisModel from '../../models/urinalysis.js';

const BloodchemInputType = new GraphQLInputObjectType({
  name: 'BloodchemInput',
  fields: {
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
  },
});

const bloodchemMutations = {
  addBloodchem: {
    type: BloodchemType,
    args: {
      input: { type: new GraphQLNonNull(BloodchemInputType) },
    },
    async resolve(parent, { input }) {
      try {
        let newBloodchem = new Bloodchem(input);
        return await newBloodchem.save();
      } catch (error) {
        throw new Error('Error adding new bloodchem data');
      }
    },
  },
  updateBloodchem: {
    type: BloodchemType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
      input: { type: new GraphQLNonNull(BloodchemInputType) },
    },
    async resolve(parent, { _id, input }) {
      try {
        return await Bloodchem.findByIdAndUpdate(_id, input, { new: true });
      } catch (error) {
        throw new Error('Error updating bloodchem data');
      }
    },
  },
  deleteBloodchem: {
    type: GraphQLString,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, { _id }) {
      try {
        await Bloodchem.findByIdAndRemove(_id);
        return 'Bloodchem record successfully deleted.';
      } catch (error) {
        throw new Error('Error deleting bloodchem data');
      }
    },
  },
};

const hematologyMutations = {
  addHematology: {
    type: HematologyType,
    args: {
      input: { type: new GraphQLNonNull(HematologyInputType) },
    },
    async resolve(parent, { input }) {
      try {
        let newHematology = new Hematology(input);
        return await newHematology.save();
      } catch (error) {
        throw new Error('Error adding new hematology data');
      }
    },
  },
  updateHematology: {
    type: HematologyType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
      input: { type: new GraphQLNonNull(HematologyInputType) },
    },
    async resolve(parent, { _id, input }) {
      try {
        return await Hematology.findByIdAndUpdate(_id, input, { new: true });
      } catch (error) {
        throw new Error('Error updating hematology data');
      }
    },
  },
  deleteHematology: {
    type: GraphQLString,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, { _id }) {
      try {
        await Hematology.findByIdAndRemove(_id);
        return 'Hematology record successfully deleted.';
      } catch (error) {
        throw new Error('Error deleting hematology data');
      }
    },
  },
};

const hbA1cMutations = {
  addHbA1c: {
    type: HbA1cType,
    args: {
      input: { type: new GraphQLNonNull(HbA1cInputType) },
    },
    async resolve(parent, { input }, context) {
      const newHbA1c = new HbA1cModel(input); // Replace with your model
      return await newHbA1c.save();
    },
  },
  updateHbA1c: {
    type: HbA1cType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
      input: { type: new GraphQLNonNull(HbA1cInputType) },
    },
    async resolve(parent, { _id, input }, context) {
      return await HbA1cModel.findByIdAndUpdate(_id, input, { new: true }); // Replace with your model
    },
  },
  deleteHbA1c: {
    type: GraphQLString,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, { _id }, context) {
      await HbA1cModel.findByIdAndRemove(_id); // Replace with your model
      return 'HbA1c record deleted successfully';
    },
  },
};

const urinalysisMutations = {
  addUrinalysis: {
    type: UrinalysisType,
    args: {
      input: { type: new GraphQLNonNull(UrinalysisInputType) },
    },
    async resolve(parent, { input }, context) {
      const newUrinalysis = new UrinalysisModel(input); // Replace with your model
      return await newUrinalysis.save();
    },
  },
  updateUrinalysis: {
    type: UrinalysisType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
      input: { type: new GraphQLNonNull(UrinalysisInputType) },
    },
    async resolve(parent, { _id, input }, context) {
      return await UrinalysisModel.findByIdAndUpdate(_id, input, { new: true }); // Replace with your model
    },
  },
  deleteUrinalysis: {
    type: GraphQLString,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, { _id }, context) {
      await UrinalysisModel.findByIdAndRemove(_id); // Replace with your model
      return 'Urinalysis record deleted successfully';
    },
  },
};

export default {
  ...bloodchemMutations,
  ...hematologyMutations,
  ...hbA1cMutations,
  ...urinalysisMutations,
};
