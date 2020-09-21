import React from 'react';
import { Router } from '@reach/router';
import { Route } from '../';
import {
  NotFound,
  Home,
  Registration,
  Dashboard,
  BookingForm
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
      </Router>
    </UserProvider>
  );
};
