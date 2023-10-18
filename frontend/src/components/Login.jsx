import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutation';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { error }] = useMutation(LOGIN_MUTATION);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login({ variables: { email, password } });
      const { token, userType } = response.data.login;
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType); // Store userType

      // Use history.push for programmatic navigation
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
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
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
      {error && (
        <>
          <p style={{ color: 'red' }}>Error logging in. Please try again.</p>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </>
      )}
    </Form>
  );
};

export default Login;
