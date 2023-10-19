
import supertest from 'supertest'; 
import app from '../src/app';

describe("POST /items", () => {

  describe("il y a toutes les infos", () => {
      // enregistrment en bdd
      // reponse avec id de l'item
      test("should contain a userId in the response body", async () => {
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
      test("should specify json as the content type in the http header", async () => {
        const response = await supertest(app).post("/items").send({ 
          itemname: "itemname",
          moreinfos: "moreinfos" 
        })
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      })
  })

  describe("il manque des infos", () => {
      // doit répondre en 400
      describe("when itemname is missing", () => {
        test("should return a 400 status code", async () => {
          const response = await supertest(app).post("/items").send({ moreinfos: "moreinfos" })
          expect(response.statusCode).toBe(400)
        })
      })
  })
})

