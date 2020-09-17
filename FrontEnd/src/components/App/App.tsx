import React from 'react';
import { Router } from '@reach/router';
import { Route } from '../';
import {
  NotFound,
  Home,
  Dashboard,
  BookingForm
} from '../../pages';
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
    <Router>
      <Route page={<NotFound />} default />
      <Route page={<Home />} path='/' />
      <Route page={<Dashboard />} path='/dashboard' />
      <Route page={<BookingForm />} path='/booking-form'/>
    </Router>
  );
};
