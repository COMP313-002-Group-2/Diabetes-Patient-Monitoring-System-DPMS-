import { gql } from '@apollo/client';

const GET_ALERTS = gql`
{
    getAlerts {
        _id
        alertName
        alertDescription
        status 
    }
}
`;

const GET_ALERT = gql`
{
    alert($id: ID!) {
        _id
        alertName
        alertDescription
        status
        user {
            _id
            name
            email
            userType
        }
    }
}
`;

export { GET_ALERTS, GET_ALERT };
