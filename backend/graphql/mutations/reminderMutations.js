import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
} from 'graphql';

import { ReminderType } from '../types/reminderType.js';
import Reminder from '../../models/reminder.js';

const reminderMutations = {
    addReminder: {
        type: ReminderType,
        args: {
            patientId: { type: new GraphQLNonNull(GraphQLString) },
            reminderName: { type: new GraphQLNonNull(GraphQLString) },
            reminderDescription: { type: new GraphQLNonNull(GraphQLString) },
            status: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(parent, args) {
                            let newReminder = new Reminder({
                    patientId: args.patientId,
                    reminderName: args.reminderName,
                    reminderDescription: args.reminderDescription,
                    status: args.status,
                });
                                    return newReminder.save();
                }
                },
    updateReminder: {
        type: ReminderType,
        args: {
            _id: { type: new GraphQLNonNull(GraphQLID) },
            patientId: { type: new GraphQLNonNull(GraphQLString) },
            reminderName: { type: GraphQLString },
            reminderDescription: { type: GraphQLString },
            status: { type: GraphQLString },
        },
        resolve(parent, args) {
            return Reminder.findByIdAndUpdate(
                args._id,
                {
                    $set: {
                        patientId: args.patientId,
                        reminderName: args.reminderName,
                        reminderDescription: args.reminderDescription,
                        status: args.status,
                    },
                },
                { new: true }
            );
        },
    },
    deleteReminder: {
        type: ReminderType,
        args: {
            _id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
            return Reminder.findByIdAndDelete(args._id);
        },
    },    
};

export default reminderMutations;