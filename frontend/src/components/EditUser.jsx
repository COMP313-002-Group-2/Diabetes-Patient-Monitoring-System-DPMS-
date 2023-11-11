import React, { useState, useEffect } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import { USER_BY_ID_QUERY } from '../graphql/queries';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_MUTATION } from '../graphql/mutation';



const EditUser = () => {
  const { _id } = useParams(); 
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [updateUser] = useMutation(UPDATE_USER_MUTATION);



  const fetchUserByID = async () => {
    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: USER_BY_ID_QUERY,
          variables: {
            id: _id,
          },
        }),
      });

      const responseBody = await response.json();

      if (responseBody.errors) {
        // Handle errors
        console.error('GraphQL Errors:', responseBody.errors);
        setError('An error occurred while fetching user data.');
      } else {
        setUser(responseBody.data.getUserById);
        setFirstName(responseBody.data.getUserById.firstName);
        setLastName(responseBody.data.getUserById.lastName);
        setEmail(responseBody.data.getUserById.email);
      }
    }catch (error) {
      console.error('Network error:', error);
      setError('An error occurred while fetching user data.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const { data } = await updateUser({
        variables: {
          id: user._id,
          input: {
            firstName: firstName, // Get the updated first name from state
            lastName: lastName, // Get the updated last name from state
            email: email, // Get the updated email from state
            userType:user.userType,
            // Add other fields to update
          },
        },
      });

      if (data.updateUser) {
        // Handle successful update, e.g., show a success message
        console.log('User updated successfully:', data.updateUser);
        navigate(-1)
      } else {
        // Handle the case where the update failed
        console.error('Failed to update user');
      }
    } catch (error) {
      // Handle errors
      console.error('Error updating user:', error);
    }
  };

  useEffect(() => {


    fetchUserByID();
  }, [_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <h2>Edit User - {user.firstName} {user.lastName}</h2>
      {user && (
        <form>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Add other form fields for editing user data */}
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={handleUpdateUser}
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default EditUser;
