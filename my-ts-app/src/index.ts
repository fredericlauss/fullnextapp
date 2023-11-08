import connect from './db';
import app from './app';

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  console.log(`Listening: http://localhost:${port}`);
  await connect();
});
