import React from 'react';
import ReactDOM from 'react-dom';
import { BookingInfo } from './BookingInfo';

describe('<BookingInfo />', () => {
  test('Render Test', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BookingInfo userId='u1'userType={3} bkId='bk1' />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
