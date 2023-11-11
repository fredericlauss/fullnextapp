import request from 'supertest';
import app from '../../app';
import { connect, disconnect } from '../__helper__/mongodb.memory.test.helpers'


beforeAll(async () => {
  connect();
});

afterAll(async () => {
  disconnect();
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
        expect(response.body.length).toBe(0);
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
          isRented: false,
          rentalId: null,
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then ((response) => {
        expect(response.body).toHaveProperty('_id');
        id = response.body._id;
        expect(response.body).toHaveProperty('name');
        expect(response.body.name).toBe('name of the item');
        expect(response.body).toHaveProperty('isRented');
        expect(response.body).toHaveProperty('rentalId');
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
        isRented: true,
        rentalId: null,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then ((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('name');
        expect(response.body.name).toBe('new name');
        expect(response.body).toHaveProperty('isRented');
        expect(response.body).toHaveProperty('rentalId');
      }),
    );
    it('responds with invalid Id error', (done) => {
      request(app)
        .put('/api/v1/items/zeeazeazeaze')
        .set('Accept', 'application/json')
        .send({
          name: 'new name',
          isRented: true,
          rentalId: null,
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
          isRented: true,
          rentalId: null,
        })
        .expect('Content-Type', /json/)
        .expect(404, done);
      },
    );
  });

  describe('DELETE /api/v1/items/:id', () => {
    it('responds with 400 bad request', (done) => {
    request(app)
      .delete(`/api/v1/items/${id}`)
      .set('Accept', 'application/json')
      .expect(400, done)
  });
  it('responds with the right item', async () =>
    request(app)
      .put(`/api/v1/items/${id}`)
      .set('Accept', 'application/json')
      .send({
        name: 'new name',
        isRented: false,
        rentalId: null,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then ((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('name');
        expect(response.body.name).toBe('new name');
        expect(response.body).toHaveProperty('isRented');
        expect(response.body).toHaveProperty('rentalId');
      }),
    );
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