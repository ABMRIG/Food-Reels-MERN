const mongoose = require("mongoose");

const connectDB = async () => {

    if (mongoose.connection.readyState === 1) {
        return;
    }

    try {

        console.log("Attempting MongoDB connection...");

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log("DB connected successfully");

    }
    catch (err) {

        console.log("DATABASE CONNECTION ERROR:");
        console.log(err.name);
        console.log(err.message);

        throw err;

    }

};

module.exports = connectDB;