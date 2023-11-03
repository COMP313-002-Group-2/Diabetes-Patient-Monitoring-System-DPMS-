import { ReminderType } from "../types/reminderType.js";
import Reminder from "../../models/reminder.js";
import { GraphQLID, GraphQLList, GraphQLString } from "graphql";

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
        console.log("GetReminders", reminders);
        return reminders;
        // Logic to retrieve all reminders from your data source goes here.
        },
    },
    getRemindersByPatient: {
        type: new GraphQLList(ReminderType),
        args: { patient: { type: GraphQLID } },
        resolve(parent, args) {
        let reminders = Reminder.find({patient: args.patient});
        return reminders;
        // Logic to retrieve reminders by patient from your data source goes here.
        },
    },
    getRemindersByStatus: {
        type: new GraphQLList(ReminderType),
        args: { status: { type: GraphQLString } },
        resolve(parent, args) {
        let reminders = Reminder.find({status: args.status});
        return reminders;
        // Logic to retrieve reminders by status from your data source goes here.
        },
    },
    };

    export default reminderQueries;
