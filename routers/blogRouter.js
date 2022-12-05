const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')
const blogValidation= require('../validation/blog/blogValidation')
const {upload} = require('../middleware/imgStorage')
const blogAuth = require('../middleware/auth_middleware')


router.post('/add',blogAuth.checkUserAuth, upload.single("blog_Pic"), blogValidation.blogValSchema, blogController.addBlog)
router.get('/list',blogAuth.checkUserAuth, blogController.blogList)
router.get('/Details/:id',blogAuth.checkUserAuth, blogController.myBlogDetails)
router.get('/myblog/:id',blogAuth.checkUserAuth, blogController.myBlog)
router.patch('/updateblog/:id',blogAuth.checkUserAuth, blogController.updateBlog)
router.delete('/deleteblog/:id',blogAuth.checkUserAuth, blogController.deleteBlog)
router.get('/blog-like/:id/:likes',blogAuth.checkUserAuth, blogController.likes)

module.exports = router
