
const foodPartnerModel = require("../models/foodPartner.model")

const foodModel = require("../models/food.model")

async function getFoodPartnerById(req, res){

    //we are designing this expecting that we will receive the required foodPartner id in the URL Example URL:
    ///api/food-partner/6aa3192fa48861e27a4fe731
                        //  ↑
                        //  req.params.id
    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId).select("-password");

    //now we need to fetch all documnets that are linked to this food partner
    const foodItemsByFoodPartner = await foodModel.find({
        foodPartner: foodPartnerId
    })

    if (!foodPartner){
        return res.status(404).json({
            message: "Food partner not found"
        });
    }

    res.status(200).json({
        message: "Food partner retrieved successfully",

        //toObject() converts the Mongoose document into a normal JavaScript object so that we can add foodItems to it

        foodPartner: {
            //we spread the properties in foodPartner
            ...foodPartner.toObject(),
            
            //this will give us all the food items
            foodItems: foodItemsByFoodPartner
        }
    })

}

module.exports = { getFoodPartnerById }