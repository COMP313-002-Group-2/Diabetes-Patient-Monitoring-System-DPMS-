import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
} from 'graphql';

import { EmergencyRequestType } from '../types/emergencyRequestType.js'; 
import EmergencyRequest from '../../models/emergencyrequest.js'; 

const emergencyRequestMutations = {
    addEmergencyRequest: {
        type: EmergencyRequestType,
        args: {
            location: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: new GraphQLNonNull(GraphQLString) },
            email: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(parent, args) {
            let newEmergencyRequest = new EmergencyRequest({
                location: args.location,
                description: args.description,
                email: args.email,
            });
            return newEmergencyRequest.save();
        }
    },
   
};

export default emergencyRequestMutations;