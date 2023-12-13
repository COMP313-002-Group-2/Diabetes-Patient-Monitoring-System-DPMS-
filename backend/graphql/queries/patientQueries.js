import { GraphQLList, GraphQLString } from 'graphql';
import Patient from '../../models/patient.js';
import { PatientType } from '../types/patientType.js';

const PatientQueries = {
    GetPatientDetailsById:{
        type:PatientType,
        args:{id: { type: GraphQLString } },
        async  resolve (parent, args) {
            const existingPatient = await Patient.findOne({_id:args.id})
            console.log(existingPatient)
            const {userId,address1,address2,city,phoneNumber,postalCode} = existingPatient;
            return {
                address1,
                address2,
                city,
                phoneNumber,
                postalCode
            }
          }
    }
}

export default PatientQueries