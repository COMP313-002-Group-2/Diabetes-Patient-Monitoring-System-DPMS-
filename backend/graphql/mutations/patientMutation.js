import {
    GraphQLID,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLString,
    GraphQLObjectType,
} from 'graphql';
import Patient from '../../models/patient.js'
import { PatientType } from '../types/patientType.js';


const patientMutation = {
    AddPatientInfo: {
        type: PatientType,
        args: {
            userId: { type: new GraphQLNonNull(GraphQLString) },
            address1: { type: new GraphQLNonNull(GraphQLString) },
            address2: { type: new GraphQLNonNull(GraphQLString) },
            city: { type: new GraphQLNonNull(GraphQLString) },
            phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
            postalCode: { type: new GraphQLNonNull(GraphQLString) }
        },

        resolve: async function (root, params) {
            try {
                const existingPatient = await Patient.findOne({ userId: params.userId })

                if (existingPatient) {
                    existingPatient.address1 = params.address1;
                    existingPatient.address2 = params.address2;
                    existingPatient.city = params.city;
                    existingPatient.phoneNumber = params.phoneNumber;
                    existingPatient.postalCode = params.postalCode;

                    await existingPatient.save();
                    console.log("patient details updated");
                    return existingPatient;
                } else {
                    const patientModel = new Patient({
                        userId: params.userId,
                        address1: params.address1,
                        address2: params.address2,
                        city: params.city,
                        phoneNumber: params.phoneNumber,
                        postalCode: params.postalCode
                    })

                    await patientModel.save()
                    console.log("New Patient Created");
                    return patientModel;
                }
            } catch (error) {
                console.log("Error saving data", error);
                throw error;
            }
        }
    }
};



export default patientMutation;