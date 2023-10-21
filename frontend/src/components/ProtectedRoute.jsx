import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element, allowed }) {
  const currentUserType = localStorage.getItem('userType');

  if (currentUserType !== allowed) {
    return <Navigate to='/login' replace />;
  }

  return element; // render the protected component
}

export default ProtectedRoute;
