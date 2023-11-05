import request from 'supertest';

import app from '../../app';
import { Items } from './itmes.model'

beforeAll(async () => {
    try {
        await Items.drop
    } catch (error) {

    }
})

describe('GET /api/v1/items', () => {
  it('responds with a array of items', async () =>
    request(app)
      .get('/api/v1/items')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then ((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      }),
  );
});