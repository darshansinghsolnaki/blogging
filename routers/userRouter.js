const express = require('express')
const router = express.Router()
const user = require('../controllers/userController')
const userValidation = require('../validation/user/userValidation')
const {upload} = require('../middleware/imgStorage')
const userAuth = require('../middleware/auth_middleware')

router.post('/signup',upload.single("profile_Pic"), userValidation.userValSchema, user.signUp)
router.post('/login',userValidation.userLogValSchema, user.logIn)
router.get('/auth',userAuth.checkUserAuth,)
router.post('/resetPasswordemail', userAuth.checkUserAuth, user.emailResetPassword)
router.post('/userResetPassword/:id/:token', user.userResetPassword)
module.exports = router
