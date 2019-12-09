const Restaurant = require('../models/Restaurant');

function handle_request(msg, callback){

    console.log('Inside load Menu Data!!',msg)
    const{id,sectionname} = msg;
    Restaurant.find({ _id: id }, function (err, rest) {
        if (err) {
            console.log('error-->');
            callback(err,"Error");
        }
        else{
        console.log('result data profile', rest[0]._doc)
        console.log('Result Section Data', rest[0]._doc.sections)   
        callback(null, rest[0]._doc.sections);
        }

    })
    
  };
  
  exports.handle_request = handle_request;


