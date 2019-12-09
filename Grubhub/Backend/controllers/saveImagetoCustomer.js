const loadCustProfile =  require('./loadCustomerProfile');

const saveImagetoCustomer = (req, res, kafka) =>{

    kafka.make_request('saveImagetoCustomer',req.body, function(err,results){
        if(err){
            res.send("error");
        }
        else{
            loadCustProfile.loadCustProfile(req,res,kafka);
        }
    })
 
}

module.exports = {
    saveImagetoCustomer: saveImagetoCustomer
  };