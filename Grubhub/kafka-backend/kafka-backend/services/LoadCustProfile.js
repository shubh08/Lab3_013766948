const Customer = require('../models/Customer');

function handle_request(msg, callback){
    console.log("Inside kafka backend--------------------");
    console.log('Inside customer load data!');
    console.log(JSON.stringify(msg));
    const { id } = msg;
    console.log(id);
    console.log('Connected to mongodb');

      Customer.find({ _id: id }, function (err, cust) {
            if (err) {
                console.log('error-->');
            callback(err,"Error");
            }

            else{
                console.log('result data profile', cust[0]._doc)
              //  console.log('results-->',JSON.stringify(results));
                callback(null, cust[0]._doc);
            }
        })

     
};
exports.handle_request = handle_request;