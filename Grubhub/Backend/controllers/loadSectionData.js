const Restaurant = require('../models/Restaurant');
const loadSectionData = (req, res, kafka) => {
    console.log('Inside load section Data!!', req.body)
    const { id } = req.body;


    kafka.make_request('loadSection',req.body, function(err,results){
        if(err){
            res.send("error");
        }
        else{
          
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                status: "success",
                sectionData:results
            }));
        }
    })
    
   

    
}


module.exports = {
    loadSectionData: loadSectionData
};