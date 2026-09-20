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

app.options(/.*/, cors({
    origin: allowedOrigin,
    credentials: true,
}));

app.use(cookieParser());
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
    res.send("DEPLOYMENT TEST - NEW APP.JS");
});

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);

module.exports = app;