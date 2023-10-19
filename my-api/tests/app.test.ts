
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

describe("POST /items", () => {

  describe("il y a toutes les infos", () => {
      // enregistrment en bdd
      // reponse avec id de l'item
      // code 200
      test("should have status code 200", async () => {
          const response = await supertest(app).post("/items").send({
              itemname: "itemname",
              moreinfos: "moreinfos"
          })
          expect(response.statusCode).toBe(200)
      })

      // repond en json

  })

  describe("il manque des infos", () => {
      // doit répondre en 400
  })
})

