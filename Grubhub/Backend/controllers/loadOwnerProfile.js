
const loadOwnerProfile = (req, res, kafka) =>{
    console.log('Inside load owner profile')
   

    kafka.make_request('loadOwnerProfile',req.body, function(err,results){
        if(err){
            res.send("error");
        }
        else{
            res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    console.log('result data profile', results)
                    res.end(JSON.stringify({
                        status: "success",
                        ...results
                    }));
        }
    })


}


module.exports = {
    loadOwnerProfile: loadOwnerProfile
  };