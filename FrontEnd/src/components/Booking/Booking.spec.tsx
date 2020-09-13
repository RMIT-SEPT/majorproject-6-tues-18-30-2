import React from 'react';
import ReactDOM from 'react-dom';
import { Booking } from './Booking';

describe('<Booking />', () => {
  test('Render Test', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Booking userId='u1' userType={3} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
