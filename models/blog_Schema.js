const mongoose = require('mongoose')

const blog_Schema =new mongoose.Schema ({
    user_Id : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "user"
    },
    title : {
        type : String,
        require : true 
    },
    description : {
        type : String,
        requre : true 
    },
    status : {
        type : Boolean,
        default : true
    },
    likes : {
        type : Number,
        default : 0,
        require : true
    },
    is_Active : {
        type : Boolean,
        default : true
    },
    blog_Pic : {
        type : String,
        require : true
    }
})

blog_Schema.set("timestamps", true)

module.exports = mongoose.model("blog", blog_Schema)