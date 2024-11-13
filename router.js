//import express
const express = require('express')
//import userController
const userController = require('./Controllers/userController')

//import addproject controller
const projectController = require('./Controllers/projectController')

//import jwt middleware
const jwtMiddleware = require('./middleware/jwtMiddleware')

//import multer
const multerConfig = require('./middleware/multerMiddleware')
const multer = require('multer')

//instance router
const router = new express.Router()

//Register
router.post('/register',userController.register)

//login
router.post('/login',userController.login)

//add project
router.post('/add-project',jwtMiddleware,multerConfig.single("projectImage"),projectController.addProjectController)

//all project
router.get('/all-project',jwtMiddleware,projectController.getAllProjectController)

//home project
router.get('/home-project',projectController.getHomeProjectController)

//user projects
router.get('/user-project',jwtMiddleware,projectController.getUserProjectController)

//remove user project
router.delete('remove-userproject/:id',jwtMiddleware,projectController.removeUserProjectController)

//update user project
router.put('/update-userProject/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProjectController)

//update user profile
router.put('/update-userProfile',jwtMiddleware,multerConfig.single('profile'),userController.editProfileController)

module.exports = router