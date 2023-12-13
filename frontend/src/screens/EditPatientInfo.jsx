import React, { useEffect, useState } from 'react'
import { Button, Form, Col, Card } from 'react-bootstrap';
import { USER_BY_ID_QUERY } from '../graphql/queries'
import { PATIENT_DETAILS_BY_ID_QUERY } from '../graphql/queries';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_PATIENT_INFO } from '../graphql/mutation';
import { useNavigate } from 'react-router-dom';



const EditPatientInfo = () => {
    const Navigate = useNavigate()
    const [patientInfo, setPatientInfo] = useState({ firstName: "", lastName: "", email: "", address1: "", address2: "", city: "", postalcode: "", phoneNumber: "" })
    const userId = localStorage.getItem('userId')

    const { loading2, error2, data2, refetch } = useQuery(USER_BY_ID_QUERY, {
        variables: { id: localStorage.getItem('userId') }
    });

    const { loading, error, data} = useQuery(PATIENT_DETAILS_BY_ID_QUERY, {
        variables: { id: localStorage.getItem('userId') }
    });

    const [addPatient, loading1, error1, data1] = useMutation(ADD_PATIENT_INFO);

    useEffect(() => {
        if (userId) {
            refetch();
        }
        
    }, [userId,refetch])

    if (loading) return <p>Loading...</p>;
    if(loading2) return <p>loading2 ...</p>
    if (error) return <p>Error: {error.message}</p>

    const user = data.getUserById || {}

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addPatient({
            variables: {
                _id: localStorage.getItem('userId'),
                address1: patientInfo.address1,
                address2: patientInfo.address2,
                city: patientInfo.city,
                phoneNumber: patientInfo.phoneNumber,
                postalCode: patientInfo.postalcode
            }
        })

        Navigate("/patient")
    }


    return (
        <div className='d-flex justify-content-center  vh-100'>
            <Col md={6}>
                <div className='fixed-card mt-5 h-100'>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Address 1</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" name='address1' value={patientInfo.address1} onChange={(e) => setPatientInfo({ ...patientInfo, address1: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Address 2</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" name='address2' value={patientInfo.address2} onChange={(e) => setPatientInfo({ ...patientInfo, address2: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">City</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" name='city' value={patientInfo.city} onChange={(e) => setPatientInfo({ ...patientInfo, city: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Postal Code</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" name='postalCode' value={patientInfo.postalcode} onChange={(e) => setPatientInfo({ ...patientInfo, postalcode: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Phone Number</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" name='phoneNumber' value={patientInfo.phoneNumber} onChange={(e) => setPatientInfo({ ...patientInfo, phoneNumber: e.target.value })} />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </Col>
        </div>
    )
}

export default EditPatientInfo