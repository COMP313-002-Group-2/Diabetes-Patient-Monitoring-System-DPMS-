import React from 'react';
import { Form, Button, ToastContainer } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD_MUTATION } from '../graphql/mutation';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object({
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [resetPasswordMutation] = useMutation(RESET_PASSWORD_MUTATION);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { password } = data;
    try {
      const { data } = await resetPasswordMutation({
        variables: {
          token,
          newPassword: password,
        },
      });
      if (data.resetPassword.token) {
        localStorage.setItem('token', data.resetPassword.token); // store the new token in local storage
        localStorage.setItem('userType', data.resetPassword.user.userType); // store the user type in local storage
        const userType = data.resetPassword.user.userType;
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
            navigate('/login'); 
        }
      } else {
        throw new Error('Failed to reset password. Please try again later.');
      }
    } catch (error) {
      toast.error(error.message, {
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter new password'
            {...register('password')}
          />

          {errors.password?.message && (
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
            placeholder='Confirm new password'
            {...register('confirmPassword')}
          />
          {errors.confirmPassword?.message && (
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

        <Button variant='primary' type='submit'>
          Reset Password
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default ResetPassword;
