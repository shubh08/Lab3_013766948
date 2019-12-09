

const Orders = require('../models/Orders');


function handle_request(msg, callback){
    console.log('Inside update order state ', msg)
    const {status,order_id} = msg;


    Orders.findOneAndUpdate(
        {"_id":order_id},
            { 
                "$set": {
                    "status": status
                }
            },
            function(err,doc) {
                if (err) {
                    console.log('error-->');
                    callback(err,"Error");
                }
                else{
                    console.log('result data profile')
                      callback(null, {status:true});
                  }
            }
        );
  };
  
  exports.handle_request = handle_request;
