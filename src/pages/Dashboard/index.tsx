
import React from 'react';
import { Container } from './styles';

import YearsWithMultipleWinners from './components/YearsWithMultipleWinners';
import TopStudiosWithWinners from './components/TopStudiosWithWinners';
import ProducersWithIntervals from './components/ProducersWithIntervals';
import MovieSearch from './components/MovieSearch';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <YearsWithMultipleWinners />
      <TopStudiosWithWinners />
      <ProducersWithIntervals />
      <MovieSearch />
    </Container>
  );
};

export default Dashboard;
