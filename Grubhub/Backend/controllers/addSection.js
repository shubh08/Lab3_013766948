
const loadSectionData =  require('./loadSectionData'); 
const Restaurant = require('../models/Restaurant');
const addSection = (req, res, kafka) =>{

   console.log('Inside add section ', req.body)

   
   kafka.make_request('addSection',req.body, function(err,results){
    if(err){
        res.send("error");
    }
    else{
      console.log('here in the  add section  method',results);
      loadSectionData.loadSectionData(req,res,kafka);
    }
})


}

module.exports = {
    addSection: addSection
  };