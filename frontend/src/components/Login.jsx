import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutation';
import { GET_PATIENT_ID_BY_EMAIL } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setuserId] = useState(null);
  const [login] = useMutation(LOGIN_MUTATION);

  // Get the user ID by email
  const { data: userData, error: userError } = useQuery(
    GET_PATIENT_ID_BY_EMAIL,
    {
      variables: { email: email },
      skip: !email, // Skip this query if email is not available
    }
  );

  // Handle errors
  if (userError) {
    console.error('Error loading user data:', userError);
  }

  useEffect(() => {
    // Once the userData is loaded, extract and set the userId
    if (userData && userData.getPatientId) {
      setuserId(userData.getPatientId._id);
    }
  }, [userData]);

  Cookies.set('userId', userId, { expires: 7 }); // Set userId cookie for 7 days

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login({ variables: { email, password } });
      
      if (response && response.errors) {
        // Handle errors from the response
        const errorMessage = response.errors[0].message;
        throw new Error(errorMessage);
      } else if (response && response.data && response.data.login) {
        const { token, userType, firstName, lastName, email } =
          response.data.login;

        localStorage.setItem('token', token);
        localStorage.setItem('userType', userType); // Store userType
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('email', email);

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
