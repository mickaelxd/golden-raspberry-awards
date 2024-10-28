import React, { useEffect, useState } from 'react';
import { Container } from './styles';
import api from '../../services/api';
import { useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

interface PageParams {
  pageNumber: number;
  pageSize: number;
}

interface FormValues {
  yearFilter?: string;
  winnerFilter?: string;
}

const schema = yup.object().shape({
  yearFilter: yup
    .string()
    .test('year', 'Year must be 4 digits', value => !value || /^\d{4}$/.test(value!)),
  winnerFilter: yup.string().oneOf(['', 'yes', 'no'], 'Invalid selection'),
});

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageParams, setPageParams] = useState<PageParams>({ pageNumber: 0, pageSize: 15 });
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      yearFilter: '',
      winnerFilter: '',
    },
  });

  const yearFilter = useWatch({
    control,
    name: 'yearFilter',
  }) || '';

  const winnerFilter = useWatch({
    control,
    name: 'winnerFilter',
  }) || '';

  const fetchMovies = async (
    currentPageParams: PageParams,
    currentYearFilter: string,
    currentWinnerFilter: string
  ) => {
    setLoading(true);
    setError('');

    const params: Record<string, any> = {
      page: currentPageParams.pageNumber,
      size: currentPageParams.pageSize,
    };

    if (currentYearFilter && currentYearFilter.length === 4) {
      params.year = currentYearFilter;
    }

    if (currentWinnerFilter) {
      params.winner =
        currentWinnerFilter === 'yes' ? true : currentWinnerFilter === 'no' ? false : undefined;
    }

    try {
      const response = await api.get('/', { params });
      setMovies(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Erro ao buscar os filmes:', error);
      setError('Erro ao buscar os filmes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (yearFilter.length === 4 || yearFilter === '') {
      fetchMovies(pageParams, yearFilter, winnerFilter);
    }
  }, [pageParams, yearFilter, winnerFilter]);

  useEffect(() => {
    setPageParams(prev => ({ ...prev, pageNumber: 0 }));
  }, [yearFilter, winnerFilter]);

  const handlePreviousPage = () => {
    setPageParams(prev => ({
      ...prev,
      pageNumber: Math.max(prev.pageNumber - 1, 0),
    }));
  };

  const handleNextPage = () => {
    setPageParams(prev => ({
      ...prev,
      pageNumber: Math.min(prev.pageNumber + 1, totalPages - 1),
    }));
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageParams({ ...pageParams, pageSize: parseInt(e.target.value), pageNumber: 0 });
  };

  return (
    <Container>
      <h1>List Movies</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>
              Year
              <input
                type="text"
                placeholder="Filter by year"
                {...register('yearFilter')}
              />
              {errors.yearFilter && <p>{errors.yearFilter.message}</p>}
            </th>
            <th>Title</th>
            <th>
              Winner
              <select {...register('winnerFilter')}>
                <option value="">All</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.winnerFilter && <p>{errors.winnerFilter.message}</p>}
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4}>Loading...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={4}>{error}</td>
            </tr>
          ) : movies.length > 0 ? (
            movies.map(movie => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.year}</td>
                <td>{movie.title}</td>
                <td>{movie.winner ? 'Yes' : 'No'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No movies found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={pageParams.pageNumber === 0}>
          Previous
        </button>
        <span>
          Page {pageParams.pageNumber + 1} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={pageParams.pageNumber >= totalPages - 1}>
          Next
        </button>
        <select value={pageParams.pageSize} onChange={handlePageSizeChange}>
          <option value="10">10 per page</option>
          <option value="15">15 per page</option>
          <option value="20">20 per page</option>
        </select>
      </div>
    </Container>
  );
};

export default MovieList;
