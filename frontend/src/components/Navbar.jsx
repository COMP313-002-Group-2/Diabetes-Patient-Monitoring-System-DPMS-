import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/diabetes_tracker.jpg';

const CustomNavbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token'); // Check if token exists in localStorage

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the token
    localStorage.removeItem('userType');  // Remove the userType if you wish
    navigate('/');  // Redirect to home or login page
  };

  return (
    <Navbar expand='lg' variant='dark' sticky='top'>
      <Navbar.Brand href='/'>
        <img src={logo} alt='Diabetes Tracker Logo' className='logo-img' />
        DPMS
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse
        id='basic-navbar-nav'
        className='justify-content-between'
      >
        <Nav>
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/'>Library</Nav.Link>
          <Nav.Link href='/'>Services</Nav.Link>
          <Nav.Link href='/'>About</Nav.Link>
          <Nav.Link href='/'>Contact</Nav.Link>
        </Nav>

        <Nav>
          {!isLoggedIn ? (
            <>
              <Nav.Link href='/login'>
                <Button variant='outline-light' size='sm' className='mr-2'>
                  Login
                </Button>
              </Nav.Link>
              <Nav.Link href='/register'>
                <Button variant='outline-light' size='sm'>
                  Signup
                </Button>
              </Nav.Link>
            </>
          ) : (
            <Button
              variant='outline-light'
              size='sm'
              className='mr-2'
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
