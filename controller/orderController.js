let Order = require('../model/OrderModel')
let OrderItems = require('../model/OrderItems')

//place order
exports.placeOrder = async(req, res) => {
    let orderItemsIds = await Promise.all(req.body.orderItems.map(async orderItem => {
        let orderItemToSave  = new OrderItems({
            products: orderItem._id,
            quantity: orderItem.quantity
        })
        orderItemToSave = await orderItemToSave.save()
        if(!orderItemToSave) {
            return res.status(400).json({error: "Failed to place order"})
        }
        return orderItemToSave._id
    }))
    let individualTotal = await Promise.all(orderItemsIds.map(async item=>{
        let OrderItem = await OrderItems.findById(item).populate('product', 'product_price')
        return OrderItem.quantity * OrderItem.product.product_price
    }))

    let total = individualTotal.reduce((accumulator, current) => accumulator + current)
    
    let orderToPlace = new Order({
        orderItems: orderItemsIds,
        user: req.body.user,
        total: total,
        shipping_address: req.body.shipping_address,
        alternate_shipping_address: req.body.alternate_shipping_address,
        city: req.body.city,
        zipcode: req.body.zipcode,
        country: req.body.country,
        phone: req.body.phone,
    })
    orderToPlace = orderToPlace.save()
    if(!orderToPlace){
        res.status(400).json({error: "Failed to place order."})
    }
    res.send(orderToPlace)
}

//to view all orders
exports.getAllOrders = async(req, res) => {
    let orders = await Order.find().populate('user', 'username')
    .populate({path: 'orderItems', populate:{path: 'product', populate: 'category'}})
    if(!orders) {
        return res.status(400).json({error: "Something went wrong."})
    }
    res.send(orders)
}

// to get order details
exports.getOrderDetails = async(req, res) => {
    let order = await Order.findById(req.params.orderId).populate('user', 'username')
    .populate({path: 'orderItems', populate:{path: 'product', populate: 'category'}})

    if(!order){
        return res.status(400).json({error: "Something went wrong."})
    }
    res.send(getOrderDetails)
}

// to get orders of a user
exports.getOrdersOfUser = async(req, res) => {
    let order = await Order.find({user: req.params.userId}).populate('user', 'username')
    .populate({path: 'orderItems', populate:{path: 'product', populate: 'category'}})

    if(!order){
        return res.status(400).json({error: "Something went wrong."})
    }
    res.send(getOrderDetails)
}

// to update order status
exports.updateOrder = async(req, res) =>{
    let orderToUpdate = await Order.findByIdAndUpdate(req.params.orderId,{
        status: req.body.status},
        {new: true})
        if(!orderToUpdate){
            return res.status(400).json({error: "Something went wrong."})
        }
        res.send(orderToUpdate)   
}

//to delete order
exports.deleteOrder = (req, res) =>{
    Order.findByIdAndDelete(req.params.orderId)
    .then(order=>{
        if(!order){
            return res.status(400).json({error: "Order not found."})
        }
        order.orderItems.map(orderItem=>{
            OrderItems.findByIdAndRemove(orderItem)
            .then(item=>{
                if(!item) {
                    return res.status(400).json({error: "Something went wrong."})
                }
            })
        })
        res.send({message: "Order deleted successfully."})
    })
    .catch((err)=>{
        return res.status(400).json({error: err.message})
    })
}