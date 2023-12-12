import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_APPOINTMENT } from '../graphql/mutation';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { GET_APPOINTMENTS } from '../graphql/mutation'; 

export default function EditAppointmentModal({ appointmentId, physicianId, patientName,  appointmentName: initAppointmentName ='', request:initRequest = '', date: initDate = '', time: initTime = '', onHide }) {
    
    
    const [appointmentName, setAppointmentName] = useState(initAppointmentName);
    const [request, setRequest] = useState(initRequest);
    const [date, setDate] = useState(initDate);
    const [time, setTime] = useState(initTime);

    const [updateAppointment, { loading: updating, error: updateError }] = useMutation(UPDATE_APPOINTMENT, {
        onCompleted: () => {
            onHide();
            // Optionally, handle any additional tasks upon successful update
        },
        refetchQueries: [{ query: GET_APPOINTMENTS }],
        // Error handling could be implemented here as well
    });

    useEffect(() => {
        // Update the state when props change
        setAppointmentName(initAppointmentName || '');
        setRequest(initRequest);
        setDate(initDate);
        setTime(initTime);

        console.log('Received props:', {
            initAppointmentName,
            initRequest,
            initDate,
            initTime,
        });
      }, [initAppointmentName, initRequest, initDate, initTime]);

    const submitHandler = (e) => {
        e.preventDefault();
        updateAppointment({
            variables: {
                _id: appointmentId,
                physicianId: physicianId,
                appointmentName: appointmentName,
                patientName: patientName,
                request: request,
                time: time,
                date: date
            }
        });
    };

    if (updating) return 'Loading...';
    if (updateError) return `Error: ${updateError.message}`;
    return (        
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="appointmentName">
                        <Form.Label>Appointment Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter appointment name"
                            value={appointmentName}
                            onChange={(e) => setAppointmentName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="request">
                        <Form.Label>Request</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter request"
                            value={request}
                            onChange={(e) => setRequest(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Select Date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="time">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            type="time"
                            placeholder="Select Time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Update
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
