import mongoose from 'mongoose';
import { GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql';
import {
  BloodchemType,
  HematologyType,
  HbA1cType,
  UrinalysisType,
} from '../types/labRecordType.js';
import Bloodchem from '../../models/bloodchem.js';
import Hematology from '../../models/hematology.js';
import HbA1cModel from '../../models/hba1c.js';
import UrinalysisModel from '../../models/urinalysis.js';

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
        console.error('Error in resolver:', error);
        throw new Error('Error fetching bloodchem data by patient ID');
      }
    },
  },
};

const hematologyQueries = {
  getHematologyById: {
    type: HematologyType,
    args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args) {
      try {
        return await Hematology.findById(args._id);
      } catch (error) {
        throw new Error('Error fetching hematology data by ID');
      }
    },
  },
  getHematologyByPatientId: {
    type: new GraphQLList(HematologyType),
    args: { patientId: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args) {
      try {
        const patientObjectId = new mongoose.Types.ObjectId(args.patientId);
        return await Hematology.find({ patientId: patientObjectId });
      } catch (error) {
        throw new Error('Error fetching hematology data by patient ID');
      }
    },
  },
};

const hbA1cQueries = {
  getHbA1cById: {
    type: HbA1cType,
    args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args, context) {
      return await HbA1cModel.findById(args._id); // Replace with your model
    },
  },
  getHbA1cByPatientId: {
    type: new GraphQLList(HbA1cType),
    args: { patientId: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args, context) {
      return await HbA1cModel.find({ patientId: args.patientId }); // Replace with your model
    },
  },
};

const urinalysisQueries = {
  getUrinalysisById: {
    type: UrinalysisType,
    args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args, context) {
      return await UrinalysisModel.findById(args._id); // Replace with your model
    },
  },
  getUrinalysisByPatientId: {
    type: new GraphQLList(UrinalysisType),
    args: { patientId: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args, context) {
      return await UrinalysisModel.find({ patientId: args.patientId }); // Replace with your model
    },
  },
};

export default {
  ...bloodchemQueries,
  ...hematologyQueries,
  ...hbA1cQueries,
  ...urinalysisQueries,
};
