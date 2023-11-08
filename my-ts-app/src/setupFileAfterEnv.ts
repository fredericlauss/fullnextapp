import mongoose from 'mongoose';

global.afterAll( async () => {
    await mongoose.connection.close();
});