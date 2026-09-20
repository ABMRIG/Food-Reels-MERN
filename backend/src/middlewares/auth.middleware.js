const foodPartnerModel = require("../models/foodPartner.model")
const userModel = require("../models/user.model")

const jwt = require("jsonwebtoken")

//this middleware is responsible to authenticate the current client. it verifies the token, identifies whether the authenticated account is a user or food partner, fetches the account details and makes them available to all the other middlewares that come next to it through the req.auth object

async function authenticate(req, res, next) {
    //Cookies are not part of req.body, it resides in the Header

    //first grab the cookie from the REQUEST HEADER and access the token
    const token = req.cookies.token;

    //first we check if we got any token at all
    if (!token) {

        return res.status(401).json({

            message: "Please login first"

        })

    }

    //IMPORTANT: why "try-catch" in middleware but not in middleware:

    /*In JWT authentication middleware, asynchronous operations and external library methods can throw unexpected errors:

    jwt.verify(...) throws an error if the token is expired, tampered with, invalidly formatted, or signed with a different secret key. Without a try...catch block, an invalid token will throw an unhandled exception and crash your Node.js application server.

    await userModel.findById(...) or await foodPartnerModel.findById(...) can throw a database connection error or a Mongoose casting error if the ID string isn't a valid 24-character hexadecimal format.

    Wrapping this in try...catch ensures that any invalid token or database error is caught gracefully and returns a clean HTTP response:*/

    //now we check if the token is legit or not*
    try {
        //if the token is legit then the "_id" and "role" in the cookies will get assigned to "decodedToken" variable
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        let account;

        //now we use the role stored inside the signed JWT to determine
        //which model we should use to find the authenticated account*
        if (decodedToken.role === "user") {
            account = await userModel
                .findById(decodedToken._id)
                .select("-password");
        }

        else if (decodedToken.role === "foodPartner") {
            account = await foodPartnerModel
                .findById(decodedToken._id)
                .select("-password");
        }

        else {
            return res.status(401).json({
                message: "Invalid account type"
            })

        }

        //the token can be valid but the account may no longer exist in the database

        if (!account) {
            return res.status(401).json({
                message: "Account not found"
            })
        }

        //req and res are objects so we are attaching the authenticated account
        //details to the "req" object by creating a new key-value pair in the following way

        req.auth = {
            accountType: decodedToken.role,
            account: account
        };

        //now go to the next middleware*

        next();
    }

    catch (err) {
        return res.status(401).json({
            message: `Invalid token :: ${err.message}`
        })

    }

}


//this middleware is responsible to check if the authenticated account has the required role to access the current route
function requireRole(requiredRole) {
    
    return function (req, res, next) {
        //first we check if the person is at all logged in, if not then req,auth will be
        if (!req.auth) {
            return res.status(401).json({
                message: "Please login first"
            })
        }

        //now we check if the current role and required role is same or not, if not then access is denied
        if (req.auth.accountType !== requiredRole) {
            return res.status(403).json({
                message: `${requiredRole} access required`
            })
        }

        //so finally we are left with roles are matching so we simply go next()
        next();

    }
}


module.exports = {
    authenticate,
    requireRole
}