const express = require("express");
const foodController = require("../controllers/food.controller")
const authMiddleware = require("../middlewares/auth.middleware");
// MULTER helps in receiving files and storing the files coming from the frontend in the server's memory as buffer 
const multer = require("multer")

const upload = multer({
    //this stores files in server's memory
    storage: multer.memoryStorage()
})

const router = express.Router();



//The following URI should only be accessed by authenticated FODD PARTNERS
// POST  -> /api/food/  [PROTECTED]
router.post(
  "/",
  authMiddleware.authenticate,
  authMiddleware.requireRole("foodPartner"),
  upload.single("video"),
  foodController.createFood
)//we are uploading to memory using multer. The string inside ".single('')" must match with the file field name that is coming from frontend

//So the logic above is, if the user is authenticated, then upload the incoming file and then execute the controller logics




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