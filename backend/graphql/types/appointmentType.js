import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInputObjectType,
} from 'graphql';

const AppointmentType = new GraphQLObjectType({
    name: 'Appointment',
    fields: () => ({
        _id: { type: GraphQLID },
        physicianId: { type: GraphQLID },
        appointmentName: { type: GraphQLString },
        request: { type: GraphQLString },
        patientName: { type: GraphQLString },
        date: { type: GraphQLString },
        time: { type: GraphQLString },
        
    }),
});

const AppointmentTypeInput = new GraphQLInputObjectType({
    name: 'AppointmentInputType',
    fields: () => ({
        _id: { type: GraphQLID },
        physicianId: { type: GraphQLID },
        appointmentName: { type: GraphQLString },
        request: { type: GraphQLString },
        patientName: { type: GraphQLString },
        date: { type: GraphQLString },
        time: { type: GraphQLString },
    }),
});

export { AppointmentType, AppointmentTypeInput };  