import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInputObjectType,
} from 'graphql';

const ReminderType = new GraphQLObjectType({
    name: 'Reminder',
    fields: () => ({
        _id: { type: GraphQLID },
        patientId: { type: GraphQLString },
        reminderName: { type: GraphQLString },
        reminderDescription: { type: GraphQLString },
        status: { type: GraphQLString },
    }),
});

const ReminderTypeInput = new GraphQLInputObjectType({
    name: 'ReminderInputType',
    fields: () => ({
        _id: { type: GraphQLID },
        reminderName: { type: GraphQLString },
        reminderDescription: { type: GraphQLString },
        patientId: { type: GraphQLString },
        status: { type: GraphQLString },
    }),
});

export { ReminderType, ReminderTypeInput };  