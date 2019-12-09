
const Orders = require('../models/Orders');

function handle_request(msg, callback){
    console.log('Inside order Items section ', msg)
    const { cust_id, restaurant_id, status, orderItems, rest_name, order_total,cust_fname,cust_lname } = msg;

    var order = Orders({
        cust_id: cust_id,
        restaurant_id: restaurant_id,
        status: status,
        rest_name: rest_name,
        order_total: order_total,
        orderItems: orderItems,
        cust_fname:cust_fname,
        cust_lname:cust_lname
    });


   
    order.save(function (err) {
        if (err) {
            console.log('error-->');
            callback(err,"Error");
        }

       
            else {
                callback(null,{success:true});
            }
        
    })
 
  };
  
  exports.handle_request = handle_request;

