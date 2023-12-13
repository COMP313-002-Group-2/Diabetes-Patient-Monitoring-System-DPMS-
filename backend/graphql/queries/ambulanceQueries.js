import { GraphQLObjectType, GraphQLString,GraphQLNonNull,GraphQLID,GraphQLList } from 'graphql';
import AmbulanceSchema from '../../models/ambulance.js';
import { ambulanceType } from '../types/ambulanceType.js';

  const ambulanceQueries = {
    getAmbulances: {
        type: new GraphQLList(ambulanceType),
        resolve: function () {
          const ambulances = AmbulanceSchema.find().exec();
          if (!ambulances) {
            throw new Error('Error');
          }
          return ambulances;
        }
      },
      getAmbulance: {
        type: ambulanceType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          const ambulanceInfo = AmbulanceSchema.findById(params.id).exec();
          if (!ambulanceInfo) {
            throw new Error('Error');
          }
          return ambulanceInfo;
        }
      }
  };
  export default ambulanceQueries;
