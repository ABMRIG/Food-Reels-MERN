const mongoose = require("mongoose");

const dns = require("dns")

// we need to set dns bcs my NOdeJS in this machine is facing some issue while trying to connect to DB

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = () => {
    //connect returns a promise
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("DB connected successfully")
    })
    .catch((err) => {
        console.log(err);
    })
}

// we need to export this to server.js
module.exports = connectDB;
