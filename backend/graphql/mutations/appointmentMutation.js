import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLObjectType
} from 'graphql';

import { AppointmentType } from '../types/appointmentType.js';
import Appointment from '../../models/appointment.js';
import User from '../../models/user.js';
import nodemailer from 'nodemailer'

//creating transporter object for email transfer
let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "crosscare2023@outlook.com", // generated ethereal user
      pass: "Vimal1996", // generated ethereal password
    },
  });

  //creating email model for dispatching email
const emailModel = new GraphQLObjectType({
    name: "email",
    fields: () => ({
      ambId: { type: GraphQLString },
      rxEmail: { type: GraphQLString }
    })
  })


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
            meetingId:{type:new GraphQLNonNull(GraphQLString)}
            
        },
        async resolve(parent, args) {
                let newAppointment = new Appointment({
                    physicianId: args.physicianId,
                    appointmentName: args.appointmentName,
                    patientName: args.patientName,
                    request: args.request,
                    date: args.date,
                    time: args.time,
                    meetingId:args.meetingId
                });
                    const newAppointmentResult =await  newAppointment.save();
                    const userdata  =await User.findById(newAppointmentResult.physicianId);
                    const doctorsEmail = userdata.email;
                    const zoomLink = `zoommtg://zoom.us/join?confno=${args.meetingId}`; 

                    transporter.sendMail({
                        from:'crosscare2023@outlook.com',
                        to:doctorsEmail,
                        subject:`Zoom link for meeting with ${args.patientName}`,
                        text:`A zoom link has been sent with meeting Id. ${zoomLink} . Meeting Id is ${args.meetingId}`
                    },(error,info)=>{
                        if(error){
                            console.log(error);
                        }else{
                            console.log('Email sent: ' + info.response);
                        }
                    })

                    return newAppointment;

                }
        },

    updateAppointment: {
        type: AppointmentType,
        args: {
            _id: { type: new GraphQLNonNull(GraphQLID) },
            physicianId: { type: new GraphQLNonNull(GraphQLString) },
            appointmentName: { type: GraphQLString },
            patientName: { type: GraphQLString },
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
                        patientName: args.patientName,
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