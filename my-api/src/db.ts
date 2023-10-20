import mongoose from 'mongoose';

const dbURL = process.env.MONGODB_URI;

if(dbURL) {
  mongoose.connect(dbURL)
  .then(() => {
    console.log('Connecté à la base de données MongoDB');
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base de données :', err);
  });

mongoose.connection.on('error', (err) => {
  console.error('Erreur de connexion à la base de données :', err);
});

mongoose.connection.once('open', () => {
  console.log('Connexion à la base de données établie');
});
}


export default mongoose.connection;
