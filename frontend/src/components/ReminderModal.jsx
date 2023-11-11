import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getRemindersByPatient } from '../graphql/queries';
import Table from 'react-bootstrap/Table';
import AddReminderModal from './AddReminderModal';
import EditReminderModal from './EditReminderModal';
import { DELETE_REMINDER } from '../graphql/mutation';

export default function ReminderModal({ patientId, firstName, lastName, onHide }) {
    const { loading, error, data, refetch } = useQuery(getRemindersByPatient, {
        variables: { patientId },
        skip: !patientId, // Skip the query if patientId is not available
    });

    const [isAddReminderModalOpen, setIsAddReminderModalOpen] = useState(false);
    const [isEditReminderModalOpen, setIsEditReminderModalOpen] = useState(false);
    const [selectedReminder, setSelectedReminder] = useState(null);


    const [deleteReminder] = useMutation(DELETE_REMINDER, {
        onCompleted: () => refetch(), // Refetch reminders after deletion
    });
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! {error.message}</p>;

    const handleEditReminder = (reminder) => {
        setSelectedReminder(reminder);
        setIsEditReminderModalOpen(true);
    };
    
        const handleDeleteReminder = (reminderId) => {
        console.log(`Deleting reminder. Reminder Id:${reminderId}`)
        deleteReminder({ variables: { _id: reminderId } });
        console.log(`Reminder deleted. Reminder Id:${reminderId}`);
    };
    return (
        <div>
            <h3>Reminders for {firstName} {lastName} </h3>
            <AddReminderModal
                    show={isAddReminderModalOpen}
                    onHide={() => setIsAddReminderModalOpen(false)}
                    patientId={patientId}
                    firstName={firstName}
                    lastName={lastName}
                    refetchReminders={refetch}
                />
            {data && data.getRemindersByPatient && (
                <Table striped bordered hover variant="dark" className="text-center">
                    <thead>
                        <tr>
                            <th>Reminder Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.getRemindersByPatient.map(reminder => (
                            <tr key={reminder._id}>
                                <td>{reminder.reminderName}</td>
                                <td>{reminder.reminderDescription}</td>
                                <td>{reminder.status}</td>
                                <td>
                                <button onClick={() => handleEditReminder(reminder)}>Edit</button>
                                <button onClick={() => handleDeleteReminder(reminder._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    
                </Table>
                )}
                {isEditReminderModalOpen && selectedReminder && (
                    <EditReminderModal
                        show={isEditReminderModalOpen}
                        onHide={() => setIsEditReminderModalOpen(false)}
                        reminderId={selectedReminder._id}
                        patientId={selectedReminder.patientId}
                        reminderName={selectedReminder.reminderName}
                        reminderDescription={selectedReminder.reminderDescription}
                        status={selectedReminder.status}
                        refetchReminders={refetch}
                    />
                )}

        </div>
        
    );
}
