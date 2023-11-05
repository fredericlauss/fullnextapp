import { MongoClient } from "mongodb";

const {
    MONGODB_URI = 'localhost/todo-api',
} = process.env;

export const client = new MongoClient("mongodb://userAdmin:userPassword@localhost:27017");
export const db = client.db();