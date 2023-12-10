import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const ADD_AMBULANCE = gql`
  mutation AddAmbulance(
    $crewMembers: String!,
    $location: String!,
    $status: String!,
    $eta: Int!
  ) {
    addAmbulance(
      crewMembers: $crewMembers,
      location: $location,
      status: $status,
      eta: $eta
    ) {
      _id
    }
  }
`;

const AddAmbulance = () => {
  const [usedCrewMembers, setUsedCrewMembers] = useState([]);
  let navigate = useNavigate();
  let crewMembers, location, status, eta;

  const [addAmbulance, { data, loading, error }] = useMutation(ADD_AMBULANCE);

  const locationList = [
    { name: "Lawrence and Markham, Scarborough", eta: 20 },
    { name: "Finch East, Markham", eta: 45 },
    { name: "Progress Avenue, Scarborough", eta: 1 },
    { name: "Elsmere and Markham, Scarborough", eta: 10 },
  ];

  const crewMembersList = [
    { name: "Driver 1, EMT 1, Medic 1", available: true },
    { name: "Driver 2, EMT 2, Medic 2", available: true },
    { name: "Driver 3, EMT 3, Medic 3", available: true },
    { name: "Driver 4, EMT 4, Medic 4", available: true },
    { name: "Driver 5, EMT 5, Medic 5", available: true },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!crewMembers.value || !location.value || !status.value || !eta.value) {
      alert('Please fill in all fields');
      return;
    }

    const etaNum = parseInt(eta.value);
    if (isNaN(etaNum)) {
      alert('Please enter a valid number for ETA');
      return;
    }

    addAmbulance({
      variables: {
        crewMembers: crewMembers.value,
        location: location.value,
        status: status.value,
        eta: etaNum,
      },
    });

    crewMembers.value = '';
    location.value = '';
    status.value = '';
    eta.value = '';
    navigate('/ambulancelist2');
  };

  const handleCrewMembersChange = (e) => {
    const selectedCrewMember = e.target.value;
    const selectedCrewMemberIndex = crewMembersList.findIndex(cm => cm.name === selectedCrewMember);

    if (!crewMembersList[selectedCrewMemberIndex].available) {
      alert('Crew member already selected!');
      crewMembers.value = '';
      return;
    }

    crewMembersList[selectedCrewMemberIndex].available = false;
    setUsedCrewMembers([...usedCrewMembers, selectedCrewMember]);
  };

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="entryform">
      <form onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label>Crew Members:</Form.Label>
      <Form.Control
        as="select"
        name="crewMembers"
        ref={node => {crewMembers = node; }}
        onChange={handleCrewMembersChange}
      >
        <option value="">Select Crew Members</option>
        {crewMembersList.map((cm, i) => (
          <option
            key={i}
            value={cm.name}
            disabled={!cm.available}
          >
            {cm.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>

    <Form.Group>
      <Form.Label>Location:</Form.Label>
      <Form.Control
        as="select"
        name="location"
        ref={node => {location = node; }}
        onChange={(e) => {
          const selectedLocation = locationList.find(l => l.name === e.target.value);
          eta.value = selectedLocation ? selectedLocation.eta : '';
        }}
      >
        <option value="">Select a location</option>
        {locationList.map((l, i) => (
          <option key={i} value={l.name}>{l.name}</option>
        ))}
      </Form.Control>
    </Form.Group>

    <Form.Group>
      <Form.Label>Status:</Form.Label>
      <Form.Select name="status" ref={node => {status = node; }}>
        <option value="Available">Available</option>
        <option value="On-Route">En Route</option>
      </Form.Select>
    </Form.Group>

    <Form.Group>
      <Form.Label>ETA:</Form.Label>
      <Form.Control
        type="number"
        name="eta"
        ref={node => {eta = node; }}
        placeholder="ETA"
      />
    </Form.Group>

    <Button variant="primary" type="submit">
      Add Ambulance
    </Button>

    <Button variant="danger" onClick={() => navigate('/ambulancelist2')}>
      Cancel
    </Button>

  </form>
</div>
);
};

export default AddAmbulance;