import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ element, allowed }) {
  const navigate = useNavigate();
  const currentUserType = localStorage.getItem('userType');

  if (currentUserType !== allowed) {
    navigate('/login');
    return null; // render nothing, user will be redirected***
  }

  return element; // render the protected component
}

export default ProtectedRoute;
