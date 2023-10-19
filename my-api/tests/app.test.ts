
import supertest from 'supertest'; 
import app from '../src/app';

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const response = await supertest(app).get('/'); 
    expect(response.status).toBe(200);
  });

  it('should return "Bienvenue sur votre API!"', async () => {
    const response = await supertest(app).get('/'); 
    expect(response.text).toBe('Bienvenue sur votre API !');
  });
});

