const mongoose = require('mongoose')

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected successfully");
    } catch (error) {
        console.log('Error connecting to DB: ', error.message)
    }
}

module.exports = connectionDB;