
const Customer = require('../models/Customer');
const loadCustProfile = (req, res, kafka) => {
    const { id } = req.body;
   
        console.log('Inside customer load data!');

        kafka.make_request('loadCustProfile',req.body, function(err,results){
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
        // Customer.find({ _id: id }, function (err, cust) {
        //     if (err) throw err

        //     res.writeHead(200, {
        //         'Content-Type': 'application/json'
        //     });
        //     console.log('result data profile', cust[0]._doc)
        //     res.end(JSON.stringify({
        //         status: "success",
        //         ...cust[0]._doc
        //     }));

        // })
        
   
}


module.exports = {
    loadCustProfile: loadCustProfile
};