import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLObjectType,
  GraphQLInputObjectType,
} from 'graphql';
import { BloodchemType } from '../types/bloodchemType.js';
import Bloodchem from '../../models/bloodchem.js';

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

export default bloodchemMutations;
