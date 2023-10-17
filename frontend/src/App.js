import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Navbar />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      {/* <ToastContainer /> */}
    </>
  );
};

export default App;
