import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieList from '../../../pages/MovieList';
import api from '../../../services/api';

jest.mock('../../../services/api');

const mockedApi = api as jest.Mocked<typeof api>;

test('renders MovieList and displays movies with filtering', async () => {
  const mockResponse = {
    content: [
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
        year: 2001,
        title: 'Movie B',
        studios: ['Studio B'],
        producers: ['Producer B'],
        winner: false,
      },
    ],
    totalPages: 1,
  };

  mockedApi.get.mockResolvedValue({ data: mockResponse });

  render(<MovieList />);

  expect(screen.getByText(/List Movies/i)).toBeInTheDocument();

  expect(await screen.findByText('Movie A')).toBeInTheDocument();
  expect(await screen.findByText('2000')).toBeInTheDocument();

  const yesElements = await screen.findAllByText('Yes');
  expect(yesElements.some(el => el.tagName === 'TD')).toBe(true);

  expect(await screen.findByText('Movie B')).toBeInTheDocument();
  expect(await screen.findByText('2001')).toBeInTheDocument();

  const noElements = await screen.findAllByText('No');
  expect(noElements.some(el => el.tagName === 'TD')).toBe(true);

  const yearInput = screen.getByPlaceholderText('Filter by year');
  fireEvent.change(yearInput, { target: { value: '2000' } });

  const filteredResponse = {
    content: [mockResponse.content[0]],
    totalPages: 1,
  };

  mockedApi.get.mockResolvedValueOnce({ data: filteredResponse });

  expect(await screen.findByText('Movie A')).toBeInTheDocument();
  expect(await screen.findByText('Movie B')).toBeInTheDocument();
});
