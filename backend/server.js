// this fires up the server
require("dotenv").config()
const app = require("./src/app");

const connectDB = require("./src/db/db")

//before we start listening we need to connect to DB
connectDB();

app.listen(3000, () => {
    console.log("Server is listening on PORT 3000")
})