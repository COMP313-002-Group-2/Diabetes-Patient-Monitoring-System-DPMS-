import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
  } from 'graphql';
  
  const EmergencyRequestType = new GraphQLObjectType({
    name: 'EmergencyRequest',
    fields: () => ({
      _id: { type: GraphQLID },
      location: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      status: { type: new GraphQLNonNull(GraphQLString) },
      address: { type: new GraphQLNonNull(GraphQLString) }
    }),
  });
  
  export { EmergencyRequestType };
  