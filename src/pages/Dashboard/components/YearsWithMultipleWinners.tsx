
import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { YearData, YearsDataResponse } from '../../interfaces';

const YearsWithMultipleWinners: React.FC = () => {
  const [years, setYears] = useState<YearData[]>([]);
  const [isLoadingYears, setIsLoadingYears] = useState(false);

  useEffect(() => {
    const fetchYears = async () => {
      setIsLoadingYears(true);
      try {
        const response = await api.get<YearsDataResponse>('/', {
          params: {
            projection: 'years-with-multiple-winners',
          },
        });
        const content = response.data.years.map((yearData) => ({
          year: yearData.year,
          winnerCount: yearData.winnerCount,
        }));
        setYears(content);
      } catch (error) {
        console.error('Error fetching years:', error);
      } finally {
        setIsLoadingYears(false);
      }
    };
    fetchYears();
  }, []);

  return (
    <div className="grid-item">
      <h2>List Years with Multiple Winners</h2>
      {isLoadingYears ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Win Count</th>
            </tr>
          </thead>
          <tbody>
            {years.map((yearData) => (
              <tr key={yearData.year}>
                <td>{yearData.year}</td>
                <td>{yearData.winnerCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default YearsWithMultipleWinners;
