const mongoose = require('mongoose')

const user_Schema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true 
    },
    profile_Pic : {
        type : String,
        require : true
    },
    city : {
        type : String,
        require : true
    },
    state : {
        type : String,
        require : true
    },
    status : {
        type : Boolean,
        default : true
    },
    // mobile_No : {
    //     type : Number,
    // },
    is_Active : {
        type : Boolean,
        default : true 
    },
    role : {
        type : String,
        default : "user",
        require : true
    }
})

user_Schema.set("timestamps", true)

module.exports = mongoose.model("user", user_Schema)
