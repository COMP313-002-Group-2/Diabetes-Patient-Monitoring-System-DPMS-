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
import UserList from '../src/components/UserList';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import ConfirmScreen from './screens/ConfirmScreen';
import PublicRoute from './components/PublicRoute';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import LabDataLandingScreen from './screens/LabDataLandingScreen';
import BloodChemScreen from './screens/BloodChemScreen';
import AddBloodChem from './components/AddBloodChem';
import EditBloodChem from './components/EditBloodChem';
import AppointmentScreen from './screens/AppointmentScreen';
import AppointmentListScreen from './screens/AppointmentListScreen';

import AddHemaLab from './components/AddHemaLab';
import HematologyScreen from './screens/HematologyScreen';
import EditHemaLab from './components/EditHemaLab';
import AddHbA1c from './components/AddHbA1c';
import EditHbA1c from './components/EditHbA1c';
import EditUser from './components/EditUser';
import AddUser from './components/AddUser';
import AddReminderModal from './components/AddReminderModal';
import EditReminderModal from './components/EditReminderModal';
import HbA1cScreen from './screens/HbA1cScreen';
import UrinalysisScreen from './screens/UrinalysisScreen';
import AddUrinalysis from './components/AddUrinalysis';
import EditUrinalysis from './components/EditUrinalysis';
import ArticleScreen from './screens/ArticlesScreen';
import AboutArticles from './screens/AboutArticlesScreen';
import Resources from './screens/ResourcesScreen';
import AboutUs from './screens/AboutUsScreen';
import ContactUs from './screens/ContactUs';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from '@apollo/client';
import { onError } from 'apollo-link-error';
import AlertsRemindersScreen from './screens/AlertsRemindersScreen';
import AddAmbulance from './screens/AddAmbulance';
import EditPatientInfo from './screens/EditPatientInfo';
//import PatientDetails from './components/PatientDetails';

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
                <Route path='/articles/:id' element={<ArticleScreen />} />
                <Route path='/about-diabetes' element={<AboutArticles />} />
                <Route path='/resources' element={<Resources />} />
                <Route path='/about-us' element={<AboutUs />} />
                <Route path='/contactus' element={<ContactUs />} />
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
                <Route
                  path='/acctrecovery'
                  element={<ForgotPasswordScreen />}
                />
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
                  path='/patient/editinfo'
                  element={
                    <ProtectedRoute
                      element={<EditPatientInfo />}
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
                  path='/admin/add'
                  element={
                    <ProtectedRoute element={<AddUser />} allowed='Admin' />
                  }
                />
                <Route
                  path='/admin/users'
                  element={
                    <ProtectedRoute element={<UserList />} allowed='Admin' />
                  }
                />

                <Route
                  path='/admin/users/:_id'
                  element={
                    <ProtectedRoute element={<EditUser />} allowed='Admin' />
                  }
                />

                <Route path='/addreminder/:id' element={<AddReminderModal />} />

                <Route
                  path='/editreminder/:id'
                  element={<EditReminderModal />}
                />

                <Route
                  path='/booking'
                  element={
                    <ProtectedRoute
                      element={<AppointmentScreen />}
                      allowed='Patient'
                    />
                  }
                />

                <Route
                  path='/appointment'
                  element={
                    <ProtectedRoute
                      element={<AppointmentListScreen />}
                      allowed='Physician'
                    />
                  }
                />

                <Route
                  path='/patient/lablandingpage'
                  element={
                    <ProtectedRoute
                      element={<LabDataLandingScreen />}
                      allowed='Patient'
                    />
                  }
                />
                <Route
                  path='/bloodchemistry'
                  element={
                    <ProtectedRoute
                      element={<BloodChemScreen />}
                      allowed='Patient'
                    />
                  }
                />
                <Route
                  path='/urinalysis'
                  element={
                    <ProtectedRoute
                      element={<UrinalysisScreen />}
                      allowed='Patient'
                    />
                  }
                />
                <Route
                  path='/hba1c'
                  element={
                    <ProtectedRoute
                      element={<HbA1cScreen />}
                      allowed='Patient'
                    />
                  }
                />
                <Route
                  path='/hematology'
                  element={
                    <ProtectedRoute
                      element={<HematologyScreen />}
                      allowed='Patient'
                    />
                  }
                />
                <Route
                  path='/addbloodchem'
                  element={
                    <ProtectedRoute
                      element={<AddBloodChem />}
                      allowed='Patient'
                    />
                  }
                />
                <Route
                  path='/editbloodchem/:id'
                  element={
                    <ProtectedRoute
                      element={<EditBloodChem />}
                      allowed='Patient'
                    />
                  }
                />
                <Route
                  path='/addhematology'
                  element={
                    <ProtectedRoute
                      element={<AddHemaLab />}
                      allowed='Patient'
                    />
                  }
                />
                <Route
                  path='/edithematology/:id'
                  element={
                    <ProtectedRoute
                      element={<EditHemaLab />}
                      allowed='Patient'
                    />
                  }
                />
                <Route
                  path='/addhba1c'
                  element={
                    <ProtectedRoute element={<AddHbA1c />} allowed='Patient' />
                  }
                />
                <Route
                  path='/edithba1c/:id'
                  element={
                    <ProtectedRoute element={<EditHbA1c />} allowed='Patient' />
                  }
                />
                <Route
                  path='/addurinalysis'
                  element={
                    <ProtectedRoute
                      element={<AddUrinalysis />}
                      allowed='Patient'
                    />
                  }
                />
                <Route
                  path='/editurinalysis/:id'
                  element={
                    <ProtectedRoute
                      element={<EditUrinalysis />}
                      allowed='Patient'
                    />
                  }
                />
                {/*... other routes ... */}

                <Route
                  path='/alertsreminders'
                  element={
                    <ProtectedRoute
                      element={<AlertsRemindersScreen />}
                      allowed='Patient'
                    />
                  }
                />
              {/* <Route
                  path='/patientdetails'
                  element={
                    <ProtectedRoute
                      element={<PatientDetails />}
                      allowed='Patient'
                    />
                  }
                />*/}

                {/*... other routes ... */}
                <Route path='addambulance' element={<AddAmbulance />} />
                {/*<Route path='patientdetails' element={<PatientDetails />} />*/}
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
