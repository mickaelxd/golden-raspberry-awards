
import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../../../layout/components/Navbar';

test('renders Navbar with title', () => {
  render(<Navbar />);
  const titleElement = screen.getByText(/Frontend React Test/i);
  expect(titleElement).toBeInTheDocument();
});
