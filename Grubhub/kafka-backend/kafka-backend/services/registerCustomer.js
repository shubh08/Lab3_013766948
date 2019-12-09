
const Customer = require('../models/Customer');


const bcrypt = require('bcrypt');

function handle_request(msg, callback){
    const saltRounds = 10;
    const { fname, lname, email, pass } = msg;
    // create a new user
    var newUser = Customer({
        cust_fname: fname,
        cust_lname: lname,
        cust_email: email,
        cust_hash: pass,
        cust_image: 'default.png'
    });

    
    Customer.find({ cust_email: email }, function (err, cust) {
        if (err) throw err;
        else {
            console.log('Here success!', cust)
            if (cust.length == 0) {
                bcrypt.hash(pass, saltRounds, function (err, hash) {
                    newUser.cust_hash = hash;
                    newUser.save(function (err) {
                        if (err) throw err;
                        else {
                            callback(null,{success:true});
                        }
                    })
                })
            

            
            }

            else {
                callback(null,{success:false});
            }

        }

    });
   
  };
  exports.handle_request = handle_request;