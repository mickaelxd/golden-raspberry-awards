
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TopStudiosWithWinners from '../../../../pages/Dashboard/components/TopStudiosWithWinners';
import api from '../../../../services/api';
import { StudioDataResponse } from '../../../../pages/interfaces';

jest.mock('../../../../services/api');

const mockedApi = api as jest.Mocked<typeof api>;

test('renders TopStudiosWithWinners and displays data', async () => {
  const mockData: StudioDataResponse = {
    studios: [
      { name: 'Studio A', winCount: 10 },
      { name: 'Studio B', winCount: 8 },
      { name: 'Studio C', winCount: 5 },
    ],
  };

  mockedApi.get.mockResolvedValue({ data: mockData });

  render(<TopStudiosWithWinners />);

  expect(screen.getByText(/Top 3 Studios with Winners/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Studio A')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Studio B')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('Studio C')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
