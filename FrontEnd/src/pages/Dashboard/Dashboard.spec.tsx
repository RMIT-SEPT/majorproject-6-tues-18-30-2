import React from 'react';
import ReactDOM from 'react-dom';
import {Dashboard} from "../Dashboard"

describe('<Booking />', () => {
  test('Render Test', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Dashboard />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
