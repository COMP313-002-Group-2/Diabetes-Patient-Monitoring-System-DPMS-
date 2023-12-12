import { GraphQLObjectType, GraphQLString } from 'graphql';

const PatientType = new GraphQLObjectType({
    name:'Patient',
    fields:()=>({
        userId:{type:GraphQLString},
        address1:{type:GraphQLString},
        address2:{type:GraphQLString},
        city:{type:GraphQLString},
        phoneNumber:{type:GraphQLString},
        postalCode:{type:GraphQLString}
    })
});
   
export {PatientType};