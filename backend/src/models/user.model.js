// we will create the schema for the user and then the model for the user

const mongoose = require("mongoose");

//first we will create the SCHEMA for the user
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        //we are not keeping the require true since we don't need the password in case we are using google authenticator or something as such
        
        // required : false,
    }
},
{   
    //timestamp automatically gets created in the DB to track when was the user created or his/her details got updated
    timestamps: {
        required: true
    }
})

//2nd we will create the model of the user using the schema
//the syntax inside .model() is name of the model and then the schema it is based on

//IMPORTANT: we can pass the name of the Collection this Model will make in the 3rd parameter or MongoDB automatically generates it by adding a "s" to the end of the Model name.
const userModel = mongoose.model("user", userSchema);


//so schema is just the structure, model is what we need to export
// our controllers are going to import it
module.exports = userModel;