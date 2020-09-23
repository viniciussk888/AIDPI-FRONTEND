import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import UserView from 'src/views/user/UserView';
import PatientListView from 'src/views/patient/PatientListView';
import NewPatient from 'src/views/patient/NewPatient';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import VaccinationView from 'src/views/vaccination/VaccinationView';
import SettingsView from 'src/views/settings/SettingsView';
import AidpiListView from 'src/views/aidpi/AidpiListView';
import NewAidpi from 'src/views/aidpi/NewAidpi';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'user', element: <UserView /> },
      { path: 'patients', element: <PatientListView /> },
      { path: 'newpatient', element: <NewPatient /> },
      { path: 'aidpi', element: <AidpiListView /> },
      { path: 'newaidpi', element: <NewAidpi /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'vaccination', element: <VaccinationView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
