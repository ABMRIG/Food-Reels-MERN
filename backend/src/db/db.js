const mongoose = require("mongoose");

const dns = require("dns");

// Use a resolver that can resolve MongoDB Atlas SRV records in restricted runtimes.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

let connectionPromise;

const connectDB = async () => {

    // if already connected, don't create another connection
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!connectionPromise) {
        console.log("Attempting MongoDB connection...");
        connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
        });

        connectionPromise
            .then(() => console.log("DB connected successfully"))
            .catch((err) => {
                console.log("DATABASE CONNECTION ERROR:");
                console.log(err.name);
                console.log(err.message);
                connectionPromise = undefined;
            });
    }

    await connectionPromise;

};

module.exports = connectDB;