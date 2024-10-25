
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Sidebar from '../../../layout/components/Sidebar';

test('renders Sidebar with navigation links', () => {
  render(
    <Router>
      <Sidebar />
    </Router>
  );
  const dashboardLink = screen.getByText(/Dashboard/i);
  const moviesLink = screen.getByText(/Movies/i);
  expect(dashboardLink).toBeInTheDocument();
  expect(moviesLink).toBeInTheDocument();
});
