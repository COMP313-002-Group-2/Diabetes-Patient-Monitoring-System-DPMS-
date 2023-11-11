import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_REMINDER } from '../graphql/mutation';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { GET_REMINDERS } from '../graphql/mutation'; 

export default function EditReminderModal({ reminderId, patientId, reminderName: initReminderName, reminderDescription: initReminderDescription, status: initStatus, onHide }) {
    const [reminderName, setReminderName] = useState(initReminderName);
    const [reminderDescription, setReminderDescription] = useState(initReminderDescription);
    const [status, setStatus] = useState(initStatus);

    const [updateReminder, { loading: updating, error: updateError }] = useMutation(UPDATE_REMINDER, {
        onCompleted: () => {
            onHide();
            // Optionally, handle any additional tasks upon successful update
        },
        refetchQueries: [{ query: GET_REMINDERS }],
        // Error handling could be implemented here as well
    });

    const submitHandler = (e) => {
        e.preventDefault();
        updateReminder({
            variables: {
                _id: reminderId,
                patientId: patientId,
                reminderName: reminderName,
                reminderDescription: reminderDescription,
                status: status
            }
        });
    };

    if (updating) return 'Loading...';
    if (updateError) return `Error: ${updateError.message}`;
    return (        
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Reminder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="reminderName">
                        <Form.Label>Reminder Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter reminder name"
                            value={reminderName}
                            onChange={(e) => setReminderName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="reminderDescription">
                        <Form.Label>Reminder Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter reminder description"
                            value={reminderDescription}
                            onChange={(e) => setReminderDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
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
