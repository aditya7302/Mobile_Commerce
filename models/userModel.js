const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    phone:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    address:{
        state:{
            type:String,
            required: true,
          },
          city:{
            type: String,
            required: true,
          },
          pin_code:{
            type:String,
            required: true,
          },
          street:{
            type: String,
            required: true,
          }
    },
    role:{
        type: Number,
        default: 1,
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("user",userSchema);