const Restaurant = require('../models/Restaurant');
//Restaurant
const registerOwn = (req, res,kafka) => {
   

    kafka.make_request('registerOwn',req.body, function(err,results){
        if(err){
            res.send("error");
        }
        else{
            console.log('Results received'+results.success)
            if(results.success)
            {
                console.log('Here in the signup success')
                let resultsignup = {}
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                resultsignup.status = 'success'
                res.end(JSON.stringify(resultsignup));
            }

            else
            {
                console.log('Here in the signup failure')
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({ status: "failure" }));
            }

        }
    })

}

module.exports = {
    registerOwn: registerOwn
};