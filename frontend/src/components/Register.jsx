import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../graphql/mutation'; // Update this import based on your project structure
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
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  userType: yup.string().required('User type is required'),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { firstName, lastName, email, password, userType } = data;

    try {
      const response = await createUser({
        variables: {
          input: {
            firstName,
            lastName,
            email,
            password,
            userType,
          },
        },
      });

      if (response && response.data && response.data.createUser) {
        const { token, userType, message } = response.data.createUser;

        if (userType === 'Patient') {
          localStorage.setItem('token', token);
          localStorage.setItem('userType', userType);
          navigate('/patient');
        } else {
          toast.success(message, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate('/confirmation', { state: { message } });
        }
      } else {
        throw new Error('Invalid Registration Details. Please try again.');
      }
    } catch (error) {
      let errorMessage = 'Failed to register. Please try again.';

      if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
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
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    {...register('password')}
                  />
                  {errors.password && (
                    <div
                      style={{
                        backgroundColor: '#f8d7da',
                        padding: '10px',
                        borderRadius: '5px',
                        marginTop: '5px',
                        fontWeight: 'bold',
                      }}
                    >
                      {errors.password?.message}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                    <div
                      style={{
                        backgroundColor: '#f8d7da',
                        padding: '10px',
                        borderRadius: '5px',
                        marginTop: '5px',
                        fontWeight: 'bold',
                      }}
                    >
                      {errors.confirmPassword?.message}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>I am a</Form.Label>
                  <Form.Control as='select' {...register('userType')}>
                    <option value='Patient'>Patient</option>
                    <option value='Admin'>Admin</option>
                    <option value='Physician'>Physician</option>
                    <option value='Staff'>Staff</option>
                  </Form.Control>
                  <p>{errors.userType?.message}</p>
                </Form.Group>

                <Button variant='primary' type='submit'>
                  Register
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

export default Register;
