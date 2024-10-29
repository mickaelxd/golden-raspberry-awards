
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import MovieList from '../pages/MovieList';

const routes = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/movies',
    element: <MovieList />,
  },
];

function RoutesComponent() {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Routes>
  );
}

export default RoutesComponent;
