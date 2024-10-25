
import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from '../../../pages/Dashboard';

test('renders Dashboard without crashing', () => {
  render(<Dashboard />);
});
