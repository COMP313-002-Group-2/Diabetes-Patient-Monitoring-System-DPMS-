import React , { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAppointmentsByPhysician} from '../graphql/queries';

import EditAppointmentModal from './EditAppointmentModal';
import { DELETE_APPOINTMENT } from '../graphql/mutation';


const AppointmentsList = ({ physicianId }) => {
  
  const { loading, error, data, refetch } = useQuery(getAppointmentsByPhysician, {
    variables: { physicianId: physicianId },
  });

  const [isEditAppointmentModalOpen, setIsEditAppointmentModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);


  const [deleteAppointment] = useMutation(DELETE_APPOINTMENT, {
      onCompleted: () => refetch(), // Refetch Appointment after deletion
  });
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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
    <div className="row">
      {data && data.getAppointmentsByPhysician.map((appointment) => (
        <div className="col-md-4 mb-3" key={appointment._id}> {/* Adjust column size as needed */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{appointment.appointmentName}</h5>
              <p className="card-text">Patient Name: {appointment.patientName}</p>
              <p className="card-text">Detail: {appointment.request}</p>
              <p className="card-text">Date: {appointment.date}</p>
              <p className="card-text">Time: {appointment.time}</p>
              <p> <button  style={{ marginRight: '20px' }}  onClick={() => handleEditAppointment(appointment)}>Edit</button>
              <button onClick={() => handleDeleteAppointment(appointment._id)}>Cancel</button>
             </p>
             
            </div>
          </div>
        </div>
      ))}

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
};


export default AppointmentsList;
