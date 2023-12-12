import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAppointmentsByPhysician } from '../graphql/queries';
import Table from 'react-bootstrap/Table';
import AddAppointmentModal from './AddAppointmentModal';
import EditAppointmentModal from './EditAppointmentModal';
import { DELETE_APPOINTMENT } from '../graphql/mutation';

export default function AppointmentModal({ physicianId, firstName, lastName, onHide }) {
    const meetingId = '2714760892';
    const zoomLink = `zoommtg://zoom.us/join?confno=${meetingId}`; 
    const { loading, error, data, refetch } = useQuery(getAppointmentsByPhysician, {
        variables: { physicianId },
        skip: !physicianId, // Skip the query if physicianId is not available
    });

    const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] = useState(false);
    const [isEditAppointmentModalOpen, setIsEditAppointmentModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);


    const [deleteAppointment] = useMutation(DELETE_APPOINTMENT, {
        onCompleted: () => refetch(), // Refetch Appointment after deletion
    });
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! {error.message}</p>;

    const handleEditAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setIsEditAppointmentModalOpen(true);
    };
    
        const handleDeleteAppointment = (appointmentId) => {
        console.log(`Deleting appointment. Appointment Id:${appointmentId}`)
        deleteAppointment({ variables: { _id: appointmentId } });
        console.log(`Appointment deleted. Appointment Id:${appointmentId}`);
    };
    return (
        <div>
            <h3>Appointment with {firstName} {lastName} </h3>
            <AddAppointmentModal
                    show={isAddAppointmentModalOpen}
                    onHide={() => setIsAddAppointmentModalOpen(false)}
                    physicianId={physicianId}
                    firstName={firstName}
                    lastName={lastName}
                    refetchAppointments={refetch}
                />

                
            {data && data.getAppointmentsByPhysician && (
                <Table striped bordered hover variant="dark" className="text-center">
                    <thead>
                        <tr>
                            <th>Appointment Name</th>
                            <th>Request</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.getAppointmentsByPhysician.map(appointment => (
                            <tr key={appointment._id}>
                                <td>{appointment.appointmentName}</td>
                                <td>{appointment.request}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                
                                <td>
                                <button onClick={() => handleEditAppointment(appointment)}>Edit</button>
                                <button onClick={() => handleDeleteAppointment(appointment._id)}>Cancel</button>
                                <a href={zoomLink}>Join Zoom Meeting</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    
                </Table>
                )}
                {isEditAppointmentModalOpen && selectedAppointment && (
                    <EditAppointmentModal
                        show={isEditAppointmentModalOpen}
                        onHide={() => setIsEditAppointmentModalOpen(false)}
                        appointmentId={selectedAppointment._id}
                        physicianId={selectedAppointment.physicianId}
                        appointmentNameName={selectedAppointment.appointmentName}
                        patientName={selectedAppointment.patientName}
                        request={selectedAppointment.request}
                        date={selectedAppointment.date}
                        time={selectedAppointment.time}
                        refetchAppointments={refetch}
                    />
                )}

        </div>
        
    );
}
