import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button, ToastContainer } from 'react-bootstrap';
import { REQUEST_PASSWORD_RESET_MUTATION } from '../graphql/mutation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
});

function ForgotPassword() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [requestPasswordReset] = useMutation(REQUEST_PASSWORD_RESET_MUTATION);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const { data: responseData } = await requestPasswordReset({
        variables: { email: data.email },
      });
      setMessage(responseData.requestPasswordReset);
      navigate('/confirmation', { state: { message: responseData.requestPasswordReset } });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            {...register('email')}
          />
          <p>{errors.email?.message}</p>
        </Form.Group>

        <Button variant='primary' type='submit'>
          Request Password Reset
        </Button>
      </Form>
      {message && (
        <div className='mt-3'>
          <p>{message}</p>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default ForgotPassword;
