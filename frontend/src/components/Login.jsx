import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutation';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN_MUTATION);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login({ variables: { email, password } });

      if (response && response.errors) {
        // Handle errors from the response
        const errorMessage = response.errors[0].message;
        throw new Error(errorMessage);
      } else if (response && response.data && response.data.login) {
        const { token, userType, firstName, lastName } = response.data.login;
        console.log('from login: ',firstName, lastName);
        localStorage.setItem('token', token);
        localStorage.setItem('userType', userType); // Store userType
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);

        switch (userType) {
          case 'Patient':
            navigate('/patient');
            break;
          case 'Admin':
            navigate('/admin');
            break;
          case 'Physician':
            navigate('/physician');
            break;
          case 'Staff':
            navigate('/staff');
            break;
          default:
            navigate('/');
            break;
        }
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      let errorMessage = 'Invalid email or password.';

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
    <>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant='primary' onClick={handleLogin}>
          Login
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default Login;
