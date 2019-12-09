
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var custSchema = new Schema({
  cust_email: { type: String, required: true },
  cust_hash: String,
  cust_image: String,
  cust_fname:String,
  cust_lname:String,
  cust_address:String,
  cust_number:String
});

const saltRounds = 10;
custSchema.methods.hashify= function (pass,bcrypt) {
   
        bcrypt.hash(pass, saltRounds, function (err, hash) {
            cust_hash = hash;
            console.log('here password',cust_hash)
        })
    
};


var Customer = mongoose.model('Customer', custSchema);


module.exports = Customer;