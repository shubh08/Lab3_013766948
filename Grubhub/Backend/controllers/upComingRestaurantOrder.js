const Orders = require('../models/Orders');
const upComingRestaurantOrder = (req, res, kafka) => {
    console.log('Inside load Upcoming order Data for restaurant!!', req.body)
    const { id } = req.body;

    kafka.make_request('upComingRestaurantOrder',req.body, function(err,results){
        if(err){
            res.send("error");
        }
        else{
          
        console.log('result upcoming order data', results)
     
        console.log('Final Object to be returned',results)
        //let sectionArr = rest[0]._doc.sections
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });


        res.end(JSON.stringify({status:"success",upComingRestaurantOrder:results,type:"Owner"}));
        }
    })

  
}


module.exports = {
    upComingRestaurantOrder: upComingRestaurantOrder
};