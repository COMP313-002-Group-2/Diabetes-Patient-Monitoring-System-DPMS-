import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import logo from '../assets/diabetes_tracker.jpg';

const CustomNavbar = () => {
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
          <Nav.Link href='login.html'>
            <Button variant='outline-light' size='sm' className='mr-2'>
              Login
            </Button>
          </Nav.Link>
          <Nav.Link href='signup.html'>
            <Button variant='outline-light' size='sm'>
              Signup
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
