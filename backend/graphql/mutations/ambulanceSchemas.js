import { GraphQLObjectType, GraphQLString } from 'graphql';
import {GraphQLList,GraphQLNonNull,GraphQLInt,GraphQLID}  from 'graphql';
import AmbulanceSchema from '../../models/ambulance.js';
import { ambulanceType } from '../types/ambulanceType.js';

import nodemailer from 'nodemailer';

//creating transporter object for email transfer
let transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "crosscare2023@outlook.com", // generated ethereal user
    pass: "Vimal1996", // generated ethereal password
  },
});
const emailModel = new GraphQLObjectType({
  name: "email",
  fields: () => ({
    ambId: { type: GraphQLString },
    rxEmail: { type: GraphQLString }
  })
})

// Create a GraphQL mutation type for CRUD operations
const ambulancemutation = {
      addAmbulance: {
        type: ambulanceType,
        args: {
          crewMembers: { type: new GraphQLNonNull(GraphQLString) },
          location: { type: new GraphQLNonNull(GraphQLString) },
          status: { type: new GraphQLNonNull(GraphQLString) },
          eta: { type: new GraphQLNonNull(GraphQLInt) }
        },
        resolve: function (root, params) {
          const ambulanceModel = new AmbulanceSchema(params);
          const newAmbulance = ambulanceModel.save();
          if (!newAmbulance) {
            throw new Error('Error');
          }
          return newAmbulance;
        }
      },

      updateAmbulance: {
        type: ambulanceType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
          crewMembers: { type: GraphQLString },
          location: { type: GraphQLString },
          status: { type: GraphQLString },
          eta: { type: GraphQLInt }
        },
        resolve: function (root, params) {
          return AmbulanceSchema.findByIdAndUpdate(
            params.id,
            { $set: params },
            { new: true }
          )
            .catch(err => new Error(err))
        }
      },

      deleteAmbulance: {
        type: ambulanceType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: function (root, params) {
          const removedAmbulance = AmbulanceSchema.findByIdAndRemove(params.id).exec();
          if (!removedAmbulance) {
            throw new Error('Error')
          }
          return removedAmbulance;
        }
      },

     emailOnDispatch: {
        type: emailModel,
        args: {
          ambId: { type: new GraphQLNonNull(GraphQLString) },
          rxEmail: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, args) {
          transporter.sendMail({
            from: "crosscare2023@outlook.com", // sender address
            to: "teenacentennial2022@gmail.com", // list of receivers
            subject: "CrossCare Ambulance Dispatched Successfully!", // Subject line
            text: `An ambulance has been dispatched successfully at ${new Date()} \n\nThank You\nCrossCare Team`, // plain text body  
          }, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        }
      },
    

  
};

export default ambulancemutation;
