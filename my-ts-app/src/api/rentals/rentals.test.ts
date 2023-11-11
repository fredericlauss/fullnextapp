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

  let id = '';
  let itemrentedid = '';
describe('POST /api/v1/rentals', () => {
    it('responds with a 201 status and the created rental', async () => {
      const itemResponse = await request(app)
        .post('/api/v1/items')
        .set('Accept', 'application/json')
        .send({
          name: 'Item for Rental',
          isRented: false,
          rentalId: null,
        });
      itemrentedid = itemResponse.body._id;
      const itemId = itemResponse.body._id;
      const response = await request(app)
        .post('/api/v1/rentals')
        .set('Accept', 'application/json')
        .send({
          itemId,
          studentEmail: 'test@example.com',
          startDate: new Date('2023-12-01'),
          endDate: new Date('2023-12-10'),
        });
        id = response.body._id
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.itemId).toBe(itemId);
      expect(response.body.studentEmail).toBe('test@example.com');
      expect(response.body.startDate).toBe('2023-12-01T00:00:00.000Z');
      expect(response.body.endDate).toBe('2023-12-10T00:00:00.000Z');
  
      const updatedItemResponse = await request(app).get(`/api/v1/items/${itemId}`).set('Accept', 'application/json');
      expect(updatedItemResponse.body.isRented).toBe(true);
      expect(updatedItemResponse.body.rentalId).toBe(response.body._id);
    });

    it('responds with a 422 not an item id', async () => {
      const response = await request(app)
        .post('/api/v1/rentals')
        .set('Accept', 'application/json')
        .send({
          itemId: 'zeoiezfjezgjfezjlk',
          studentEmail: 'test@example.com',
          startDate: new Date('2023-12-01'),
          endDate: new Date('2023-12-10'),
        });
  
      expect(response.status).toBe(422);
    });
  
    it('responds with a 404 status if item does not exist', async () => {
      const response = await request(app)
        .post('/api/v1/rentals')
        .set('Accept', 'application/json')
        .send({
          itemId: '6547b4673191de74c9df99ae',
          studentEmail: 'test@example.com',
          startDate: new Date('2023-12-01'),
          endDate: new Date('2023-12-10'),
        });
  
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Item with id \"6547b4673191de74c9df99ae\" not found');
    });
  
    it('responds with a 400 status if item is already rented', async () => {
      const itemResponse = await request(app)
        .post('/api/v1/items')
        .set('Accept', 'application/json')
        .send({
          name: 'Rented Item',
          isRented: true,
          rentalId: null,
        });
        const itemGoodResponse = await request(app)
        .put(`/api/v1/items/${itemResponse.body._id}`)
        .set('Accept', 'application/json')
        .send({
          name: 'Rented Item',
          isRented: true,
          rentalId: null,
        })
      const response = await request(app)
        .post('/api/v1/rentals')
        .set('Accept', 'application/json')
        .send({
          itemId: itemGoodResponse.body._id,
          studentEmail: 'test@example.com',
          startDate: new Date('2023-12-01'),
          endDate: new Date('2023-12-10'),
        });
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(`item with ID ${itemResponse.body._id} already rented`);
    });
  
  });

describe('GET /api/v1/rentals/:id', () => {
    it('responds with the right item', async () =>
      request(app)
        .get(`/api/v1/rentals/${id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then ((response) => {
          expect(response.body).toHaveProperty('itemId');
          expect(response.body).toHaveProperty('studentEmail');
          expect(response.body).toHaveProperty('startDate');
          expect(response.body).toHaveProperty('endDate');
        }),
    );
    it('responds with invalid Id error', (done) => {
    request(app)
      .get('/api/v1/rentals/zeeazeazeaze')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
    },
  );
  it('responds with not found error', (done) => {
    request(app)
      .get('/api/v1/rentals/6547b4673191de74c9df99ae')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
    },
  );
  });

describe('DELETE /api/v1/rentals/:id', () => {
  it('responds with a 404 status if rental does not exist', async () => {
      const response = await request(app)
          .delete('/api/v1/rentals/6547b4673191de74c9df99ae')
          .set('Accept', 'application/json')
          .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Rental with id "6547b4673191de74c9df99ae" not found');
  });

  it('responds with a 422 status if invalid rental id', async () => {
      const response = await request(app)
          .delete('/api/v1/rentals/zeeazeazeaze')
          .set('Accept', 'application/json')
          .expect(422);
  });
  it('responds with a 204 status and deletes the rental', async () => {
        const response = await request(app)
            .delete(`/api/v1/rentals/${id}`)
            .set('Accept', 'application/json')
            .expect(204);
        const updatedItemResponse = await request(app)
            .get(`/api/v1/items/${itemrentedid}`)
            .set('Accept', 'application/json');
            expect(updatedItemResponse.body.isRented).toBe(false);
            expect(updatedItemResponse.body.rentalId).toBe(null);
  });

});
