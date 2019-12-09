const loadCustProfile =  require('./loadCustomerProfile');
const Customer = require('../models/Customer');

function handle_request(msg, callback){
    console.log("Inside kafka backend--------------------");
    console.log('Inside the updated the user info call!!')
    console.log('Update user request body',msg);
    const{fname,lname,email,number,image,id,address} = msg;
    

    Customer.findOneAndUpdate(
        {"_id":id},
            { 
                "$set": {
                    "cust_fname": fname,
                    "cust_lname":lname,
                    "cust_email":email,
                    "cust_number":number,
                    "cust_address":address,
                }
            },
            function(err,doc) {
                if (err) {
                    console.log('error-->');
                callback(err,"Error");
                }

                else{
                    console.log('result data profile', doc)
                  //  console.log('results-->',JSON.stringify(results));
                    callback(null, {success:true});
                }
    }
        );

    
     
};
exports.handle_request = handle_request;
