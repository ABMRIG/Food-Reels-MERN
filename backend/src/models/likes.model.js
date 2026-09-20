

const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
    {
        //this stores which user liked the food
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },

        //this stores which food was liked
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "food",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

//a user should only have one like for one food item. 
//we need a safeguard bcs a user can quickly tap like multiple times causing multiple ebtires
// this is called compund unique index
likeSchema.index(
    { user: 1, food: 1 },
    { unique: true }
)

const likeModel = mongoose.model("like", likeSchema);

module.exports = likeModel