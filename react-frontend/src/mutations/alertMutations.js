import { gql } from "@apollo/client";

const ADD_ALERT = gql`
    mutation addAlert(alertName: String!, alertDescription: String!, status: AlertStatus!, patientId: _id!){
        addAlert(alertName: $alertName, alertDescription: $alertDescription, status: $status, patientId: $patientId){
            _id
            alertName
            alertDescription
            status
            patientId: $_id
        }{
            _id
            name
            userName
            email
            user{
                _id
                name
                userName
                email
                userType
            }

        }
    }
`;

const DELETE_ALERT = gql`
    mutation deleteAlert(_id: ID!){
        deleteAlert(_id: $_id){
            _id

        }
    }
`;

const UPDATE_ALERT = gql`
    mutation updateAlert(
        $_id: ID!, 
        $alertName: String!, 
        $alertDescription: String!, 
        $status: AlertStatus!)
        {
        updateAlert(
            _id: $_id, 
            alertName: $alertName, 
            alertDescription: $alertDescription, 
            status: $status)
            {
            _id
            alertName
            alertDescription
            status
            user{
                _id
                name
                userName
                email
                userType
            }
        }
    }
`;

export { ADD_ALERT, DELETE_ALERT, UPDATE_ALERT };