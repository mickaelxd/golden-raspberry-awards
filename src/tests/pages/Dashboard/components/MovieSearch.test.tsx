
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import MovieSearch from '../../../../pages/Dashboard/components/MovieSearch';
import api from '../../../../services/api';
import { Movie } from '../../../../pages/interfaces';

jest.mock('../../../../services/api');

const mockedApi = api as jest.Mocked<typeof api>;

test('renders MovieSearch and searches for movies', async () => {
  const mockMovies: Movie[] = [
    {
      id: 1,
      year: 2000,
      title: 'Movie A',
      studios: ['Studio A'],
      producers: ['Producer A'],
      winner: true,
    },
    {
      id: 2,
      year: 2000,
      title: 'Movie B',
      studios: ['Studio B'],
      producers: ['Producer B'],
      winner: true,
    },
  ];

  mockedApi.get.mockResolvedValue({ data: mockMovies });

  render(<MovieSearch />);

  expect(screen.getByText(/List movie winners by year/i)).toBeInTheDocument();

  const input = screen.getByPlaceholderText('Search by year');
  const button = screen.getByRole('button');

  fireEvent.change(input, { target: { value: '2000' } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText('Movie A')).toBeInTheDocument();
    expect(screen.getByText('Studio A')).toBeInTheDocument();
    expect(screen.getByText('Producer A')).toBeInTheDocument();

    expect(screen.getByText('Movie B')).toBeInTheDocument();
    expect(screen.getByText('Studio B')).toBeInTheDocument();
    expect(screen.getByText('Producer B')).toBeInTheDocument();
  });
});
