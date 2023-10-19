import express, { Request, Response } from 'express';

const app = express();
const port = 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenue sur votre API !');
});

app.use(express.json())
app.post('/items', (req: Request, res: Response) => {
  const { itemname, moreinfos } = req.body
  if (!itemname) {
    res.send(400)
    return
  }

  res.send({itemId: 0})
})

app.listen(port, () => {
  console.log(`L'API est en cours d'exécution sur le port ${port}`);
});

export default app;
