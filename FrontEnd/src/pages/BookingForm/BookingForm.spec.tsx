import React from 'react';
import ReactDOM from 'react-dom';
import { BookingForm } from './BookingForm';

describe('<BookingForm />', () => {
  test('Render Test', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BookingForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
