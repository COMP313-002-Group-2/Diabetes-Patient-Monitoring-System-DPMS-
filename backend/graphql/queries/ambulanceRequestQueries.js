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
const ambulanceRequestQueries = {
    getAmbulanceRequests: {
        type: new GraphQLList(AmbulanceRequestType),
        resolve: function () {
          const ambulances = AmbulanceRequestModel.find().exec();
          if (!ambulances) {
            throw new Error('Error');
          }
          return ambulances;
        }
      },
      getambulanceRequest: {
        type: AmbulanceRequestType,
        args: {
          id: { name: '_id',
          type: GraphQLString }
        },
        resolve: function (root, params) {
          const ambulanceInfo = AmbulanceRequestModel.findById(params.id).exec();
          if (!ambulanceInfo) {
            throw new Error('Error');
          }
          return ambulanceInfo;
        }
      }
};

export default ambulanceRequestQueries;
