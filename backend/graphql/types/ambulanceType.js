import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

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

export {ambulanceType};
