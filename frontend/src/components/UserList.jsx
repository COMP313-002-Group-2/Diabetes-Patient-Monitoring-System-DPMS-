import React, { useState, useEffect } from 'react';
import { USER_QUERY } from '../graphql/queries';
import { DELETE_USER_MUTATION } from '../graphql/mutation';
import { useMutation } from '@apollo/client';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: USER_QUERY,
                }),
            });

            const responseBody = await response.json();

            if (responseBody.errors) {
                console.error('GraphQL Errors:', responseBody.errors);
                setError('An error occurred while fetching users.');
            } else {
                setUsers(responseBody.data.getUsers);
            }
        } catch (error) {
            console.error('Network error:', error);
            setError('An error occurred while fetching users.');
        } finally {
            setLoading(false);
        }
    };

    const [deleteUser] = useMutation(DELETE_USER_MUTATION);

    const handleDeleteUser = async (userId) => {
        try {
            const response = await deleteUser({
                variables: { id: userId }, // Pass the 'userId' as the 'id' variable
            });

            if (response.data.deleteUser) {
                // Deletion was successful
                let newUserList = users.filter(user => user._id !== userId);
                setUsers(newUserList);

                console.log('User deleted successfully');
            } else {
                // Deletion failed
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <><h2>User List</h2>
                <a href='/admin/add'><button className='btn btn-primary mb-2'>Add a User</button></a></>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>User Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.userType}</td>
                                <td> <a href={`/admin/users/${user._id}`}>
                                    <button className="btn btn-primary mr-2">Edit</button>
                                </a>
                                    <button onClick={() => {
                                        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
                                        if (confirmDelete) {
                                            handleDeleteUser(user._id);
                                        } else {

                                        }
                                    }} className="btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserList;
