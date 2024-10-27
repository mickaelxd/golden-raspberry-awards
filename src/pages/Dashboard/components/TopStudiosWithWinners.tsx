
import React, { useEffect, useState } from 'react';

import api from '../../../services/api';
import { StudioData, StudioDataResponse } from '../../interfaces';

const TopStudiosWithWinners: React.FC = () => {
  const [studios, setStudios] = useState<StudioData[]>([]);
  const [isLoadingStudios, setIsLoadingStudios] = useState(false);

  useEffect(() => {
    const fetchStudios = async () => {
      setIsLoadingStudios(true);
      try {
        const response = await api.get<StudioDataResponse>('/', {
          params: {
            projection: 'studios-with-win-count',
          }
        });
        const sortedStudios = response.data.studios.sort(
          (a: StudioData, b: StudioData) => b.winCount - a.winCount
        );
        setStudios(sortedStudios.slice(0, 3));
      } catch (error) {
        console.error('Error fetching studios:', error);
      } finally {
        setIsLoadingStudios(false);
      }
    };
    fetchStudios();
  }, []);

  return (
    <div className="grid-item">
      <h2>Top 3 Studios with Winners</h2>
      {isLoadingStudios ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Studio</th>
              <th>Total Wins</th>
            </tr>
          </thead>
          <tbody>
            {studios.map((studio) => (
              <tr key={studio.name}>
                <td>{studio.name}</td>
                <td>{studio.winCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TopStudiosWithWinners;
