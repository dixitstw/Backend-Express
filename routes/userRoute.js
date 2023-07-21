const express = require('express')
const { register, verifyUser, resendVerification, signIn, signOut, forgetPassword, resetPassword, getUserDetails, getAllUsers, getUserByEmail, getUserList, toggleRole, authorize } = require('../controller/userController')
const { validationCheck, userCheck } = require('../model/validation/validatoin')
const router = express.Router()

router.post('/register', userCheck, validationCheck, register)
router.get('/verification/:token', verifyUser)
router.post('/resendverification', resendVerification)
router.post('/signin', signIn)
router.get('/signout', signOut)
router.post('/forgetpassword', forgetPassword)
router.post('/resetpassword/:token', resetPassword)
router.get('/getuserdetails/:id', getUserDetails)
router.get('/getuserlist', getUserList)
router.get('/togglerole/:id', authorize, toggleRole)


//user list
//user detail
//find user by email
//find user by username
//update user
//delete user

module.exports = router