import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import PatientScreen from './screens/PatientScreen';
import AdminScreen from './screens/AdminScreen';
import PhysicianScreen from './screens/PhysicianScreen';
import StaffScreen from './screens/StaffScreen';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const port = process.env.REACT_APP_PORT || 5000;

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        courses: {
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: `http://localhost:${port}/graphql`,
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      // Enable logging for watchQuery
      log: true,
    },
    query: {
      errorPolicy: 'all',
      // Enable logging for query
      log: true,
    },
    mutate: {
      errorPolicy: 'all',
      // Enable logging for mutate
      log: true,
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='app-wrapper'>
          <Navbar />
          <main className='py-3'>
            <Container>
              <Routes>
                <Route path='/' element={<HomeScreen />} />
                <Route path='/login' element={<LoginScreen />} />
                <Route
                  path='/patient'
                  element={
                    <ProtectedRoute
                      element={<PatientScreen />}
                      allowed='Patient'
                    />
                  }
                />
                <Route path='/admin' element={<ProtectedRoute element={<AdminScreen />} allowed='Admin' />} />
                <Route path='/physician' element={<ProtectedRoute element={<PhysicianScreen />} allowed='Physician' />} />
                <Route path='/staff' element={<ProtectedRoute element={<StaffScreen />} allowed='Staff' />} />
                {/*... other routes ... */}

                <Route path='*' element={<NotFound />} />
              </Routes>
            </Container>
          </main>
          <Footer />
          {/* <ToastContainer /> */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
