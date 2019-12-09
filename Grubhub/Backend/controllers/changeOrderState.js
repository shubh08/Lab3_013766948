
const Orders = require('../models/Orders');
upComingRestaurantOrder = require('../controllers/upComingRestaurantOrder');
const changeOrderState = (req, res, kafka) =>{
   console.log('Inside update order state ', req.body)
   kafka.make_request('changeOrderState',req.body, function(err,results){
    if(err){
        res.send("error");
    }
    else{
        upComingRestaurantOrder.upComingRestaurantOrder(req,res,kafka);
    }
})
   
}

module.exports = {
    changeOrderState: changeOrderState
  };