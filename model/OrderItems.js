/*
order - {samsung-5}, {iphone - 2}, {acer - 3}

OrderItems - {samsung phone - 5, id1}
            {iphone-2, id2}
            {acer-3, id3}

OrderModel - 
orderItems - [id1, id2, id3]
*/

let mongoose = require("mongoose");
let { ObjectId } = mongoose.Schema;

let orderItemsSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
}, {timeStamps: true});

module.exports = mongoose.model("OrderItems", orderItemsSchema)
