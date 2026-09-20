const mongoose = require("mongoose");

const dns = require("dns");

// we need to set dns bcs my NodeJS in this machine is facing some issue while trying to connect to DB
if (process.env.NODE_ENV !== "production") {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

let connectionPromise = null;

const connectDB = async () => {

    //if DB is already connected, we don't need to connect again
    if (mongoose.connection.readyState === 1) {
        return;
    }

    //if DB connection is already in progress,
    //wait for that same connection instead of starting another one
    if (connectionPromise) {
        return connectionPromise;
    }

    //connect returns a promise
    try {
        connectionPromise = mongoose.connect(process.env.MONGODB_URI);
        await connectionPromise;
        console.log("DB connected successfully");
    }

    catch (err) {
        console.log(err);
        connectionPromise = null;
        throw err;
    }

};

// we need to export this to server.js
module.exports = connectDB;