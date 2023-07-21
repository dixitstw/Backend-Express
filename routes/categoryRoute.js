const express = require('express')
const { addCategory, getAllCategories, getCategoryDetails, updateCategory, deleteCategory } = require('../controller/categoryController')
const { authorize } = require('../controller/userController')
const { categoryCheck, validationCheck } = require('../model/validation/validatoin')
const router = express.Router()

router.post('/addcategory', authorize, categoryCheck, validationCheck, addCategory)
router.get('/getall', getAllCategories)
router.get('/getCategoryDetails/:id', getCategoryDetails)
router.put('/updatecategory/:id', authorize , categoryCheck, validationCheck, updateCategory)
router.delete('/deletecategory/:id', authorize, deleteCategory)
module.exports = router