//this fires up the server

require("dotenv").config()

const app = require("./src/app");

const connectDB = require("./src/db/db")

//before we start listening we need to connect to DB

if (process.env.NODE_ENV !== "production") {

    connectDB();

    app.listen(3000, () => {

        console.log("Server is listening on PORT 3000")

    })

}

//Vercel uses this exported app in production
module.exports = async (req, res) => {

    await connectDB();

    return app(req, res);

};