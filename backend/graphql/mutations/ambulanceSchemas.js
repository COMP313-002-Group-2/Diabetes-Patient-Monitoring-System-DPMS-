var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var AmbulanceModel = require('../../models/ambulance');
const nodemailer = require('nodemailer')

//creating transporter object for email transfer
let transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "crosscare2023@outlook.com", // generated ethereal user
    pass: "Vimal1996", // generated ethereal password
  },
});

// Create a GraphQL Object Type for Ambulance model
const ambulanceType = new GraphQLObjectType({
  name: 'ambulance',
  fields: () => ({
    _id: { type: GraphQLString },
    crewMembers: { type: GraphQLString },
    location: { type: GraphQLString },
    status: { type: GraphQLString },
    eta: { type: GraphQLInt }
  })
});

//creating email model for dispatching email
const emailModel = new GraphQLObjectType({
  name: "email",
  fields: () => ({
    ambId: { type: GraphQLString },
    rxEmail: { type: GraphQLString }
  })
})

// Create a GraphQL query type that returns all ambulances or an ambulance by ID
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      ambulances: {
        type: new GraphQLList(ambulanceType),
        resolve: function () {
          const ambulances = AmbulanceModel.find().exec();
          if (!ambulances) {
            throw new Error('Error');
          }
          return ambulances;
        }
      },
      ambulance: {
        type: ambulanceType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          const ambulanceInfo = AmbulanceModel.findById(params.id).exec();
          if (!ambulanceInfo) {
            throw new Error('Error');
          }
          return ambulanceInfo;
        }
      }
    }
  }
});

// Create a GraphQL mutation type for CRUD operations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      addAmbulance: {
        type: ambulanceType,
        args: {
          crewMembers: { type: new GraphQLNonNull(GraphQLString) },
          location: { type: new GraphQLNonNull(GraphQLString) },
          status: { type: new GraphQLNonNull(GraphQLString) },
          eta: { type: new GraphQLNonNull(GraphQLInt) }
        },
        resolve: function (root, params) {
          const ambulanceModel = new AmbulanceModel(params);
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
          return AmbulanceModel.findByIdAndUpdate(
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
          const removedAmbulance = AmbulanceModel.findByIdAndRemove(params.id).exec();
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
    }

  }
});

// Export the GraphQL schema
module.exports = new GraphQLSchema({
  query: queryType,
  mutation: mutation
});
