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

describe('GET /api/v1/items', () => {
  it('responds with a array of items', async () =>
    request(app)
      .get('/api/v1/items')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then ((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(1);
      }),
  );
});

let id = '';
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
        id = response.body._id;
        expect(response.body).toHaveProperty('name');
        expect(response.body.name).toBe('name of the item');
      }),
  );
  });

  describe('GET /api/v1/items/:id', () => {
    it('responds with the right item', async () =>
      request(app)
        .get(`/api/v1/items/${id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then ((response) => {
          expect(response.body).toHaveProperty('_id');
          expect(response.body._id).toBe(id);
          expect(response.body).toHaveProperty('name');
          expect(response.body.name).toBe('name of the item');
        }),
    );
    it('responds with invalid Id error', (done) => {
    request(app)
      .get('/api/v1/items/zeeazeazeaze')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
    },
  );
  it('responds with not found error', (done) => {
    request(app)
      .get('/api/v1/items/6547b4673191de74c9df99ae')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
    },
  );
  });


  describe('PUT /api/v1/items/:id', () => {
    it('responds with the right item', async () =>
    request(app)
      .put(`/api/v1/items/${id}`)
      .set('Accept', 'application/json')
      .send({
        name: 'new name',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then ((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('name');
        expect(response.body.name).toBe('new name');
      }),
    );
    it('responds with invalid Id error', (done) => {
      request(app)
        .put('/api/v1/items/zeeazeazeaze')
        .set('Accept', 'application/json')
        .send({
          name: 'new name',
        })
        .expect('Content-Type', /json/)
        .expect(422, done);
      },
    );
    it('responds with not found error', (done) => {
      request(app)
        .put('/api/v1/items/6547b4673191de74c9df99ae')
        .set('Accept', 'application/json')
        .send({
          name: 'new name',
        })
        .expect('Content-Type', /json/)
        .expect(404, done);
      },
    );
  });

  describe('DELETE /api/v1/items/:id', () => {
    it('responds with 204', (done) => {
    request(app)
      .delete(`/api/v1/items/${id}`)
      .set('Accept', 'application/json')
      .expect(204, done)
  });
    it('responds with invalid Id error', (done) => {
      request(app)
        .delete('/api/v1/items/zeeazeazeaze')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422, done);
      },
    );
    it('responds with not found error', (done) => {
      request(app)
        .delete('/api/v1/items/6547b4673191de74c9df99ae')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, done);
      },
    );
    it('responds with not found error', (done) => {
      request(app)
        .get(`/api/v1/items/${id}`)
        .set('Accept', 'application/json')
        .expect(404, done);
      },
    );
  });