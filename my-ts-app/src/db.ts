import mongoose from "mongoose";

const {
    MONGODB_URI = ' ',
} = process.env;

async function connect() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("DB connected avec mail truc");
    } catch (error) {
        console.log("Could not connect to DB")
    }    
}

export default connect;