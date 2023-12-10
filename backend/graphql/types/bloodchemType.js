import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

const BloodchemType = new GraphQLObjectType({
  name: 'Bloodchem',
  fields: () => ({
    _id: { type: GraphQLID },
    patientId: { type: new GraphQLNonNull(GraphQLID) },
    documentId: { type: new GraphQLNonNull(GraphQLString) },
    labDate: { type: new GraphQLNonNull(GraphQLString) }, 
    glucose: { type: new GraphQLNonNull(GraphQLFloat) },
    altSGPT: { type: new GraphQLNonNull(GraphQLFloat) },
    astSGOT: { type: new GraphQLNonNull(GraphQLFloat) },
    uricAcid: { type: new GraphQLNonNull(GraphQLFloat) },
    bun: { type: new GraphQLNonNull(GraphQLFloat) },
    cholesterol: { type: new GraphQLNonNull(GraphQLFloat) },
    triglycerides: { type: new GraphQLNonNull(GraphQLFloat) },
    hdlCholesterol: { type: new GraphQLNonNull(GraphQLFloat) },
    aLDL: { type: new GraphQLNonNull(GraphQLFloat) },
    vLDL: { type: new GraphQLNonNull(GraphQLFloat) },
    creatinine: { type: new GraphQLNonNull(GraphQLFloat) },
    eGFR: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

export { BloodchemType };
