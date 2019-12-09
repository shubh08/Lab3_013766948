
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    cust_id:String,
    restaurant_id:String,
    rest_name:String,
    order_total:String,
    status:String,
    cust_fname:String,
    cust_lname:String,
    cust_address:String,
    orderItems:[],
    messages:[]
  });







var Orders = mongoose.model('Orders', OrderSchema);


module.exports = Orders;