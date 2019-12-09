
const Restaurant = require('../models/Restaurant');


function handle_request(msg, callback){
    console.log('Inside sign in owner ', msg)
    const {status,order_id} = msg;
    const { email, pass, type } = msg;
    Restaurant.find({ owner_email: email }, function (err, owner) {
        if (err) {
            console.log('error-->');
            callback(err,"Error");
        }
        else{
            console.log('result sign in customer')
              callback(null, owner);
          }


    })

  
  };
  
  exports.handle_request = handle_request;

