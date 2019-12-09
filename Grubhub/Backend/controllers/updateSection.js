

const loadSectionData =  require('./loadSectionData'); 

const updateSection = (req, res, kafka) =>{
   console.log('Inside update section ', req.body)
   kafka.make_request('updateSection',req.body, function(err,results){
    if(err){
        res.send("error");
    }
    else{
        loadSectionData.loadSectionData(req,res,kafka);
    }
})

}

module.exports = {
    updateSection: updateSection
  };