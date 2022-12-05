const joi = require('@hapi/joi')
joi.objectid = require('joi-objectid')(joi)

const blogSchema = {
    addBlog : joi.object ({
        title : joi.string().min(2).max(25).required(),
        description : joi.string().min(10).max(200).required(),
        status : joi.boolean().required(),
        user_Id : joi.objectid().required()
    }).unknown(true),

     updateBlog : joi.object({
        title : joi.string().min(2).max(15).required(),
        description : joi.string().min(10).max(200).required(),
        status : joi.boolean().required(),
    }).unknown(true)
    
}

module.exports = blogSchema;