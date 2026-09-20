const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },

    //foodPartner creates a relational link between two database collections: food items and foodpartner entities
    foodPartner: {
        // we are adding the foodPartner model here
        //the type of the model is the following:
        type: mongoose.Schema.Types.ObjectId,
        // here we have given the exact name of the model
        ref: "foodPartner",
        required: true,
    },

    likeCount: {
        type: Number,
        default: 0
    },

    savesCount: {
        type: Number,
        default: 0
    }
});

const foodModel = mongoose.model("food", foodSchema);

module.exports = foodModel;
