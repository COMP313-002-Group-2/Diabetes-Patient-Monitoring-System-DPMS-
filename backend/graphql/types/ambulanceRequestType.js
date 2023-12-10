import { GraphQLObjectType, GraphQLString } from 'graphql';
import AmbulanceRequestSchema from '../../models/AmbulanceRequest.js';


const AmbulanceRequestType = new GraphQLObjectType({
    name: 'AmbulanceRequestType',
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
          return await AmbulanceRequestSchema.findById(parent.assignedAmbulance);
        },
      },
    }),
  });
  
export default AmbulanceRequestType ;