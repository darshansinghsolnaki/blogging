const mongoose = require('mongoose')

const comment_Schema = new mongoose.Schema({
    user_Id : {
        type : mongoose.Schema.Types.ObjectId,
        require : true ,
        ref : "user"
    },
    blog_Id : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "blog"
    },
    comment : {
        type : String,
        require : true
    },
    is_Active : {
        type : Boolean,
        default : true
    }
})

comment_Schema.set("timestamps", true)

module.exports = mongoose.model("comment", comment_Schema)