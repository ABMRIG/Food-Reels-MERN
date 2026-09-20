// we will use this file to create APIs i.e. routes

const express = require("express");

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware")

//router will help us create the routes for our APIs
const router = express.Router();

//post is the method, inside it the 1st parameter is the route and the 2nd is the Controller (our basic callback fn of (req, res) => {})
router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);



//routes for FOOD PARTNER
router.post("/foodpartner/register", authController.registerFoodPartner);
router.post("/foodpartner/login", authController.loginFoodPartner);
router.get("/foodpartner/logout", authController.logoutFoodPartner);


//now we can know is it user or food-partner
router.get(
    "/me",
    authMiddleware.authenticate,
    authController.getCurrentAccount
);

module.exports = router;
