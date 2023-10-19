import express, { Request, Response } from 'express';

const app = express();
const port = 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenue sur votre API !');
});

app.listen(port, () => {
  console.log(`L'API est en cours d'exécution sur le port ${port}`);
});
