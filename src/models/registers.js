const mongoose = require('mongoose');

const userDetails = new mongoose.Schema({
    email : {
        type:String,
        required:true,
        unique:true
    },
    username : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    }
})

const Register = new mongoose.model("Register", userDetails);

module.exports = Register;