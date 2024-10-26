
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Movie, SearchMovieByYearResponse } from '../../interfaces';
import api from '../../../services/api';


const schema = yup.object().shape({
  searchYear: yup
    .number()
    .typeError('Year must be a number')
    .required('Year is required')
    .integer('Year must be an integer')
    .positive('Year must be positive'),
});

const MovieSearch: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setIsLoadingMovies(true);
    try {
      const response = await api.get<SearchMovieByYearResponse>('/', {
        params: {
          winner: true,
          year: data.searchYear,
        },
      });
      const content = response.data.map((movie) => ({
        id: movie.id,
        year: movie.year,
        title: movie.title,
        studios: movie.studios,
        producers: movie.producers,
        winner: movie.winner,
      }));
      setMovies(content);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoadingMovies(false);
    }
  };

  return (
    <div className="grid-item">
      <h2>List movie winners by year</h2>
      <form className="search-bar" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Search by year"
          {...register('searchYear')}
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>
      {isLoadingMovies ? (
        <p>Loading...</p>
      ) : (
        movies.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Studios</th>
                <th>Producers</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.title}</td>
                  <td>{movie.studios.join(', ')}</td>
                  <td>{movie.producers.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
};

export default MovieSearch;
