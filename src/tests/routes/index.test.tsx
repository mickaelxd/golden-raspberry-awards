
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RoutesComponent from '../../routes';

test('renders RoutesComponent and navigates to Dashboard', () => {
  render(
    <BrowserRouter>
      <RoutesComponent />
    </BrowserRouter>
  );
  expect(screen.getByText(/List Years with Multiple Winners/i)).toBeInTheDocument();
});
