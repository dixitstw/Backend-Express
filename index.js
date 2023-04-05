const express = require('express')
require('dotenv').config()
require('./connection')
const bodyParser = require('body-parser')
const morgan = require('morgan')

//routes
const TestRoute = require('./routes/testroute')
const CategoryRoute = require('./routes/categoryRoute')
const ProductRoute = require('./routes/productRoute')
const UserRoute =require('./routes/userRoute')
const OrderRoute = require('./routes/orderRoute')

//creating an app using express
const app = express()

app.use(bodyParser.json())
app.use(morgan('dev'))
//starting server

let port = process.env.PORT
app.listen(port, ()=>{
    console.log(`APP STARTED AT PORT ${port}`)
})


//using routes
app.use(TestRoute)
app.use('/category', CategoryRoute)
app.use('/product', ProductRoute)
app.use('/user', UserRoute)
app.use('/order', OrderRoute)