// this is our server

const express = require("express");
const cookieParser = require("cookie-parser")

const cors = require("cors")

const authRoutes = require("./routes/auth.route")
const foodRoutes = require("./routes/food.route")
const foodPartnerRoutes = require("./routes/food-partner.route")

const app = express();

//using cors we specified from where we will get our frontend data
const allowedOrigin =
    process.env.NODE_ENV === "production"
        ? "https://foodreels-kappa.vercel.app"
        : "http://localhost:5173";

app.use(cors({
    origin: allowedOrigin,
    credentials: true,
}));

//explicitly handle CORS preflight requests
app.options(/.*/, cors({
    origin: allowedOrigin,
    credentials: true,
}));

// IMPORTANT: express.json() is the Middleware 
// IMPORTANT: app.use() is an Express method used to tell Express which Middleware to use.

// so we need to write app.use() whenever we want to make use of a middleware

//cookie-parser is a middleware which intercepts the incoming cookie header (cookie comes from browser) and turns it into an JavaScript object.
//browser sends cookies in its requests
app.use(cookieParser())

// the below middleware parses the data coming from the Frontend so that req.body can work
app.use(express.json())


// req, res are Standard JavaScript Objects
// the 2nd parameter of app.get() is controller
app.get("/", (req, res) => {
    res.send("DEPLOYMENT TEST - NEW APP.JS");
})

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner/", foodPartnerRoutes);

module.exports = app;