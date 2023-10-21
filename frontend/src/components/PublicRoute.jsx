import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoute({ element }) {
  const token = localStorage.getItem('token');
  const currentUserType = localStorage.getItem('userType');

  if (token && currentUserType) {
    return <Navigate to={`/${currentUserType.toLowerCase()}`} replace />;
  }

  return element; // render the public component
}

export default PublicRoute;
