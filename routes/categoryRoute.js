const express = require('express')
const { addCategory, getAllCategories, getCategoryDetails, updateCategory, deleteCategory } = require('../controller/categoryController')
const { authorize } = require('../controller/userController')
const router = express.Router()

router.post('/addcategory', authorize, addCategory)
router.get('/getallcategories', getAllCategories)
router.get('/getCategoryDetails/:id', getCategoryDetails)
router.put('/updatecategory/:id', authorize ,updateCategory)
router.delete('/deletecategory/:id', authorize, deleteCategory)
module.exports = router