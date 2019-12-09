
const loadSectionData =  require('./loadSectionData'); 

const deleteSection = (req, res, kafka) =>{
   console.log('Inside delete section ', req.body)
    const {section_name,id} = req.body;

    kafka.make_request('deleteSection',req.body, function(err,results){
      if(err){
          res.send("error");
      }
      else{
        loadSectionData.loadSectionData(req,res,kafka);
      }
  })


}

module.exports = {
    deleteSection: deleteSection
  };