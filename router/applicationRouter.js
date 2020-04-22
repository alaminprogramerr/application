const express= require('express')
const applicationRouter= express.Router()
const img_uploader= require('../util/img_uploader')
const userController = require('../controller/userController')


applicationRouter.post('/signup',img_uploader.single('file'),userController.register)
applicationRouter.post('/login',userController.login)
applicationRouter.get('/all-user', userController.allUser)
applicationRouter.post('/add-bookmark', userController.addBookmark)
applicationRouter.post('/bookmarked-user', userController.bookmarkedUser)
applicationRouter.post('/unbookmarked-user', userController.unBookmarkedUser)
module.exports=applicationRouter