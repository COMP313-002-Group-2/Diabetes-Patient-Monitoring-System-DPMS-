var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var AmbulanceRequestModel = require('../models/AmbulanceRequest');



const AmbulanceRequestType = new GraphQLObjectType({
    name: 'AmbulanceRequest',
    fields: () => ({
      _id: { type: GraphQLString },
      ambulanceRequestId: { type: GraphQLString },
      requesterName: { type: GraphQLString },
      location: { type: GraphQLString },
      status: { type: GraphQLString },
      emergencyInfo: { type: GraphQLString },
      assignedAmbulance: {
        type: AmbulanceRequestType,
        async resolve(parent) {
          if (!parent.assignedAmbulance) {
            console.log("hello")
            return null;
          }
          return await AmbulanceRequestModel.findById(parent.assignedAmbulance);
        },
      },
    }),
  });
    

// Create a GraphQL mutation type for CRUD operations
const ambulanceRequestMutation = new GraphQLObjectType({
    name: 'MutationAmbulanceRequest',
    fields: function () {
        return {
    addAmbulanceRequest: {
        type: AmbulanceRequestType,
        args: {
          
            ambulanceRequestId: { type: new GraphQLNonNull(GraphQLString) },
            location: { type: new GraphQLNonNull(GraphQLString) },
            emergencyInfo: { type: new GraphQLNonNull(GraphQLString) },
            status: { type: new GraphQLNonNull(GraphQLString) },
            requesterName: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params) {
          const ambulanceRequestModel = new AmbulanceRequestModel(params);
          console.log(params.ambulanceRequestId);
          console.log(params);
          const newAmbulanceRequest = ambulanceRequestModel.save();
          if (!newAmbulanceRequest) {
            throw new Error('Error');
          }
          return newAmbulanceRequest;
        }
      },
  
      updateAmbulanceRequest: {
        type: AmbulanceRequestType,
        args: {
          ambulanceRequestId: { type: new GraphQLNonNull(GraphQLString) },
          location: { type: new GraphQLNonNull(GraphQLString) },
          emergencyInfo: { type: new GraphQLNonNull(GraphQLString) },
          status: { type: new GraphQLNonNull(GraphQLString) },
          requesterName: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: function (root, params) {
          return AmbulanceRequestModel.findByIdAndUpdate(
            params.id,
            { $set: params },
            { new: true }
          )
            .catch(err => new Error(err))
        }
      },
      deleteAmbulanceRequest: {
        type: AmbulanceRequestType,
        args: {
          ambulanceRequestId: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: function (root, params) {
          const removedAmbulance = AmbulanceRequestModel.findByIdAndRemove(params.ambulanceRequestId).exec();
          if (!removedAmbulance) {
            throw new Error('Error')
          }
          return removedAmbulance;
        }
      },
      assignAmbulance: {
        type: AmbulanceRequestType,
        args: {
          ambulanceRequestId: { type: new GraphQLNonNull(GraphQLString) },
          ambulanceId: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (parent, args) => {
          const updatedAmbulanceRequest = await AmbulanceRequestModel.findByIdAndUpdate(
            args.ambulanceRequestId,
            { assignedAmbulance: args.ambulanceId },
            { new: true }
          );
          if (!updatedAmbulanceRequest) {
            throw new Error('Error assigning ambulance to request');
          }
          return updatedAmbulanceRequest;
        }
    },

    }}});

    export default ambulanceRequestMutation ;