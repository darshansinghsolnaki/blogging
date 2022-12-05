// const bcrypt = require('bcrypt')
// const user_Schema = require('../models/user_Schema')

// const userSignup = async (req, res) => {
//     const userData = await user_Schema(req.body)
//     try {
//         // const salt = await bcrypt.genSalt(10)
//         // userData.password = await bcrypt.hash(password, salt)
        
//         const sinsep = await userData.save()

//         res.json(sinsep)
//     } catch (error) {
//         res.send({
//             status : 400,
//             message : "failed"
//         })
//     }

// }

// module.exports = { userSignup}




  // userlogin : joi.object ({
    //     email : joi.string().min(10).max(20).message("user email is required").required(),
    //     password : joi.string().min(6).max(10).message("user password is required").required()
    // }).unknown(true)




    // userLogValSchema : async (req, res, next) => {
//     const value = await user_schema.userlogin.validate(req.body, {abortEarly : false })
//     if(value.error){
//         res.send({
//             stattus : 400,
//             message : value.error.details[0].message
//         })
//     }else{
//         console.log("===>>", value);
//         next()
//     }
// }





// const log = async (req, res) => {
//   const userCheck = new user_schema(req.body)
//   console.log(req.body.email);
//   try {
//       if(userCheck != null){
//           const exists = await user_schema.findOne({ email : userCheck.email })
//           //exists database se check kare ge 
//           if(exists != null){
//               const isMatch = await bcrypt.compare(userCheck.password, exists.password)
//               console.log("====isMatch>>>", isMatch);
//               if(userCheck.email === exists.email && isMatch){
//                   const token = jwt.sign({ userID : exists._id},process.env.JWT_SECRET_KEY)
//                   const userShow = await user_schema.find({ email : userCheck.email}).select('-password')
//                   return res.json({
//                       status : 200,
//                       message : "User Login Successfull",
//                       "token" : token,
//                       userData : userShow
//                   })
//               }else{
//                   res.json({
//                       status : 200,
//                       message : "user password is not corected"
//                   })
//               }
//           }else{
//               res.send({
//                   status : 400,
//                   message : "Please inter email and password"
//               })
//           }
//       }
//   } catch (error) {
//       res.send({
//           status : 400,
//           message : error.message
//       })
//   }
// }




// const logIn = async (req, res) => {
//   const userCheck = new user_schema(req.body)
//   console.log(userCheck);
//   try {
//       if(userCheck != null){
//           const exists = await user_schema.findOne({ email : userCheck.email})
//           const isMatch = await bcrypt.compare(userCheck.password, exists.password)
//         if(isMatch ){    
//           //  console.log("valid");
//           if(userCheck.email === exists.email && isMatch){
//               const token = jwt.sign({userID : exists._id}, process.env.JWT_SECRET_KEY)
//               const userShow = await user_schema.find({ email : userCheck.email}).select('password')
//               res.send({
//                   status : 200,
//                   message : "Log in succesfull",
//                   "token" : token,
//                   userData : userShow
//               })
//           }
//           }
//         else{
//            console.log("password is not coreected")
//           }
//       }else{
//           res.send({
//               status : 400,
//               message : "user email is not corrected",
//           })
//       }
      
//   } catch (error) {
//       res.send({
//           status : 400,
//           message : error.message
//       })
//   }
// }





// const blog_Schema = require('../models/blog_Schema')

// const create = async (req, res) => {
//     const blogData = new blog_Schema(req.body)
//     try {
//         const blogResult = await blogData.save()
//         res.json(blogResult)
//     } catch (error) {
//         res.send({
//             status : 400,
//             message : error.message
//         })
//     }
// }

// const blogList = async (req, res) => {
//     try {
//         const listData = await blog_Schema.find(req.body)
//         const counted = await blog_Schema.count()
//         res.send({
//             status : 200,
//             message : "Blod list ",
//             "Counted" : counted,
//             "ListData "  : listData
//         })
//     } catch (error) {
//         res.send({
//             status : 400,
//             message : error.message
//         })
//     }
// }


// const updateapi = async (req, res) => {
//     try {
//         const updateData = await blog_Schema.findByIdAndUpdate(req.params.id, req.body)
// res.send({
//     status : 200,
//     message : " Data Update Successfully",
//     "updateData" : updateData
// })
//     } catch (error) {
//         res.json({
//             status : 400,
//             message : error.message
//         })
//     }
// }

// const deleteBlog = async (req, res) => {
//     try {
//         const deleteData = await blog_Schema.findByIdAndDelete(req.params.id)
//         res.send({
//             status : 200,
//             message : "Data Delete Succesfully"
//         })
    
//     } catch (error) {
//         res.json({
//             status : 400,
//             message : error.message
//         }) 
//     }
// }

// module.exports = { create, blogList, updateapi, deleteBlog }


// const listData = await blog_Schema.find({}).populate('user_Id', (name:1, _id:0)); 



// const user_schema = require('../models/user_Schema')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const { transporter } = require('../service/mailService')

// const signUp = async (req, res) => {
//     const { email, password } = req.body
//     const userData = new user_schema(req.body)
//     try {
//         if (userData != null) {
//             const userExist = await user_schema.findOne({ email:email })
//             if (userExist != null) {
//                 res.status(403).json({
//                     status: 403,
//                     message: "User alredy Exists"
//                 })
//             }
//         }
//         const salt = await bcrypt.genSalt(10)
//         userData.password = await bcrypt.hash(password, salt)
//         const filepath = `/uploads${req.file.filename}`
//         userData.profile_Pic = filepath
//         const addRes = await userData.save();
//     return res.status(201).json({
//         status : 200,
//         message : "User Created Succesfully"
//     })
//     } catch (error) {
//         res.status(500).json({
//             status : 500,
//             message : error
//         })

//     }
// }


// const logIn = async (req, res) => {
//     const userCheck = new user_schema(req.body)
//     try {
//         if (userCheck != null) {
//             const exists = await user_schema.findOne({ email: userCheck.email })
//             //exists database se check kare ge 
//             if (exists != null) {
//                 const isMatch = await bcrypt.compare(userCheck.password, exists.password)
//                 if (userCheck.email === exists.email && isMatch) {
//                     const token = jwt.sign({ userID: exists._id }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" })
//                     const userShow = await user_schema.find({ email: userCheck.email }).select('-password')
//                     return res.json({
//                         status : 200,
//                         message : "User Login Successfull",
//                         "token" : token,
//                         // "userData" : userShow
//                     })
//                 } else {
//                     res.json({
//                         status : "Password",
//                         message : "User password is not correct"
//                     })
//                 }
//             } else {
//                 res.send({
//                     status : "Email",
//                     message : "User email is not correct"
//                 })
//             }
//         }
//     } catch (error) {
//         res.status(500).json({
//             status : 500,
//             message : error.message
//         })
//     }
// }

// const emailResetPassword = async (req, res) => {
//     // console.log("====>>>>", req.user);
//     const { email } = req.body 
//     if(email){
// const user = await user_schema.findOne({ email : email })
// if(user){
//     const secret = user._id + process.env.JWT_SECRET_KEY
//     const token = jwt.sign({userID : user._id}, secret, 
//         { expiresIn : "10m"})
// const link = `http://127.0.0.1:3000/api/user/reset${user._id}/${token}`
// let info = await transporter.sendMail({
//     from : "rinkesh270698@gmail.com",
//     to : email ,
//     subject : "This is th password reset link only for 10 minutes ",
//     text : `<a href= ${link}>Click here to reset password </a>`
// })
// res.send({
//     status : 200,
//     message : "password reset email check your email  "
// })
// }else{
//     res.send({
//         status : 400,
//         message : "user email require"
//     })
// }
//     }else{
//         res.send({
//             status : 400,
//             message : "usre email not found"
//         })
//     }
// }

// const userResetPassword = async (req, res) => {
//         const { password, conform_password } = req.body
//         const { id, token } = req.params
//         const user = await user_schema.findById(id)
//         const new_secret = user._id + process.env.JWT_SECRET_KEY
//         try {
//             jwt.verify(token, new_secret)
//             if (password && conform_password) {
    
//                 if (password !== conform_password) {
//                     return res.send({
//                         "status": "Failed",
//                         "message": "password and conform password should be same "
//                     })
//                 } else {
//                     const salt = await bcrypt.genSalt(10);
//                     const new_password = await bcrypt.hash(password, salt);
//                     await user_schema.findByIdAndUpdate(user._id, { $set: { password: new_password } })
//                     res.send({
//                         "status": "success",
//                         "message": "Password Reset Succesfully"
//                     })
//                 }
//             } else {
//                 res.send({
//                     "status": "Failed",
//                     "message": "All Field Are Required"
//                 })
//             }
//         } catch (error) {
//             res.send({
//                 status :400,
//                 message : error.message
//             })
//         }
//     }


// module.exports = {
//     signUp, logIn, emailResetPassword, userResetPassword
// }




// // const commentlist = async (req, res) =>{
// //     const id = req.body.id
// //     try {
// //         const listData = await comment_Schema.find(id).sort({"createdAt" :-1}).populate( "user_Id", {name:1, _id:0 })
// //         const counted = await comment_Schema.count()
// //         res.send({
// //             status : 200,
// //             "Counted" : counted,
// //             "liadtData" : listData
// //         })
// //     } catch (error) {
        
// //     }
// // }