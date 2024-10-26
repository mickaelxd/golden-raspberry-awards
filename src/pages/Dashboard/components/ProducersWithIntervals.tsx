
import React, { useEffect, useState } from 'react';

import { Interval, MinMaxIntervalProducersResponse } from '../../interfaces';
import api from '../../../services/api';

const ProducersWithIntervals: React.FC = () => {
  const [maxProducers, setMaxProducers] = useState<Interval[]>([]);
  const [minProducers, setMinProducers] = useState<Interval[]>([]);
  const [isLoadingProducers, setIsLoadingProducers] = useState(false);

  useEffect(() => {
    const fetchProducers = async () => {
      setIsLoadingProducers(true);
      try {
        const response = await api.get<MinMaxIntervalProducersResponse>('/', {
          params: {
            projection: 'max-min-win-interval-for-producers',
          },
        });
        setMaxProducers(response.data.max);
        setMinProducers(response.data.min);
      } catch (error) {
        console.error('Error fetching producers:', error);
      } finally {
        setIsLoadingProducers(false);
      }
    };
    fetchProducers();
  }, []);

  return (
    <div className="grid-item">
      <h2>Producers with longest and shortest interval between wins</h2>
      {isLoadingProducers ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <h3>Maximum</h3>
            <table>
              <thead>
                <tr>
                  <th>Producer</th>
                  <th>Interval</th>
                  <th>Previous Win</th>
                  <th>Following Win</th>
                </tr>
              </thead>
              <tbody>
                {maxProducers.map((producer) => (
                  <tr key={producer.producer}>
                    <td>{producer.producer}</td>
                    <td>{producer.interval}</td>
                    <td>{producer.previousWin}</td>
                    <td>{producer.followingWin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3>Minimum</h3>
            <table>
              <thead>
                <tr>
                  <th>Producer</th>
                  <th>Interval</th>
                  <th>Previous Win</th>
                  <th>Following Win</th>
                </tr>
              </thead>
              <tbody>
                {minProducers.map((producer) => (
                  <tr key={producer.producer}>
                    <td>{producer.producer}</td>
                    <td>{producer.interval}</td>
                    <td>{producer.previousWin}</td>
                    <td>{producer.followingWin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ProducersWithIntervals;
