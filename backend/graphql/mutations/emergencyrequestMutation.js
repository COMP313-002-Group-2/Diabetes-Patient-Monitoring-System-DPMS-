import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
} from 'graphql';

import { EmergencyRequestType } from '../../graphql/types/emergenctRequestType.js'
import EmergencyRequest from '../../models/emergencyrequest.js'; 

const emergencyRequestMutations = {
    addEmergencyRequest: {
        type: EmergencyRequestType,
        args: {
            location: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: new GraphQLNonNull(GraphQLString) },
            email: { type: new GraphQLNonNull(GraphQLString) },
            status: { type: new GraphQLNonNull(GraphQLString) },
            address: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, args) {
            let newEmergencyRequest = new EmergencyRequest({
                location: args.location,
                description: args.description,
                email: args.email,
                status:args.status,
                address:args.address
            });
            return newEmergencyRequest.save();
        }
    },
    updateRequestStatus: {
        type: EmergencyRequestType,
        args: {
          id: { type: GraphQLNonNull(GraphQLString) },
          status: { type: GraphQLNonNull(GraphQLString) },
        },
        async resolve(parent, args) {
          try {
            const updatedRequest = await EmergencyRequest.findByIdAndUpdate(
              args.id,
              { status: args.status },
              { new: true }
            );
            return updatedRequest;
          } catch (err) {
            throw new Error(err.message);
          }
        },
    },
   
};

export default emergencyRequestMutations;