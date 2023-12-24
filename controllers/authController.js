const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const JWT = require('jsonwebtoken')

//post register user
const registerUserController = async (req,res) => {
    try{
        const {name, phone, email, address, password, role} = req.body;

        if(!name){
            return res.send({
                message: "Error Name is Required"
            })
        }
        if(!phone){
            return res.send({
                message: "Error Phone is Required"
            })
        }
        if(!email){
            return res.send({
                message: "Error email is Required"
            })
        }
        if(!address.state){
            return res.send({
                message: "Error State is required"
            })
        }
        if(!address.city){
            return res.send({
                message: "Error City is required"
            })
        }
        if(!address.pin_code){
            return res.send({
                message: "Error Pin-Code is required"
            })
        }
        if(!address.street){
            return res.send({
                message: "Error Street is required"
            })
        }
        if(!password){
            return res.send({
                message: "Error Password is Required"
            })
        }
        if(!role){
            return res.send({
                message: "Error Role is Required"
            })
        }

        //existing user
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: "Error a user already exists with given email-id"
            })
        }

        //hashing password
        const hashed = await hashPassword(password);

        //save the user
        const user = await new userModel({
            name, 
            phone, 
            email, 
            address :{
                state: address.state,
                city: address.city,
                pin_code: address.pin_code,
                street: address.street
            },
            password : hashed, 
            role
        }).save();

        return res.status(201).send({
            success: true,
            message: "User successfully Registered",
            user
        })

    }catch(error){
        res.status(500).send({
            success: false,
            message: "Error while registering the user",
            error
        })
    }
}

//post login user
const loginUserController = async (req,res) => {
    try{
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(404).send({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message: "No user found"
            })
        }

        const match = await comparePassword(password, user.password);

        if(!match){
            return res.status(404).send({
                success: false,
                message: "Invalid Login Credentials"
            })
        }

        //token
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '2d',
        })

        return res.status(200).send({
            success: true,
            message: "Login Successfull",
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while Login",
        })
    }
}

module.exports = {
    registerUserController,
    loginUserController
}