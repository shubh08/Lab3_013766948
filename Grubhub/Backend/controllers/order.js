
const Orders = require('../models/Orders');
const order = (req, res, kafka) => {
    console.log('Inside order Items section ', req.body)

    const { cust_id, restaurant_id, status, orderItems, rest_name, order_total,cust_fname,cust_lname } = req.body;


    kafka.make_request('order',req.body, function(err,results){
        if(err){
            res.send("error");
        }
        else{
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({ status: "success" }));
        }
    })


}

module.exports = {
    order: order
};