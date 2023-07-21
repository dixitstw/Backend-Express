const express = require('express')
require('dotenv').config()
require('./connection')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
//routes
const TestRoute = require('./routes/testroute')
const CategoryRoute = require('./routes/categoryRoute')
const ProductRoute = require('./routes/productRoute')
const UserRoute =require('./routes/userRoute')
const OrderRoute = require('./routes/orderRoute')
const PaymentRoute = require('./routes/paymentRoutes')
//creating an app using express
const app = express()

app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
//starting server

let port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`APP STARTED AT PORT ${port}`)
})


//using routes
app.use(TestRoute)
app.use(CategoryRoute)
app.use(ProductRoute)
app.use(UserRoute)
app.use(OrderRoute)
app.use('/public/uploads', express.static('public/uploads'))
app.use(PaymentRoute)