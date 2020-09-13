import React from 'react';
import ReactDOM from 'react-dom';
import { Dashboard } from './Dashboard';

describe('<Dashboard />', () => {
  test('Render Test', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Dashboard userId='u1' userType={3} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
