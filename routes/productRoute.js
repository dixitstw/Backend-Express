const express = require('express')
const { addProduct, getAllProducts, getProductByCategory, getProductsByCategory, updateProduct, getProductDetails, getFilteredProducts, getRelatedProducts } = require('../controller/productController')
const { authorize } = require('../controller/userController')
const { productCheck, validationCheck } = require('../model/validation/validatoin')
const upload = require('../utils/fileUpload')
const router = express.Router()

router.post('/addproduct', upload.single('product_image'), authorize,productCheck, validationCheck, addProduct)
router.get('/getallproducts', getAllProducts)
router.get('/getproductsbycategory/:id', getProductsByCategory)
router.get('/getproductdetails/:id', getProductDetails)
router.put('/updateproduct/:id', authorize, updateProduct)
router.post('/getfilteredproducts', getFilteredProducts)
router.get('/getrelatedproducts/:id', getRelatedProducts)

// product detail
// delete product

module.exports = router