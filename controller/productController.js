const Product = require('../model/ProductModel')

//add product
exports.addProduct = async(req, res)=> {
    if(!req.file){
        return res.status(400).json({error: "Product image is required."})
    }

    let productToAdd = new Product({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        count_in_stock: req.body.count_in_stock,
        product_image: req.file.path,
        category: req.body.category
    })
    productToAdd = await productToAdd.save()
    if(!productToAdd) {
        return res.status(400).json({error: "Something went wrong"})
    }
    res.send(productToAdd)
}

//to get all products
exports.getAllProducts = async(req, res)=>{
let products = await Product.find().populate('category', 'category_name')
if(!products){
    return res.status(400).json({error: "Something went wrong"})
}
res.send(products)
}

//to get product details
exports.getProductDetails = async(req, res)=>{
    let products = await Product.findById(req.params.id).populate('category', 'category_name')
    if(!products){
        return res.status(400).json({error: "Something went wrong"})
    }
    res.send(products)
    }

// to get products of a category
exports.getProductsByCategory = async(req, res) => {
    let products = await Product.find({category: req.params.id}).populate('category', 'category_name')
    if(!products){
        return res.status(400).json({error: "Something went wrong"})
    }
    res.send(products)
    }

// to update product
exports.updateProduct = async(req, res) =>{
    let productToUpdate = await Product.findByIdAndUpdate(
        req.params.id,
        req.file ?
        {
            product_name: req.body.product_name,
            product_price: req.body.poduct_price,
            product_description: req.body.product_description,
            count_in_stock: req.body.count_in_stock,
            product_image: req.file.path,
            category: req.body.category,
            rating: req.body.rating 
        }: {
            product_name: req.body.product_name,
            product_price: req.body.poduct_price,
            product_description: req.body.product_description,
            count_in_stock: req.body.count_in_stock,
            category: req.body.category,
            rating: req.body.rating 
        },
        {new: true}     
        )
        if(!productToUpdate) {
        return res.status(400).json({error: "Something went wrong."})
        }
        res.send(productToUpdate)
}

//to get filtered products
exports.getFilteredProducts = async(req, res) => {
    let filter = {}
    for(let key in req.body.filter) {
        if(req.body.filter[key].length > 0){
        if(key === 'category') {
            filter[key] = req.body.filter[key]
        }
        else {
            filter[key] = {
                $gte : req.body.filter[key][0],
                $lte : req.body.filter[key][1]
            }
        }
    }
    }
    let products = await Product.find(filter)
    if(!products) {
        return res.status(400).json({error: "Something went wrong"})
    }
    res.send(products)
}

//to get related products
exports.getRelatedProducts = async(req, res) => {
    let product = await Product.findById(req.params.id)
    if(!product){
        return res.status(400).json({error: "Somthing went wrong"})
    }
    let relatedProducts = await Product.find({
        category: product.category,
        _id: {$ne: product._id}
    })
    if(!relatedProducts) {
        return res.status(400).json({error: "Something went wrong"})
    }
    res.send(relatedProducts)
}