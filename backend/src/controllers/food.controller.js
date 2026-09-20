const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/saves.model");


async function getUploadAuthentication(req, res) {
    const authenticationParameters =
        storageService.getUploadAuthenticationParameters();

    res.status(200).json(authenticationParameters);
}


async function createFood(req, res) {

    const { name, description, video } = req.body;

    if (!name?.trim() || !video?.trim()) {
        return res.status(400).json({
            message: "Food name and video are required",
        });
    }

    const foodItem = await foodModel.create({

        name: name.trim(),
        video: video,
        description: description?.trim(),
        foodPartner: req.auth.account._id,

    });

    res.status(201).json({
        message: "Food item successfully created",
        foodItem: foodItem,
    });
}


async function getFoodItems(req, res) {
    //we already know who the current user is because
    //authenticate middleware has put the account inside req.auth
    const userId = req.auth.account._id;

    //we need three things:
    //1. all food items
    //2. all foods this user has liked
    //3. all foods this user has saved
    //
    //Promise.all() lets us run these database queries together we know none of these DB queries are dependent on each other
    const [foodItems, userLikes, userSaves] = await Promise.all([
        foodModel.find({}),
        likeModel.find({ user: userId }).select("food"),    //we are only storing the liked food id in userLikes
        saveModel.find({ user: userId }).select("food"),    //we are onlyu storing the saved food id in userSaves
    ]);

    // so userLikes, userSavees contain something like: 
    /*  [
            { food: "Pizza" },
            { food: "Biryani" }
        ]
    */

    //we do .toString() bcs the ids are not stored as normal strings in MongoDB
    //we convert the Array to Set so that we can use .has for quick lookup 
    const likedFoodIds = new Set(userLikes.map((like) => like.food.toString()));

    //same thing for saved foods
    const savedFoodIds = new Set(userSaves.map((save) => save.food.toString()));

    //now add the current user's like/save state to every food item
    const foodItemsWithUserState = foodItems.map((food) => ({

        //food is for example {food: burger} so we convert it into JS object then spread it so that we can add the other properties "isLiked", "isSaved"
        ...food.toObject(),

        //true if the current user has liked this food
        isLiked: likedFoodIds.has(food._id.toString()),

        //true if the current user has saved this food
        isSaved: savedFoodIds.has(food._id.toString()),
    }));

    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems: foodItemsWithUserState,
    });
}

//this is how likeFood works:
/*So, if a user likes the food then we create a document connecting the food and the user in likes cluster and we also increment the like counter in the food document in food cluster.

But if a user had already liked the food and he presses the like again then we find a document in like cluster where the userId and foodId match and we delete that document and we also decrement the like counter in food document of food cluster*/

async function likeFood(req, res) {
    const userId = req.auth.account._id;
    const { foodId } = req.body;

    const existingLike = await likeModel.findOne({
        user: userId,
        food: foodId,
    });

    //if such document found
    if (existingLike) {
        await likeModel.findByIdAndDelete(existingLike._id);

        //deccreasing the like count
        const updatedFood = await foodModel.findByIdAndUpdate(
            foodId,
            { $inc: { likeCount: -1}},
            //this says mongoose: after updating the food document give me the updated food document 
            { new: true }
        )

        return res.status(200).json({
            message: "Food unlicked successfully",
            isLiked: false,
            likeCount: updatedFood.likeCount
        });
    }

    await likeModel.create({
        user: userId,
        food: foodId,
    });

    //increase the total like count
    const updatedFood = await foodModel.findByIdAndUpdate(
        foodId,
        { $inc: { likeCount: 1}},
        { new: true }
    )

    return res.status(200).json({
        message: "Food liked successfully",
        isLiked: true,
        likeCount: updatedFood.likeCount
    })
}

async function saveFood(req, res) {
    const userId = req.auth.account._id;

    //foodId will come from the frontend
    const { foodId } = req.body;

    //check if this user has already saved the food item
    const existingSave = await saveModel.findOne({
        user: userId,
        food: foodId,
    });

    //if such a document is found, the user is trying to unsave the food
    if (existingSave) {

        //delete the existing Save document
        await saveModel.findByIdAndDelete(existingSave._id);

        //we also need to decrease the save counter
        const updatedFood = await foodModel.findByIdAndUpdate(
            foodId,
            { $inc: { savesCount: -1 } },
            { new: true }
        );

        return res.status(200).json({
            message: "Food unsaved successfully",
            isSaved: false,
            savesCount: updatedFood.savesCount
        });
    }

    //if no Save document exists, the user is saving this food for the first time
    await saveModel.create({
        user: userId,
        food: foodId,
    });

    //and now we increase the save counter
    const updatedFood = await foodModel.findByIdAndUpdate(
        foodId,
        { $inc: { savesCount: 1 } },
        { new: true }
    );

    res.status(200).json({
        message: "Food saved successfully",
        isSaved: true,
        savesCount: updatedFood.savesCount
    });
}

async function getSaveFood(req, res) {
    const userId = req.auth.account._id;

    //find all Save documents belonging to the current user

    /*.populate() replaces a stored reference ID in a document with the actual data from another collection*/

    //populate("food") tells Mongoose to replace the food ObjectId with the actual food document from the food collection
    const savedFoods = await saveModel
        .find({
            user: userId,
        })
        .populate("food");

    //if user has niot saved any food
    if (savedFoods.length === 0) {
        return res.status(404).json({
            message: "No saved foods found",
        });
    }

    res.status(200).json({
        message: "Saved foods fetched successfully",
        savedFoods,
    });
}

module.exports = {
    getUploadAuthentication,
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSaveFood,
};
