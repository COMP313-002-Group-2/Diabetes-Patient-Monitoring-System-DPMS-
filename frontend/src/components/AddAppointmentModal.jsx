import React, { useState, useEffect } from 'react';
import { GET_APPOINTMENTS } from '../graphql/mutation';
import { ADD_APPOINTMENT } from '../graphql/mutation';
import { useQuery, useMutation } from '@apollo/client';
import { FaPlus } from 'react-icons/fa';


export default function AddAppointmentModal({ physicianId, firstName, lastName, onHide }) {

    const [currentPhysicianId, setCurrentPhysicianId] = useState('');
    const [currentPhysicianFirstName, setCurrentPhysicianFirstName] = useState(''); // These are not used in this component, but are here for reference
    const [currentPhysicianLastName, setCurrentPhysicianLastName] = useState(''); // These are not used in this component, but are here for reference
    const [appointmentName, setAppointmentName] = useState('');
    const [patientName, setPatientName] = useState('');
    const [request, setRequest] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);


    useEffect(() => {
        if (physicianId) {
            setCurrentPhysicianId(physicianId); // Set the physicianId when the component receives it
            
        }
        if (firstName) {
            setCurrentPhysicianFirstName(firstName); // Set the physicianId when the component receives it
            
            
        }
        if (lastName) {
            setCurrentPhysicianLastName(lastName); // Set the physicianId when the component receives it
            
        }

    }, [physicianId, firstName, lastName]);

    const [addAppointment] = useMutation(ADD_APPOINTMENT, {
        variables: {
            physicianId: currentPhysicianId,
            appointmentName: appointmentName,    
            request: request,
            patientName: patientName,
            date: date,
            time: time,
            meetingId:'271 476 0892'
        },
        refetchQueries: [{ query: GET_APPOINTMENTS }]
    });


    const submitHandler = (e) => {
        e.preventDefault();
        
        
        addAppointment();
        console.log(physicianId, appointmentName, patientName, request, date, time, '271 476 0892');

        setAppointmentName('');
        //setPatientName('');
        setRequest('');
        setDate('');
        setTime('');

        setIsSubmittedSuccessfully(true);

        onHide(); // Hide the modal after the mutation is complete

        // Optionally reset the success message after a delay
        setTimeout(() => setIsSubmittedSuccessfully(false), 3000);
    }
    
    const { loading, error, data } = useQuery(GET_APPOINTMENTS);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data);


  return (
    <>
    {isSubmittedSuccessfully && <div className="alert alert-success" role="alert">
    Appointment added successfully!
</div>}

    {!loading && !error && (
        <>
        <button type="button" className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#addAppointmentModal">
            <div className='d-flex align-items-center'>
                <FaPlus className='icon'/>
                <span className='ms-2'>Make An Appointment</span>
            </div>
        </button>

        <div className="modal fade" id="addAppointmentModal" tabIndex="-1" aria-labelledby="addAppointmentModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="addAppointmentModalLabel">Book an appointment</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body">
                    <form onSubmit={submitHandler}>
                        <div className='form-floating mb-3'>
                            <input type='text' readOnly className='form-control' placeholder='Physician ID' id='currentPhysicianId' onChange={(e) => setCurrentPhysicianId(e.target.value)} value={currentPhysicianId}/>
                            <label htmlFor='physicianId'>Physician ID</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type='text' readOnly className='form-control' placeholder='Physician First Name' id='currentPhysicianFirstName' onChange={(e) => setCurrentPhysicianFirstName(e.target.value)} value={currentPhysicianFirstName}/>
                            <label htmlFor='physicianFirstName'>Physician First Name</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type='text' readOnly className='form-control' placeholder='Physician Last Name' id='currentPhysicianLastName' onChange={(e) => setCurrentPhysicianLastName(e.target.value)} value={currentPhysicianLastName}/>
                            <label htmlFor='physicianLastName'>Physician Last Name</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type='text' className='form-control' placeholder='Patient Name' id='patientName' onChange={(e) => setPatientName(e.target.value)} value={patientName}/>
                            <label htmlFor='patientName'>Patient Name</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type='text' className='form-control' placeholder='Appointment Name' id='appointmentName' onChange={(e) => setAppointmentName(e.target.value)} value={appointmentName}/>
                            <label htmlFor='appointmentName'>Appointment Name</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <textarea className='form-control' placeholder='Leave a request here' id='request' onChange={(e) => setRequest(e.target.value)} value={request}/>
                            <label htmlFor='request'>Request</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type='date' className='form-control' placeholder='Select Date' id='date' onChange={(e) => setDate(e.target.value)} value={date}/>
                            <label htmlFor='date'>Date</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type='time' className='form-control' placeholder='Select Time' id='time' onChange={(e) => setTime(e.target.value)} value={time}/>
                            <label htmlFor='time'>Time</label>
                        </div>
                        
                    </form>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary"data-bs-dismiss="modal" onClick={submitHandler}>Book</button>
                </div>
                </div>
            </div>
        </div>

        </>
    )

    }
    </>
  )
}
