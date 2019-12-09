const loadOwnerProfile =  require('./loadOwnerProfile');
const Restaurant = require('../models/Restaurant');
const saveImagetoOwner = (req, res, kafka) =>{

    
    kafka.make_request('saveImagetoOwner',req.body, function(err,results){
        if(err){
            res.send("error");
        }
        else{
            loadOwnerProfile.loadOwnerProfile(req,res,kafka);
        }
    })
  
}

module.exports = {
    saveImagetoOwner: saveImagetoOwner
  };