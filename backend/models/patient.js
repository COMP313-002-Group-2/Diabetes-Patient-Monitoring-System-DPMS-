import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    userId:{
        type:String
    },

    address1:{
        type:String
    },

    address2:{
        type:String
    },

    city:{
        type:String
    },

    phoneNumber:{
        type:String
    },

    postalCode:{
        type:String
    }
})

//module.exports = mongoose.model('Patient',patientSchema)

const Patient = mongoose.model('Patient', patientSchema);
 
export default Patient;
