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

describe('POST /api/v1/items', () => {
    it('responds with a error if the item is not valid', async () =>
      request(app)
        .post('/api/v1/items')
        .set('Accept', 'application/json')
        .send({
            name: '',
        })
        .expect('Content-Type', /json/)
        .expect(422)
        .then ((response) => {
          expect(response.body).toHaveProperty('message');
        }),
    );

    it('responds with inserted object', async () =>
    request(app)
      .post('/api/v1/items')
      .set('Accept', 'application/json')
      .send({
          name: 'name of the item',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then ((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name');
        expect(response.body.name).toBe('name of the item');
      }),
  );
  });