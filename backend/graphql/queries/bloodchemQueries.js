import mongoose from 'mongoose';
import { GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql';
import { BloodchemType } from '../types/bloodchemType.js';
import Bloodchem from '../../models/bloodchem.js';

const bloodchemQueries = {
  getBloodChemById: {
    type: BloodchemType,
    args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args) {
      try {
        return await Bloodchem.findById(args._id);
      } catch (error) {
        throw new Error('Error fetching bloodchem data by ID');
      }
    },
  },
  getBloodChemByPatientId: {
    type: new GraphQLList(BloodchemType),
    args: { patientId: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args) {
      //console.log('Querying for patientId:', args.patientId);
      try {
        // Use `new` with the ObjectId constructor
        const patientObjectId = new mongoose.Types.ObjectId(args.patientId);
        const results = await Bloodchem.find({ patientId: patientObjectId });
        //console.log('Query results:', results);
        return results;
      } catch (error) {
        throw new Error('Error fetching bloodchem data by patient ID');
      }
    },
  },
};

export default bloodchemQueries;
