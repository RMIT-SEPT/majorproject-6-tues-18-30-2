import React from 'react';
import { Router } from '@reach/router';
import { Route } from '../';
import { Home, Dashboard, BookingForm} from '../../pages';
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
      <Route page={<Home />} path='/' />
      <Route page={<Dashboard />} path='/dashboard' />
      <Route page={<BookingForm />} path='/booking-form'/>
    </Router>
  );
};
