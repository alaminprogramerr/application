const express= require('express')
const applicationRouter= express.Router()
const applicationController= require('../controller/applicationController')
const img_uploader= require('../util/img_uploader')

const userController = require('../controller/userController')
// upload.single('file')
applicationRouter.get('/all',applicationController.readApplication)
applicationRouter.post('/create',img_uploader.single('file'),applicationController.createApplication)
applicationRouter.get('/delete/:id',applicationController.deleteApplication)
applicationRouter.post('/edit',applicationController.editApplication)
applicationRouter.get('/single/:id',applicationController.getSingle)


applicationRouter.post('/signup',userController.register)
applicationRouter.post('/login',userController.login)

module.exports=applicationRouter