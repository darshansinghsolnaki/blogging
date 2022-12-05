const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')
const commentAuth = require('../middleware/auth_middleware')

router.post('/create',commentAuth.checkUserAuth, commentController.create )

module.exports = router
