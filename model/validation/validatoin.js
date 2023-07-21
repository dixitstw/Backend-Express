const {check, validationResult} = require('express-validator')

exports.categoryCheck = [
    check('category_name', "Cateegory name is required.").notEmpty()
    .isLength({min:3, max: 20}).withMessage('category name must be between 3 and 20 characters.')
]

exports.productCheck = [
    check('product_name', "Product name is required.").notEmpty()
    .isLength({min:3, max: 20}).withMessage('product name must be between 3 and 20 characters.'),

     check('product_price', "Product price is required.").notEmpty()
     .isNumeric().withMessage("Price must be a number"),

     check('count_in_stock', "Count in stock is required,").notEmpty()
     .isNumeric().withMessage("Count in stock must be a number"),

     check('product_description', "Product description is required").notEmpty()
     .isLength({min: 25}).withMessage("Description must be atleast 25 characters."),

     check('category', "Category is required.").notEmpty()
]

exports.userCheck = [
    check('username', 'Username is required').notEmpty()
    .isLength({min: 3}).withMessage("Username must be atleast 3 characters.")
    .isLength({max: 30}).withMessage("Username must be under 30 characters."),

    check('email', "Email is required").notEmpty()
    .isEmail().withMessage("Email format incorrect."),

    check('password', "Password is required").notEmpty()
    .not().isIn(['asdf1234', 'password', 'kathmandu']).withMessage("Cannot use common words for password.")
    .matches(/[A-Z]/).withMessage("Password must contain atleast one uppercase alphabet.")
    .matches(/[a-z]/).withMessage("Password must contain atleast one lowercase alphabet.")
    .matches(/[0-9]/).withMessage("Password must contain atleast one number.")
    .matches(/[!@#$+_-]/).withMessage("Password must contain atleast one special character.")
    .isLength({min: 8, max: 20}).withMessage("Password must be between 8-20 characters.")
]

exports.validationCheck = (req, res, cb)=> {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
    return res.status(400).json({error: errors.array()[0].msg})
    }
    cb()
}