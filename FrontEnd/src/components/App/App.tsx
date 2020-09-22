import React from 'react';
import { Router } from '@reach/router';
import { Route } from '../';
import {
  NotFound,
  Home,
  Registration,
  Dashboard,
  BookingForm,
  Profile
} from '../../pages';
import { UserProvider } from '../../contexts';
import './App.style.css';

/**
 * App Properties
 */
export interface ComponentProps {}

/**
 * App Component
 */
export const App: React.FC<ComponentProps> = () => {
  return (
    <UserProvider>
      <Router>
        <Route page={<NotFound />} default />
        <Route page={<Home />} path='/' />
        <Route page={<Registration />} path='/register' />
        <Route page={<Dashboard />} path='/dashboard' />
        <Route page={<BookingForm />} path='/booking-form' />
        <Route page={<Profile />} path='/profile' />
      </Router>
    </UserProvider>
  );
};
