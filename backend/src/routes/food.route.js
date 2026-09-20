const express = require("express");
const foodController = require("../controllers/food.controller")
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get(
    "/upload-auth",
    authMiddleware.authenticate,
    authMiddleware.requireRole("foodPartner"),
    foodController.getUploadAuthentication
);

//The following URI should only be accessed by authenticated FODD PARTNERS
// POST  -> /api/food/  [PROTECTED]
router.post(
  "/",
  authMiddleware.authenticate,
  authMiddleware.requireRole("foodPartner"),
  foodController.createFood
)


// GET -> /api/food/ [Protected]
//this route will be for our home screen where user will be scrolling the videos
router.get(
  "/",
  authMiddleware.authenticate,
  authMiddleware.requireRole("user"),
  foodController.getFoodItems
)

router.post(
    "/like",
    authMiddleware.authenticate,
    authMiddleware.requireRole("user"),
    foodController.likeFood
);

router.post(
    "/save",
    authMiddleware.authenticate,
    authMiddleware.requireRole("user"),
    foodController.saveFood
)

router.get(
    "/save",
    authMiddleware.authenticate,
    authMiddleware.requireRole("user"),
    foodController.getSaveFood
);


module.exports = router;