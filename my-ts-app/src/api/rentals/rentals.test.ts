import mongoose from 'mongoose';

import request from 'supertest';
import app from '../../app';

beforeAll(async () => {
  try {
    await mongoose.connect("mongodb://userAdmin:userPassword@127.0.0.1:27017");
    console.log("DB connected");
} catch (error) {
    console.log("Could not connect to DB")
}  
});

afterAll(async () => {
  await mongoose.disconnect();
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