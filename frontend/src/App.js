import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import PatientScreen from './screens/PatientScreen';
import AdminScreen from './screens/AdminScreen';
import PhysicianScreen from './screens/PhysicianScreen';
import RegisterScreen from './screens/RegisterScreen';
import StaffScreen from './screens/StaffScreen';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import ConfirmScreen from './screens/ConfirmScreen';
import PublicRoute from './components/PublicRoute';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import AmbulanceList from './screens/AmbulanceList';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from '@apollo/client';
import { onError } from 'apollo-link-error';
import AddReminderModal from './components/AddReminderModal';
import EditReminderModal from './components/EditReminderModal';

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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: from([
    errorLink,
    new HttpLink({ uri: `http://localhost:${port}/graphql` }),
  ]),
  cache, // Use the cache variable here
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
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
                <Route
                  path='/login'
                  element={<PublicRoute element={<LoginScreen />} />}
                />
                <Route
                  path='/reset-password/:token'
                  element={<PublicRoute element={<ResetPasswordScreen />} />}
                />
                <Route path='/register' element={<RegisterScreen />} />
                <Route path='/confirmation' element={<ConfirmScreen />} />
                <Route path='/acctrecovery' element={<ForgotPasswordScreen />} />
                <Route
                  path='/patient'
                  element={
                    <ProtectedRoute
                      element={<PatientScreen />}
                      allowed='Patient'
                    />
                  }
                />
                <Route
                  path='/admin'
                  element={
                    <ProtectedRoute element={<AdminScreen />} allowed='Admin' />
                  }
                />
                <Route
                  path='/physician'
                  element={
                    <ProtectedRoute
                      element={<PhysicianScreen />}
                      allowed='Physician'
                    />
                  }
                />
                <Route
                  path='/staff'
                  element={
                    <ProtectedRoute element={<StaffScreen />} allowed='Staff' />
                  }
                />

                <Route
                  path="/addreminder/:id" element={<AddReminderModal /> } 
                />

                <Route
                  path='/editreminder/:id' element={<EditReminderModal /> }
                />
                {/*... other routes ... */}
                <Route path="/ambulancelist" 
                element ={<AmbulanceList/>}/>
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
