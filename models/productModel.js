const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        requried: true
    },
    slug:{
        type: String,
        required: true,
    },
    company:{
        type: String,
        required: true,
    },
        RAM :{
            type: String,
            required: true,
        },
        ROM:{
            type: String,
            required: true
        },
        front_camera :{
            type: String,
            required: true,
        },
        back_camera:{
            type: String,
            required: true
        },
    screen:{
        type: String,
        required: true
    },
    battery:{
        type: String,
        required: true
    },
    processor:{
        type: String,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String,
      },
},{
    timestamps: true
})

module.exports = mongoose.model("product",productSchema);