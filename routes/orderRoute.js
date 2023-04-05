const express = require('express')
const { placeOrder, getAllOrders, getOrderDetails, getOrdersOfUser, updateOrder, deleteOrder } = require('../controller/orderController')
const router = express.Router()

router.post('/placeorder', placeOrder)
router.get('/getallorders', getAllOrders)
router.get('/getorderdetaill/:orderId', getOrderDetails)
router.get('/userorders/:userId', getOrdersOfUser)
router.put('/updateorder/:orderId', updateOrder)
router.delete('/deleteorder/:orderId', deleteOrder)


module.exports = router