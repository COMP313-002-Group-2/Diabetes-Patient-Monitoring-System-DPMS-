import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
} from 'graphql';

import { AppointmentType } from '../types/appointmentType.js';
import Appointment from '../../models/appointment.js';

const appointmentMutations = {
    addAppointment: {
        type: AppointmentType,
        args: {
            physicianId: { type: new GraphQLNonNull(GraphQLString) },
            appointmentName: { type: new GraphQLNonNull(GraphQLString) },
            patientName: { type: new GraphQLNonNull(GraphQLString) },
            request: { type: new GraphQLNonNull(GraphQLString) },
            date: { type: new GraphQLNonNull(GraphQLString) },
            time: { type: new GraphQLNonNull(GraphQLString) },
            
        },
        resolve(parent, args) {
                            let newAppointment = new Appointment({
                    physicianId: args.physicianId,
                    appointmentName: args.appointmentName,
                    patientName: args.patientName,
                    request: args.request,
                    date: args.date,
                    time: args.time,
                });
                                    return newAppointment.save();
                }
                },
    updateAppointment: {
        type: AppointmentType,
        args: {
            _id: { type: new GraphQLNonNull(GraphQLID) },
            physicianId: { type: new GraphQLNonNull(GraphQLString) },
            appointmentName: { type: GraphQLString },
            //patientName: { type: GraphQLString },
            request: { type: GraphQLString },
            date: { type: GraphQLString },
            time: { type: GraphQLString },
        },
        resolve(parent, args) {
            return Appointment.findByIdAndUpdate(
                args._id,
                {
                    $set: {
                        physicianId: args.physicianId,
                        appointmentName: args.appointmentName,
                        //patientName: args.patientName,
                        request: args.request,
                        date: args.date,
                        time: args.time,
                    },
                },
                { new: true }
            );
        },
    },
    deleteAppointment: {
        type: AppointmentType,
        args: {
            _id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
            return Appointment.findByIdAndDelete(args._id);
        },
    },    
};

export default appointmentMutations;