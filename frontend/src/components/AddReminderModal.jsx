import React, { useState, useEffect } from 'react';
import { GET_REMINDERS } from '../graphql/mutation';
import { ADD_REMINDER } from '../graphql/mutation';
import { useQuery, useMutation } from '@apollo/client';
import { FaPlus } from 'react-icons/fa';

export default function AddReminderModal({ patientId, firstName, lastName, onHide }) {

    const [currentPatientId, setCurrentPatientId] = useState('');
    const [currentPatientFirstName, setCurrentPatientFirstName] = useState(''); // These are not used in this component, but are here for reference
    const [currentPatientLastName, setCurrentPatientLastName] = useState(''); // These are not used in this component, but are here for reference
    const [reminderName, setReminderName] = useState('');
    const [reminderDescription, setReminderDescription] = useState('');
    const [status, setStatus] = useState('');
    const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);


    useEffect(() => {
        if (patientId) {
            setCurrentPatientId(patientId); // Set the patientId when the component receives it
            
        }
        if (firstName) {
            setCurrentPatientFirstName(firstName); // Set the patientId when the component receives it
            
        }
        if (lastName) {
            setCurrentPatientLastName(lastName); // Set the patientId when the component receives it
            
        }

    }, [patientId, firstName, lastName]);

    const [addReminder] = useMutation(ADD_REMINDER, {
        variables: {
            patientId: currentPatientId,
            reminderName: reminderName,    
            reminderDescription: reminderDescription,
            status: status
        },
        refetchQueries: [{ query: GET_REMINDERS }]
    });


    const submitHandler = (e) => {
        e.preventDefault();

        addReminder();
        console.log(patientId, reminderName, reminderDescription, status);

        setReminderName('');
        setReminderDescription('');
        setStatus('');

        setIsSubmittedSuccessfully(true);

        onHide(); // Hide the modal after the mutation is complete

        // Optionally reset the success message after a delay
        setTimeout(() => setIsSubmittedSuccessfully(false), 3000);
    }
    
    const { loading, error, data } = useQuery(GET_REMINDERS);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data);


  return (
    <>
    {isSubmittedSuccessfully && <div className="alert alert-success" role="alert">
    Reminder added successfully!
</div>}

    {!loading && !error && (
        <>
        <button type="button" className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#addReminderModal">
            <div className='d-flex align-items-center'>
                <FaPlus className='icon'/>
                <span className='ms-2'>Add Reminder</span>
            </div>
        </button>

        <div className="modal fade" id="addReminderModal" tabIndex="-1" aria-labelledby="addReminderModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="addReminderModalLabel">Add Reminder</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body">
                    <form onSubmit={submitHandler}>
                        <div className='form-floating mb-3'>
                            <input type='text' readOnly className='form-control' placeholder='Patient ID' id='currentPatientId' onChange={(e) => setCurrentPatientId(e.target.value)} value={currentPatientId}/>
                            <label htmlFor='patientId'>Patient ID</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type='text' readOnly className='form-control' placeholder='Patient First Name' id='currentPatientFirstName' onChange={(e) => setCurrentPatientFirstName(e.target.value)} value={currentPatientFirstName}/>
                            <label htmlFor='patientFirstName'>Patient First Name</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type='text' readOnly className='form-control' placeholder='Patient Last Name' id='currentPatientLastName' onChange={(e) => setCurrentPatientLastName(e.target.value)} value={currentPatientLastName}/>
                            <label htmlFor='patientLastName'>Patient Last Name</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type='text' className='form-control' placeholder='Reminder Name' id='reminderName' onChange={(e) => setReminderName(e.target.value)} value={reminderName}/>
                            <label htmlFor='reminderName'>Reminder Name</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <textarea className='form-control' placeholder='Leave a description here' id='reminderDescription' onChange={(e) => setReminderDescription(e.target.value)} value={reminderDescription}/>
                            <label htmlFor='reminderDescription'>Reminder Description</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select className="form-select" aria-label="Default select example" onChange={(e) => setStatus(e.target.value)} value={status}>
                                <option value="None">Click to select status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="completed">Completed</option>
                            </select>                  
                            </div>
                    </form>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary"data-bs-dismiss="modal" onClick={submitHandler}>Save Reminder</button>
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
