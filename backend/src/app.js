const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./db/db");

const authRoutes = require("./routes/auth.route");
const foodRoutes = require("./routes/food.route");
const foodPartnerRoutes = require("./routes/food-partner.route");

const app = express();

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

app.use(cookieParser());


// Intercepts the Request: The middleware intercepts incoming requests before they hit your routes.
// Checks the Type: It looks at the Content-Type header. If it matches application/json, it moves forward.
// Parses the Body: It reads the incoming raw data stream and runs it through a parser (similar to JSON.parse()).
// Populates req.body: It assigns the final JavaScript object to req.body so you can use it immediately.
app.use(express.json());


//make sure MongoDB is connected before handling any request
app.use(async (req, res, next) => {

    try {
        await connectDB();
        next();
    }

    catch (err) {
        next(err);
    }
});


app.get("/", (req, res) => {
    res.send("<h1>Hello from server!</h1>");
});


app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);

module.exports = app;