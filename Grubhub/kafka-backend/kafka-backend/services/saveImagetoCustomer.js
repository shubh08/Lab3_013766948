const loadCustProfile =  require('./loadCustomerProfile');
const Customer = require('../models/Customer');

function handle_request(msg, callback){
    const {image,id} = msg;

    Customer.findOneAndUpdate(
        {"_id":id},
            { 
                "$set": {
                    "cust_image":image
                }
            },
            function(err,doc) {
                if (err) {
                    console.log('error-->');
                    callback(err,"Error");
                }
                else{
                    console.log('Customer Pic updated')
                      callback(null, {success:true});
                  }
    }
        );


  };

   
  exports.handle_request = handle_request;
