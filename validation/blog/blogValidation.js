const blog_schema = require('./blogSchema')

module.exports ={
   blogValSchema: async (req, res, next) => {
        
        const value = await blog_schema.addBlog.validate(req.body, { abortEarly : false })
        if (value.error) {
            res.send({
                status : 400,
                message : value.error.details[0].message
            })
        } else {
            // console.log("===>>", value);
            next()
        }
    },

    updateBlogValSchema : async (req, res, next) => {
        const value = await blog_schema.updateBlog.validate(req.body, {abortEarly : false})
        if(value.error){
            res.send({
                status : 400,
                message : value.error.details[0].message
            })
        }else{
            next()
        }
    }

}