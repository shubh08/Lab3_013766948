
const Restaurant = require('../models/Restaurant');

function handle_request(msg, callback){
    console.log('inside owner update now');
    const{fname,lname,email,number,owner_image,id,rest_name,rest_zipcode,rest_image,rest_cuisine} = msg;

    Restaurant.findOneAndUpdate(
        {"_id":id},
            { 
                "$set": {
                    "owner_fname": fname,
                    "owner_lname":lname,
                    "owner_email":email,
                    "owner_number":number,
                    "rest_name":rest_name,
                    "rest_zipcode":rest_zipcode,
                    "rest_cuisine":rest_cuisine

                }
            },
            function(err,doc) {
                if (err) {
                    console.log('error-->');
                callback(err,"Error");
                }

        else{
        console.log('result update owner success')
          callback(null, {sucess:true});
      }
    }
        );




     
};

exports.handle_request = handle_request;

