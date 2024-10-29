// src/tests/services/api.test.ts
import api from '../../services/api';

test('api has correct baseURL', () => {
  expect(api.defaults.baseURL).toBe('https://challenge.outsera.tech/api/movies');
});
