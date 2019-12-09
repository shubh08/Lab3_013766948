const Restaurant = require('../models/Restaurant');

const bcrypt = require('bcrypt');
//Restaurant

function handle_request(msg, callback){
    const saltRounds = 10;
    const { fname, lname, email, pass, restname, zip } = msg;

    let owner_id = '';
    var newRest = Restaurant({
        owner_email: email,
        owner_hash: pass,
        owner_image: 'default.png',
        owner_fname: fname,
        owner_lname: lname,
        rest_name: restname,
        rest_zipcode: zip,
        rest_image:'default.png'
    });

    Restaurant.find({ owner_email: email }, function (err, owner) {
        if (err) throw err;
        else {
            console.log('Here success!',owner )
            if (owner.length == 0) {
                bcrypt.hash(pass, saltRounds, function (err, hash) {
                    newRest.owner_hash = hash;
                    newRest.save(function (err) {
                        if (err) {
                            console.log('error-->');
                            callback(err,"Error");
                        }
                
                        else {
                            console.log('Success');
                            callback(null,{success:true});
                        }
                    })
                })



            }

            else {
                console.log('Failure');
                callback(null,{success:false});
            }

        }

    });
   
  };


  exports.handle_request = handle_request;