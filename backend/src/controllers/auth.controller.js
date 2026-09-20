//controllers are the ones which sit between the routes and the services/models

const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodPartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//we were making anonymous controller functions when we were writing them directly inside app.js inside get, put etc methods in the form of (req, res) => {}

async function registerUser(req, res) {
    const { fullName, email, password } = req.body;

    if (!fullName?.trim() || !email?.trim() || !password || password.length < 8) {
        return res.status(400).json({
            message:
                "Name, email, and a password of at least 8 characters are required",
        });
    }

    //now first we need to check if the user already exists. Else create a new account

    //findOne is a Mongoose method which searches our MongoDB cluster
    const isUserAlreadyExists = await userModel.findOne({
        email: email.trim().toLowerCase(),
    });

    //we don't write res.send bcs "res.status" and "res.json" will anyways send data to frotend
    if (isUserAlreadyExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    //if the user is not registered then we can go forward and has the password. 10 represents the number of rounds of salting, the password is going to go through
    const hashedPassword = await bcrypt.hash(password, 10);

    //now we will create the user BTW creating the user is same as registering the user.
    const user = await userModel.create({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
    });

    //JWTs are used for user authentication and authorization in web applications. When we log in, our server creates a signed JWT and gives it to our browser or app. For future requests, our app sends this token back to the server so we can access protected pages without logging in again and also everytime a req iss sent to the server, the server understands which user is sending it.

    //we have imported and used "cookie-parser" in app.js as a middleware

    //a jwt token is a signed container that contains a user's unique identity. To keep the token SECURE we sign it using an unique key.
    const token = jwt.sign(
        {
            _id: user._id,
            role: "user",
        },
        process.env.JWT_SECRET,
    );

    //now we create a cookie that contains the jwt string and send it to the browser. res.cookie() creates the "cookie" and fills the content in the following manner: 1st parameter is the name of the cookie and the 2nd param is the cookie value
    res.cookie("token", token);

    //sending success message to the front-end after sending the cookie to ack that the user has been created successfully
    res.status(201).json({
        message: "User registered successfully",

        //sending the below user data back to the browser as soon as a user is verified is not a requirement, but we do it bcs it might be helpful to the frontend. maybe the frontend will display this data as: `Hello ${fullName}!`
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            // IMPORTANT: we never send password to the frontend. The password is sensitive authentication information and the client has no legitimate reason to receive the stored password hash.
        },
    });
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password",
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password",
        });
    }

    const token = jwt.sign(
        {
            _id: user._id,
            role: "user",
        },
        process.env.JWT_SECRET,
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        },
    });
}

//async not needed since nothing to await
function logoutUser(req, res) {
    //if we clear the cookie on the browser then the session will get disconnected/closed
    res.clearCookie("token");

    //and after successfully clear the cookie send the following
    res.status(200).json({
        message: "User successfully logged out",
    });
}

async function registerFoodPartner(req, res) {
    const { name, email, password, contactName, phone, address } = req.body;

    if (
        ![name, email, password, contactName, phone, address].every((value) =>
            String(value || "").trim(),
        ) ||
        password.length < 8
    ) {
        return res.status(400).json({
            message:
                "All fields are required, including a password of at least 8 characters",
        });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const isAccountAlreadyExists = await foodPartnerModel.findOne({
        email: normalizedEmail,
    });

    if (isAccountAlreadyExists) {
        return res.status(400).json({
            message: "Food Partner Account already exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        contactName: contactName.trim(),
        phone: phone.trim(),
        address: address.trim(),
    });

    const token = jwt.sign(
        {
            _id: foodPartner._id,
            role: "foodPartner",
        },
        process.env.JWT_SECRET,
    );

    res.cookie("token", token);

    res.status(201).json({
        message: "Food Partner successfully registered!",
        foodPartner: {
            _id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email,
            contactName: foodPartner.contactName,
            phone: foodPartner.phone,
            address: foodPartner.address,
        },
    });
}

async function loginFoodPartner(req, res) {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const foodPartner = await foodPartnerModel.findOne({
        email: email.trim().toLowerCase(),
    });

    if (!foodPartner) {
        return res.status(400).json({
            message: "Email or Password is invalid.",
        });
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Email or Password is invalid.",
        });
    }

    const token = jwt.sign(
        {
            _id: foodPartner._id,
            role: "foodPartner",
        },
        process.env.JWT_SECRET,
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "Food Partner successfully logged in!",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name,
        },
    });
}

//async not needed since nothing to await
function logoutFoodPartner(req, res) {
    res.clearCookie("token");

    res.status(200).json({
        message: "Food Partner successfully logged out",
    });
}

// function getCurrentUser(req, res) {
//     res.status(200).json({
//         message: "Current user fetched successfully",
//         user: req.user,
//     });
// }

// async function getCurrentFoodPartner(req, res) {
//     res.status(200).json({
//         message: "Current food partner fetched successfully",
//         foodPartner: req.foodPartner,
//     });
// }

function getCurrentAccount(req, res) {
    res.status(200).json({
        message: "Current account fetched successfully",
        accountType: req.auth.accountType,
        account: req.auth.account,
    });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
    getCurrentAccount,
};
