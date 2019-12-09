

const Customer = require('../models/Customer');


function handle_request(msg, callback){
    console.log('Inside customer signin ', msg)
    const {status,order_id} = msg;
    const { email, pass, type } = msg;
    Customer.find({ cust_email: email }, function (err, cust) {
        if (err) {
            console.log('error-->');
            callback(err,"Error");
        }
        else{
            console.log('result sign in customer')
              callback(null, cust);
          }


    })

  
  };
  
  exports.handle_request = handle_request;

