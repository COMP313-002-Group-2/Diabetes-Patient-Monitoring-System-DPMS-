import EmergencyRequest from "../../models/emergencyrequest.js";
import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import EmergencyRequest from "../../models/emergencyrequest.js";

const emergencyRequestQueries = {
    getEmergencyRequests: {
        type: new GraphQLList(EmergencyRequestType),
        resolve() {
            return EmergencyRequest.find();
        },
    },
   
};

export default emergencyRequestQueries;
