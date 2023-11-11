import request from 'supertest';
import app from '../../app';
import { connect, disconnect } from '../__helper__/mongodb.memory.test.helpers'


beforeAll(async () => {
  connect();
});

afterAll(async () => {
  disconnect();
});

describe('GET /api/v1/rentals', () => {
    it('responds with a array of rentals', async () =>
      request(app)
        .get('/api/v1/rentals')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then ((response) => {
          expect(response.body).toHaveProperty('length');
          expect(response.body.length).toBe(0);
        }),
    );
  });