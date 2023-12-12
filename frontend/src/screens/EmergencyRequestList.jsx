import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button, Table } from 'react-bootstrap';

const GET_EMERGENCY_REQUESTS = gql`
  query GetEmergencyRequests {
    getEmergencyRequests {
      _id
      description
      email
      status
      address
    }
  }
`;

const UPDATE_REQUEST_STATUS = gql`
  mutation UpdateRequestStatus($id: ID!) {
    updateRequestStatus(id: $id, status: "Accepted") {
      _id
      status
    }
  }
`;

const EmergencyRequestsList = () => {
  const { loading, error, data, refetch } = useQuery(GET_EMERGENCY_REQUESTS);
  const [updateRequestStatus] = useMutation(UPDATE_REQUEST_STATUS);

  const handleAcceptRequest = (requestId) => {
    updateRequestStatus({ variables: { id: requestId } })
      .then(() => {
        // Refetch the updated list of emergency requests
        // This will update the UI with the latest data
        refetch();
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { emergencyRequests } = data;

  return (
    <div className="container mt-5">
      <h1>Emergency Requests</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Email</th>
            <th>Address</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.getEmergencyRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.description}</td>
              <td>{request.email}</td>
              <td>{request.address}</td>
              <td>{request.status || 'Pending'}</td>
              <td>
                {request.status !== 'Accepted' && (
                  <Button onClick={() => handleAcceptRequest(request._id)}>
                    Accept
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmergencyRequestsList;
