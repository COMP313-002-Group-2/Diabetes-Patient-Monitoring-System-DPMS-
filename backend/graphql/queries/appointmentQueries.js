import { AppointmentType } from "../types/appointmentType.js";
import Appointment from "../../models/appointment.js";
import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import User from "../../models/user.js";

const appointmentQueries = {
    getAppointmentById: {
        type: AppointmentType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
        let appoinments = Appointment.findById(args.id);
        return appoinments;
        // Logic to retrieve appointment by ID from your data source goes here.
        },
    },

    getAppointments: {
        type: new GraphQLList(AppointmentType),
        resolve() {
        let appointments = Appointment.find();
        return appointments;
        // Logic to retrieve all appointments from your data source goes here.
        },
    },

    getAppointmentsByPhysician: {
        type: new GraphQLList(AppointmentType),
        args: { physicianId: { type: GraphQLID } },
        resolve(parent, args) {
            const physician = User.findById(args.physicianId);
            try {
                let appointments = Appointment.find({physicianId: args.physicianId});
                return appointments;
            }
            catch {
                throw new Error("Invalid physician ID");      
            }
        },
    },    
};

export default appointmentQueries;
