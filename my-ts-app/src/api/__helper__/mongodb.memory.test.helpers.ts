import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongodb: MongoMemoryServer;

export const connect = async () => {
    mongodb = await MongoMemoryServer.create();
    const uri = mongodb.getUri();
    await mongoose.connect(uri);
}

export const disconnect = async () => {
    await mongoose.disconnect();
    await mongodb.stop();
}