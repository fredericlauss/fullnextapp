import mongoose from "mongoose";

const {
    MONGODB_URI = 'localhost/todo-api',
} = process.env;

async function connect() {
    try {
        await mongoose.connect("mongodb://userAdmin:userPassword@127.0.0.1:27017");
        console.log("DB connected");
    } catch (error) {
        console.log("Could not connect to DB")
    }    
}

export default connect;