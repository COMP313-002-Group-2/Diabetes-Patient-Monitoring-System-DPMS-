import React from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/diabetes_tracker.jpg';

const CustomNavbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token'); // Check if token exists in localStorage
  const isUserType = localStorage.getItem('userType'); // Check if userType exists in localStorage
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    localStorage.removeItem('userType'); // Remove the userType if you wish
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    navigate('/'); // Redirect to home or login page
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
          <Nav.Link href='/' className='btn btn-outline-light btn-sm mr-2'>
            Home
          </Nav.Link>
          <Nav.Link
            href='/resources'
            className='btn btn-outline-light btn-sm mr-2'
          >
            Resources
          </Nav.Link>
          <Nav.Link
            href='/about-diabetes'
            className='btn btn-outline-light btn-sm mr-2'
          >
            About diabetes
          </Nav.Link>
          <Nav.Link
            href='/about-us'
            className='btn btn-outline-light btn-sm mr-2'
          >
            About Us
          </Nav.Link>
          <Nav.Link
            href='/contactus'
            className='btn btn-outline-light btn-sm mr-2'
          >
            Contact Us
          </Nav.Link>
        </Nav>

        <Nav>
          {isLoggedIn ? (
            <>
              <NavDropdown
                title={<FontAwesomeIcon icon={faUser} size='2x' />}
                id='navbarScrollingDropdown'
                className='me-3'
                align='end'
              >
                <NavDropdown.ItemText>{`${firstName} ${lastName}`}</NavDropdown.ItemText>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate('/profile')}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/credentials')}>
                  Credentials
                </NavDropdown.Item>
              </NavDropdown>
              {['Patient', 'Physician', 'Admin', 'Staff'].includes(
                isUserType
              ) && (
                <Button
                  variant='outline-light'
                  size='sm'
                  className='me-3'
                  onClick={() => navigate(`/${isUserType.toLowerCase()}`)}
                >
                  {`${isUserType} Page`}
                </Button>
              )}
              <Button
                variant='outline-light'
                size='sm'
                className='me-3'
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant='outline-light'
                size='sm'
                className='me-2'
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                variant='outline-light'
                size='sm'
                onClick={() => navigate('/register')}
              >
                Signup
              </Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
