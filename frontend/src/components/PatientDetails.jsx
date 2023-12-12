import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { USER_BY_ID_QUERY } from '../graphql/queries'

const PatientDetails = () => {
    const userId = localStorage.getItem('userId')

    const { loading, error, data, refetch } = useQuery(USER_BY_ID_QUERY, {
        variables: { id: localStorage.getItem('userId') }
    });

    useEffect(() => {
        if (userId) {
            refetch();
        }
    }, [userId, refetch])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>

    const user = data.getUserById || {}

    return (
        <div>
            <Card className='fixed-card'>
                <Card.Body>
                    <Card.Title className='text-center'>Patient Info</Card.Title>
                    <h3 className="card-subtitle mb-2 mb-3">Patient First Name: {user.firstName}</h3>
                    <h3 className="card-subtitle mb-2 mb-3">Patient Last Name: {user.lastName}</h3>
                    <h3 className="card-subtitle mb-2  mb-3">Patient Email: {user.email}</h3>
                </Card.Body>
                <Button variant='primary m-4' href="/patient/editinfo">
                    Add/Edit Patient Information
                </Button>
            </Card></div>
    )
}

export default PatientDetails