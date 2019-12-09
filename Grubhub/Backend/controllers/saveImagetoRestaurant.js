const loadOwnerProfile =  require('./loadOwnerProfile');
const Restaurant = require('../models/Restaurant');
const saveImagetoRestaurant = (req, res, kafka) =>{
  
    const {image,id} = req.body;

    console.log('Inside restaurant image update',req.body)

    kafka.make_request('saveImagetoRestaurant',req.body, function(err,results){
        if(err){
            res.send("error");
        }
        else{
            loadOwnerProfile.loadOwnerProfile(req,res,kafka);
        }
    })

}

module.exports = {
    saveImagetoRestaurant: saveImagetoRestaurant
  };