const blog_Schema = require('../models/blog_Schema')
const comment_Schema = require('../models/comment_Schema')

const addBlog = async (req, res) => {
    const blogData = new blog_Schema(req.body)
    try {
        const filpath = `/uploads${req.file.filename}`
        blogData.blog_Pic = filpath
        const blogResult = await blogData.save()
        res.status(201).json({
            status : 201,
            message : "Blog Add Succesfully"
        })
    } catch (error) {
        res.send({
            status : 500,
            message : error.message
        })
    }
}

const blogList = async (req, res) => {
    try {
        const blogList = await blog_Schema
        .find({})
        .populate('user_Id', {name:1}).sort({"createdAt" : -1 })  // object form me dada ke liye lean() use karte hai
        res.status(200).json({
            status: "Success",
            "listData" : blogList
        })
    } catch (error) {
        res.send({
            status : 500,
            message : error.message
        })
    }
}

const myBlogDetails = async (req, res) => {
    const id = req.params.id
    try {
        const userBlog = await blog_Schema.findById(id,{ title:1, description:1,blog_Pic:1, _id:0})
        const userComment = await comment_Schema.find({ blog_Id : id}).sort( {"createdAt" : -1 }).populate('user_Id', {name:1,profile_Pic:1,createdAt:1, _id:0})
        res.status(200).json({
            status : "Success",
            "blogs": userBlog,
            "comments" : userComment
        })
    } catch (error) {
        res.send({
            status : 500,
            message : error.message
        })
    }
}

const myBlog = async (req, res) =>{
    const { id }  = req.params
    console.log(id);
    try {
        const blogData = await blog_Schema.find({user_Id: id})
        // const myblogcount = await blog_Schema.find({user_Id: id}).count()
        res.json({
            status : 200,
            // "myblogcount" : myblogcount,
            "myBlog" : blogData
        })
    } catch (error) {
        res.send({
            status : 400,
            message : error.message
        })
    }
}

const updateBlog = async (req, res) => {
    try {
        const updateData = await blog_Schema.findByIdAndUpdate(req.params.id, req.body, {new : true})
        res.send({
            status : 200,
            message : "Blog Updated"
            // "updateData" : updateData,
        })
    } catch (error) {
        res.send({
            status : 200,
            message : error.message
        })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const deleteData = await blog_Schema.findByIdAndDelete(req.params.id)
        res.status(202).json({
            status : 202,
            message : "Blog Delete Successfully "
        })
    } catch (error) {
        res.send({
            statsu : "Failed",
            message : error.message
        })
    }
}

const likes = async (req, res) => {
    const { id, likes} = req.params
    console.log(typeof likes);
    // console.log('===>>', id, "and" ,likes)
    try {
            const blogLikes = await blog_Schema.findById(id).select('likes')
            // console.log("bloglikes",blogLikes);
               if(likes === 'true') {
                  let like1 = blogLikes.likes
                    like1++
                //   console.log("like increament",like1);
                  const likeUpdate = await blog_Schema.findByIdAndUpdate(blogLikes._id, {$set : { likes : like1 }}, {new : true})
                    res.json({
                        status : 200,
                        message : "like successful",
                        // "Message" : likeUpdate
                    })
                }else{
                    let like1 = blogLikes.likes
                    like1--
                    const likeUpdate = await blog_Schema.findByIdAndUpdate(blogLikes._id, {$set : { likes : like1 }}, {new : true})
                    res.json({
                        status : 200,
                        message : "Diclike successfull",
                        // "Message" : likeUpdate
                    })         
                    // console.log("like decreament",like1);
                }
    } catch (error) {
        res.status(500).json({
            statsu : 500,
            message : error.message
        })
    }
}

module.exports = { addBlog, blogList, myBlogDetails, myBlog, updateBlog, deleteBlog, likes }
