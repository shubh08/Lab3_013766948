const loadOwnerProfile =  require('./loadOwnerProfile');

const updateOwner = (req, res, kafka)=>{
    console.log('inside owner update now');

    kafka.make_request('updateOwner',req.body, function(err,results){
        if(err){
            res.send("error");
        }
        else{
          
            loadOwnerProfile.loadOwnerProfile(req,res,kafka);
        }
    })
    
}

module.exports = {
    updateOwner: updateOwner
  };