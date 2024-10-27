
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import YearsWithMultipleWinners from '../../../../pages/Dashboard/components/YearsWithMultipleWinners';
import api from '../../../../services/api';
import { YearsDataResponse } from '../../../../pages/interfaces';

jest.mock('../../../../services/api');

const mockedApi = api as jest.Mocked<typeof api>;

test('renders YearsWithMultipleWinners and displays data', async () => {
  const mockData: YearsDataResponse = {
    years: [
      { year: 2000, winnerCount: 2 },
      { year: 2010, winnerCount: 3 },
    ],
  };

  mockedApi.get.mockResolvedValue({ data: mockData });

  render(<YearsWithMultipleWinners />);

  expect(screen.getByText(/List Years with Multiple Winners/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('2000')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
