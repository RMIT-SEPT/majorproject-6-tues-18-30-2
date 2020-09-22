import React from 'react';
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router';
import { render } from '@testing-library/react';
import { App } from './';

describe('<App />', () => {
  test('Homepage Rendered', () => {
    const { container } = renderWithRouter(<App />, {
      route: "/"
    });
    expect(container.innerHTML).toContain('<h1>This is the homepage.</h1>');
  });

  test('Dashboard Rendered', () => {
    const { container } = renderWithRouter(<App />, {
      route: "/dashboard"
    });
    expect(container.innerHTML).toContain('<h1>This is the dashboard.</h1>');
  });

  test('Profile Rendered', () => {
    const { container } = renderWithRouter(<App />, {
      route: "/profile"
    });
    expect(container.innerHTML).toContain('<h1>This is the profile.</h1>');
  });

  test('Invalid Page', () => {
    const { container } = renderWithRouter(<App />, {
      route: "/an-invalid-page"
    });
    expect(container.innerHTML).toContain('<h1>404 - Page does not exist.</h1>');
  });
});

/**
 * Helper Function
 */
const renderWithRouter = (ui, {
    route = '/',
    history = createHistory(createMemorySource(route))
  } = {}
) => {
  return {
    ...render(
      <LocationProvider history={history}>
        {ui}
      </LocationProvider>
    ),
    history
  }
}