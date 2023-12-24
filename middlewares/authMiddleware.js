const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');

//protected route
const requireSignIn = async (req, res, next) => {
    try{
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch(error){
        res.status(404).send({
            success: false,
            message: "User is not signed in"
        })
    }
}

//admin access
const isAdmin = async (req,res,next) => {
    try{
        const user = await userModel.findById(req.user._id);
        if(user.role!==2){
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access",
            })
        }
        else{

            next();
        }
    }catch(error){
        res.status(500).send({
            success: false,
            message: "Error in admin middleware"
        })
    }
}

module.exports = {
    requireSignIn,
    isAdmin
}