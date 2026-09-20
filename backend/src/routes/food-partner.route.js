const express = require("express");

const foodPartnerController = require("../controllers/food-partner.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const router = express.Router();

router.get(
    "/:id",
    authMiddleware.authenticate,
    authMiddleware.requireRole("user"),
    foodPartnerController.getFoodPartnerById
)

module.exports = router;