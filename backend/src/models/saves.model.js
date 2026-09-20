
const mongoose = require("mongoose");

const saveSchema = new mongoose.Schema({

    //this stores which user saved the food*
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    //this stores which food was saved*
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
        required: true
    }

}, {
    timestamps: true
});

//a user should only be able to save one food item once
//this is called compund unique index
saveSchema.index(
    { user: 1, food: 1 },
    { unique: true }
);

const saveModel = mongoose.model("save", saveSchema);

module.exports = saveModel;