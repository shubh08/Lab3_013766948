const Restaurant = require('../models/Restaurant');


function handle_request(msg, callback){
    console.log("Inside kafka backend--------------------");
    console.log('Inside load section Data!!', msg)
    const { id } = msg;

    console.log(id);
    
    Restaurant.find({ _id: id }, function (err, rest) {
        if (err) {
            console.log('error-->');
        callback(err,"Error");
        }

        else{
            if(rest[0]!=undefined){
                console.log('result data profile', rest[0]._doc)
              callback(null, rest[0]._doc.sections);
            }
            
            else{
                console.log('error-->');
                callback(err,"Error");
            }
          }
       
    })
     
};


exports.handle_request = handle_request;