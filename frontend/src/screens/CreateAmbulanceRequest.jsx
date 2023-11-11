import React, { Component } from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./entryform.css"
//
//
const ADD_AMBULANCE_REQUEST = gql`
  mutation AddAmbulanceRequest(
        $ambulanceRequestId: String!,
        $location: String!,
        $emergencyInfo: String!,
        $status: String! ,
        $requesterName: String!   
        
        ) {
        addAmbulanceRequest(
            ambulanceRequestId: $ambulanceRequestId,
            location: $location,
            emergencyInfo: $emergencyInfo,
            status: $status,
            requesterName: $requesterName,

            
            ) {
            ambulanceRequestId
            location
            emergencyInfo
            status
            requesterName
        }
    }
`;
//function component to add a student
const CreateAmbulanceRequest = () => {
    //
    let navigate = useNavigate()
    //
    let location, emergencyInfo, status, requesterName,ambulanceRequestId;
    const [addAmbulanceRequest, { data, loading, error }] = useMutation(ADD_AMBULANCE_REQUEST);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div className = 'entryform'>
            <form
                onSubmit={ e => {    
                    e.preventDefault();
                    console.log("ambulanceRequestId.value: " + ambulanceRequestId.value);
                    console.log("location.value: " + location.value);
                    console.log("emergencyInfo.value: " + emergencyInfo.value);
                    console.log("status.value: " + 'Pending');
                    console.log("requesterName.value: " + requesterName.value);
                    addAmbulanceRequest( { variables: { ambulanceRequestId:ambulanceRequestId.value,
                        location: location.value,
                         emergencyInfo: emergencyInfo.value, status: 'Pending',
                         requesterName: requesterName.value, } 
                    });
                    //
                    location.value = '';
                    emergencyInfo.value='';
                    requesterName.value='';
                    ambulanceRequestId.value='';
                    alert("Ambulance Request Submitted Successfully")
                    navigate('/home')                    } 
                }
            >

                    <Form.Group>
                        <Form.Label>Ambulance Request Id:</Form.Label>
                        <Form.Control type="text"  name="ambulanceRequestId" ref={node => {ambulanceRequestId = node; }} 
                            placeholder="Enter the ambulance request id" />
                    </Form.Group>   
                    <Form.Group>
                        <Form.Label>Location:</Form.Label>
                        <Form.Control type="text"  name="location" ref={node => {location = node; }} 
                            placeholder="Enter the location" />
                    </Form.Group>                   
                    

                    <Form.Group>
                        <Form.Label>Emergency Info:</Form.Label>
                        <Form.Control as="textarea" name = "emergencyInfo" rows={3} ref={node => {emergencyInfo = node; }} />
                    </Form.Group> 

                    <Form.Group>
                        <Form.Label> Requester Name:</Form.Label>
                        <Form.Control type="text"  name="requesterName" ref={node => {requesterName = node; }} 
                            placeholder="Enter the Requester name" />
                    </Form.Group>                     
                
                    <Button variant="primary" type="submit">Submit Request</Button>

            </form>
        </div>
    );
}

export default CreateAmbulanceRequest
