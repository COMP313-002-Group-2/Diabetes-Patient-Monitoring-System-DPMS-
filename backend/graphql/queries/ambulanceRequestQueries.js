import { GraphQLObjectType, GraphQLString,GraphQLNonNull,GraphQLID,GraphQLList } from 'graphql';
import AmbulanceRequestSchema from '../../models/AmbulanceRequest.js';
import AmbulanceRequestType from '../types/ambulanceRequestType.js'

const ambulanceRequestQueries = {
    getAmbulanceRequests: {
        type: new GraphQLList(AmbulanceRequestType),
        resolve: function () {
          const ambulances = AmbulanceRequestSchema.find().exec();
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
          const ambulanceInfo = AmbulanceRequestSchema.findById(params.id).exec();
          if (!ambulanceInfo) {
            throw new Error('Error');
          }
          return ambulanceInfo;
        }
      }
};

export default ambulanceRequestQueries;
