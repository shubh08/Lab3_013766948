
const Customer = require('../models/Customer');

const registerCust = (req, res,kafka) => {


    kafka.make_request('registerCust',req.body, function(err,results){
        if(err){
            res.send("error");
        }
        else{
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
                console.log('Here in the signup faliure')
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({ status: "failure" }));
            }
        }
    })

}

module.exports = {
    registerCust: registerCust
};