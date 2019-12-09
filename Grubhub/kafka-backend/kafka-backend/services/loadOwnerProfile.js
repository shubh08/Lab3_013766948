const Restaurant = require('../models/Restaurant');

function handle_request(msg, callback){
    console.log("Inside kafka backend--------------------");
    console.log('Inside customer load data!');
    console.log(JSON.stringify(msg));
    const{id} = msg;

    console.log(id);
    Restaurant.find({ _id: id }, function (err, rest) {
        if (err) {
            console.log('error-->');
        callback(err,"Error");
        }

        else{
        console.log('result data profile', rest[0]._doc)
          callback(null, rest[0]._doc);
      }
        

    })



     
};

exports.handle_request = handle_request;