require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const port = process.env.PORT || 2003;
const User = require("./models/user");
const Alert = require("./models/alert");

app.use(cors()); // Make sure you have express initialised before this.

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLEnumType,
} = require("graphql");

const { Query } = require("mongoose");
const user = require("./models/user");

//Const
const PATIENT_TYPE = "PATIENT";

// Connect Database
connectDB();

const UserType = new GraphQLObjectType({
  name: "User",
  description: "Represents a user",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    userType: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const AlertType = new GraphQLObjectType({
  name: "Alert",
  description: "Alerts",
  fields: () => ({
    _id: { type: GraphQLString },
    alertName: { type: GraphQLString },
    alertDescription: { type: GraphQLString },
    status: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.patientId);
      },
    },
  }),
});

const UserQuery = new GraphQLObjectType({
  name: "UserQuery",
  description: "User Queries",
  fields: () => ({
    userById: {
      type: UserType,
      description: "Returns a single user by id",
      args: {
        _id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let user = await User.findById(args._id);
        return user;
      },
    },
    userByEmail: {
      type: UserType,
      description: "Returns a single user by email",
      args: {
        email: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let user = await User.findOne({ email: args.email }).exec();
        return user;
      },
    },
  

    // staff
    getStaff: {
      type: GraphQLList(UserType),
      description: "Returns a list of staff",
      args: {},
      resolve: async (parent, args) => {
        let users = await User.find({ userType: "STAFF" }).exec();
        console.log("Get Staff:", users);
        return users;
      },
    },
  
    getPatients: {
      type: GraphQLList(UserType),
      description: "Returns a list of patients",
      args: {},
      resolve: async (parent, args) => {
        let users = await User.find({ userType: PATIENT_TYPE }).exec();
        console.log("Get Patients:", users);
        return users;
      },
    },

    // alerts
    getAlerts: {
      type: GraphQLList(AlertType),
      description: "Returns all alerts",
      args: {},
      resolve: async (parent, args) => {
        let alerts = await Alert.find();
        console.log("Get Alerts:", alerts);
        return alerts;
      },
    },
    alert: {
      type: AlertType,
      description: "Returns a single alert",
      args: {
        _id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let alert = await Alert.findById(args._id);
        console.log("Get Alert:", alert);
        return alert;
      },
    },
  }),
});

const AlertQuery = new GraphQLObjectType({
  name: "AlertQuery",
  description: "Alert Queries",
  fields: () => ({
    alerts: {
      type: GraphQLList(AlertType),
      description: "Returns all alerts",
      args: {},
      resolve: async (parent, args) => {
        let alerts = await Alert.find();
        console.log("Get Alerts:", alerts);
        return alerts;
      },
    },
    alert: {
      type: AlertType,
      description: "Returns a single alert",
      args: {
        _id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let alert = await Alert.findById(args._id);
        console.log("Get Alert:", alert);
        return alert;
      },
    },
  }),
});

const UserMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "User Mutation",
  fields: () => ({
    addUser: {
      type: UserType,
      description: "Add a user",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        userType: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const user = new User({
          name: args.name,
          email: args.email,
          password: args.password,
          userType: args.userType,
        });
        const newUser = await user.save();
        return newUser;
      },
    },
    addAlert: {
      type: AlertType,
      description: "Add an alert",
      args: {
        alertName: { type: GraphQLNonNull(GraphQLString) },
        alertDescription: { type: GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLNonNull(GraphQLString) },
        patientId: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const alert = new Alert({
          alertName: args.alertName,
          alertDescription: args.alertDescription,
          status: args.status,
          patientId: args.patientId,
        });
        return await alert.save();
      },
    },
    deleteAlert: {
      type: AlertType,
      description: "Delete an alert",
      args: {
        _id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const alert = await Alert.findByIdAndRemove(args._id);
      },
    },
    updateAlert: {
      type: AlertType,
      description: "Update an alert",
      args: {
        _id: { type: GraphQLNonNull(GraphQLString) },
        alertName: { type: GraphQLNonNull(GraphQLString) },
        alertDescription: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "StatusUpdate",
            values: {
              ACTIVE: { value: "ACTIVE" },
              RESOLVED: { value: "RESOLVED" },
            },
          }),
        },
      },
      resolve: async (parent, args) => {
        const alert = await Alert.findByIdAndUpdate(
          args._id,
          {
            $set: {
              alertName: args.alertName,
              alertDescription: args.alertDescription,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  }),
});

const AlertMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Alert Mutation",
  fields: () => ({
    addAlert: {
      type: AlertType,
      description: "Add an alert",
      args: {
        alertName: { type: GraphQLNonNull(GraphQLString) },
        alertDescription: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "status",
            values: {
              ACTIVE: { value: "ACTIVE" },
              RESOLVED: { value: "RESOLVED" },
            },
          }),
          defaultValue: "ACTIVE",
        },
        patientId: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const alert = new Alert({
          alertName: args.alertName,
          alertDescription: args.alertDescription,
          status: args.status,
          patientId: args.patientId,
        });
        return await alert.save();
      },
    },
    deleteAlert: {
      type: AlertType,
      description: "Delete an alert",
      args: {
        _id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const alert = await Alert.findByIdAndRemove(args._id);
      },
    },
    updateAlert: {
      type: AlertType,
      description: "Update an alert",
      args: {
        _id: { type: GraphQLNonNull(GraphQLString) },
        alertName: { type: GraphQLNonNull(GraphQLString) },
        alertDescription: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "StatusUpdate",
            values: {
              ACTIVE: { value: "ACTIVE" },
              RESOLVED: { value: "RESOLVED" },
            },
          }),
        },
      },
      resolve: async (parent, args) => {
        const alert = await Alert.findByIdAndUpdate(
          args._id,
          {
            $set: {
              alertName: args.alertName,
              alertDescription: args.alertDescription,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  }),
});

const userSchema = new GraphQLSchema({
  query: UserQuery,
  mutation: UserMutation,
});

const alertSchema = new GraphQLSchema({
  query: AlertQuery,
  mutation: AlertMutation,
});

app.use(express.json());
app.use(
  "/users",
  expressGraphQL({
    schema: userSchema,
    graphiql: true,
  })
);
app.use(
  "/alert",
  expressGraphQL({
    schema: alertSchema,
    graphiql: true,
  })
);

app.listen(port, () => console.log(`Server Started: http://localhost:${port}`));

module.exports = app;
