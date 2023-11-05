
import supertest from 'supertest'; 
import {app, server} from '../app';

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
    beforeAll(done => {
      done()
    })
    afterAll(done => {
      server.close();
      done();
    })
      // enregistrment en bdd


      // reponse avec id de l'item
      test("should contain a itemId in the response", async () => {
        const response = await supertest(app).post("/items").send({
          itemname: "itemname",
          moreinfos: "moreinfos"
        })
        expect(response.body.itemId).toBeDefined()
      })

      // code 200
      test("should have status code 200", async () => {
          const response = await supertest(app).post("/items").send({
              itemname: "itemname",
              moreinfos: "moreinfos"
          })
          expect(response.statusCode).toBe(200)
      })

      // repond en json
      test("should respond json", async () => {
        const response = await supertest(app).post("/items").send({ 
          itemname: "itemname",
          moreinfos: "moreinfos" 
        })
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      })
  })

  describe("missing infos", () => {
      // doit répondre en 400
      describe("when itemname is missing", () => {
        test("should return a 400 status code", async () => {
          const bodies = [
            { itemname: "itemname" },
            { moreinfos: "moreinfos" }
          ]
          for (const body of bodies) {
            const response = await supertest(app).post("/items").send(body)
            expect(response.statusCode).toBe(400)
          }
        })
      })
  })
})
