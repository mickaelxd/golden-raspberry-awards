
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProducersWithIntervals from '../../../../pages/Dashboard/components/ProducersWithIntervals';
import api from '../../../../services/api';
import { MinMaxIntervalProducersResponse } from '../../../../pages/interfaces';

jest.mock('../../../../services/api');

const mockedApi = api as jest.Mocked<typeof api>;

test('renders ProducersWithIntervals and displays data', async () => {
  const mockData: MinMaxIntervalProducersResponse = {
    max: [
      {
        producer: 'Producer A',
        interval: 10,
        previousWin: 2000,
        followingWin: 2010,
      },
    ],
    min: [
      {
        producer: 'Producer B',
        interval: 1,
        previousWin: 2005,
        followingWin: 2006,
      },
    ],
  };

  mockedApi.get.mockResolvedValue({ data: mockData });

  render(<ProducersWithIntervals />);

  expect(
    screen.getByText(/Producers with longest and shortest interval between wins/i)
  ).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Producer A')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('2000')).toBeInTheDocument();
    expect(screen.getByText('2010')).toBeInTheDocument();

    expect(screen.getByText('Producer B')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2005')).toBeInTheDocument();
    expect(screen.getByText('2006')).toBeInTheDocument();
  });
});
