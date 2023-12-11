import { ReminderType } from "../types/reminderType.js";
import Reminder from "../../models/reminder.js";
import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import User from "../../models/user.js";

const reminderQueries = {
    getReminderById: {
        type: ReminderType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
        let reminders = Reminder.findById(args.id);
        return reminders;
        // Logic to retrieve reminder by ID from your data source goes here.
        },
    },
    getReminders: {
        type: new GraphQLList(ReminderType),
        resolve() {
        let reminders = Reminder.find();
        return reminders;
        // Logic to retrieve all reminders from your data source goes here.
        },
    },
    getRemindersByPatient: {
        type: new GraphQLList(ReminderType),
        args: { patientId: { type: GraphQLID } },
        resolve(parent, args) {
            const patient = User.findById(args.patientId);            
            try {
                let reminders = Reminder.find({patientId: args.patientId});
                return reminders;
            }
            catch {
                throw new Error("Invalid patient ID");      
            }
        },
    },
    getRemindersByStatus: {
        type: new GraphQLList(ReminderType),
        args: { status: { type: GraphQLString } },
        resolve(parent, args) {

            try {
                let reminders = Reminder.find({status: args.status});
                return reminders;
            }
            catch {
                throw new Error("Invalid status");      
            }
        },
    },
    getRemindersByPatientAndStatus: {
        type: new GraphQLList(ReminderType),
        args: { patientId: { type: GraphQLID }, status: { type: GraphQLString } },
        resolve(parent, args) {

            try {
                let reminders = Reminder.find({patientId: args.patientId, status: args.status});
                return reminders;
            }
            catch {
                throw new Error("Invalid patient ID or status");      
            }
        },
    },
};

export default reminderQueries;
