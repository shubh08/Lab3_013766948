const loadCustProfile =  require('./loadCustomerProfile');
// const Customer = require('../models/Customer');
const updateUser = (req, res, kafka) =>{
    console.log('Inside the updated the user info call!!')
    console.log('Update user request body',req.body);


    kafka.make_request('updateCust',req.body, function(err,results){
        if(err){
            res.send("error");
        }
        else{
          
            loadCustProfile.loadCustProfile(req,res,kafka);
        }
    })
    
    // Customer.findOneAndUpdate(
    //     {"_id":id},
    //         { 
    //             "$set": {
    //                 "cust_fname": fname,
    //                 "cust_lname":lname,
    //                 "cust_email":email,
    //                 "cust_number":number,
    //                 "cust_address":address,
    //             }
    //         },
    //         function(err,doc) {
    //     if(err) throw err
    //     loadCustProfile.loadCustProfile(req,res,connPool);
    // }
    //     );

}


module.exports = {
    updateUser: updateUser
  };