import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_USER_BY_ADMIN } from '../graphql/mutation'; // Update this import based on your project structure
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  userType: yup.string().required('User type is required'),
});

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const UserTypeEnum = {
  //   Admin: 'Admin',
  //   Patient: 'Patient',
  //   Physician: 'Physician',
  //   Staff: 'Staff',
  // };

  const [createUser] = useMutation(CREATE_USER_BY_ADMIN);
const navigate = useNavigate();

const onSubmit = async (data) => {
  const { firstName, lastName, email, userType } = data;

  try {
    const response = await createUser({
      variables: {
        input: {
          firstName,
          lastName,
          email,
          password:'test',
          userType,
        },
      },
    });

    if (response && response.data && response.data.addUserByAdmin) {
      // Check if the response contains a valid user or message
      const { user, message } = response.data.addUserByAdmin;

      if (user) {
        // User created, handle accordingly
        // For example, navigate to a new page or perform additional actions
        navigate('/admin/users');
      } else if (message) {
        // Handle the message accordingly
        toast.success(message);
      } else {
        throw new Error('Failed to create the user. Please try again.');
      }
    } else {
      throw new Error('Failed to create the user. Please try again.');
    }
  } catch (error) {
    // Handle the error using toast or any preferred method
    toast.error(error.message || 'Failed to create the user. Please try again.', {
      // Toast settings
    });
  }
};

  return (
    <section className='container my-9'>
      <Row className='justify-content-center'>
        <Col md={6}>
          <Card className='fixed-card stretch-card'>
            <Card.Body>
              <Card.Title className='text-center'>Register</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className='mb-3'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter First Name'
                    {...register('firstName')}
                  />
                  {errors.firstName && (
                    <div
                      style={{
                        backgroundColor: '#f8d7da',
                        padding: '10px',
                        borderRadius: '5px',
                        marginTop: '5px',
                        fontWeight: 'bold',
                      }}
                    >
                      {errors.firstName.message}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Last Name'
                    {...register('lastName')}
                  />
                  {errors.lastName && (
                    <div
                      style={{
                        backgroundColor: '#f8d7da',
                        padding: '10px',
                        borderRadius: '5px',
                        marginTop: '5px',
                        fontWeight: 'bold',
                      }}
                    >
                      {errors.lastName?.message}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Valid Email'
                    {...register('email')}
                  />
                  {errors.email && (
                    <div
                      style={{
                        backgroundColor: '#f8d7da',
                        padding: '10px',
                        borderRadius: '5px',
                        marginTop: '5px',
                        fontWeight: 'bold',
                      }}
                    >
                      {errors.email?.message}
                    </div>
                  )}
                </Form.Group>


                <Form.Group className='mb-3'>
                  <Form.Label>User Type</Form.Label>
                  <Form.Control as='select' {...register('userType')}>
                    <option value='Patient'>Patient</option>
                    <option value='Admin'>Admin</option>
                    <option value='Physician'>Physician</option>
                    <option value='Staff'>Staff</option>
                  </Form.Control>
                  <p>{errors.userType?.message}</p>
                </Form.Group>

                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Form>
              <ToastContainer />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default AddUser;
