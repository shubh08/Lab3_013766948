const loadOwnerProfile =  require('./loadOwnerProfile');
const Restaurant = require('../models/Restaurant');


function handle_request(msg, callback){
    const {image,id} = msg;

    Restaurant.findOneAndUpdate(
        {"_id":id},
            { 
                "$set": {
                    "owner_image":image
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

