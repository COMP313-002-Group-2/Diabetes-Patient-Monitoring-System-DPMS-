import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
} from 'graphql';
import AmbulanceRequestSchema from '../../models/AmbulanceRequest.js';
import AmbulanceRequestType from '../types/ambulanceRequestType.js'

const ambulanceRequestMutations = {
  addAmbulanceRequest: {
    type: AmbulanceRequestType,
    args: {
      ambulanceRequestId: { type: new GraphQLNonNull(GraphQLString) },
      location: { type: new GraphQLNonNull(GraphQLString) },
      emergencyInfo: { type: new GraphQLNonNull(GraphQLString) },
      status: { type: new GraphQLNonNull(GraphQLString) },
      requesterName: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      const ambulanceRequestModel = new AmbulanceRequestSchema(args);
      return ambulanceRequestModel.save();
    },
  },
  updateAmbulanceRequest: {
    type: AmbulanceRequestType,
    args: {
      ambulanceRequestId: { type: new GraphQLNonNull(GraphQLString) },
      location: { type: new GraphQLNonNull(GraphQLString) },
      emergencyInfo: { type: new GraphQLNonNull(GraphQLString) },
      status: { type: new GraphQLNonNull(GraphQLString) },
      requesterName: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      return AmbulanceRequestSchema.findByIdAndUpdate(
        args.ambulanceRequestId,
        { $set: args },
        { new: true }
      ).catch(err => new Error(err));
    },
  },
  deleteAmbulanceRequest: {
    type: AmbulanceRequestType,
    args: {
      ambulanceRequestId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      return AmbulanceRequestSchema.findByIdAndRemove(args.ambulanceRequestId).exec();
    },
  },
  assignAmbulance: {
    type: AmbulanceRequestType,
    args: {
      ambulanceRequestId: { type: new GraphQLNonNull(GraphQLString) },
      ambulanceId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      const updatedAmbulanceRequest = await AmbulanceRequestSchema.findByIdAndUpdate(
        args.ambulanceRequestId,
        { assignedAmbulance: args.ambulanceId },
        { new: true }
      );
      if (!updatedAmbulanceRequest) {
        throw new Error('Error assigning ambulance to request');
      }
      return updatedAmbulanceRequest;
    },
  },
};

export default ambulanceRequestMutations;
