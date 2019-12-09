
const upComingOrder =  require('./upComingOrder'); 
const upComingRestaurantOrder = require('./upComingRestaurantOrder')



const sendMessage = (req, res, kafka) =>{
   console.log('Inside send Message ', req.body)
   const {type,order_id,message,id} = req.body;
   kafka.make_request('sendMessage',req.body, function(err,results){
    if(err){
        res.send("error");
    }
    else{
      console.log('here send Message',results);
    if(type=='Customer')
    upComingOrder.upComingOrder(req,res,kafka)
    else

    upComingRestaurantOrder.upComingRestaurantOrder(req,res,kafka);
    }
})


    


}

module.exports = {
    sendMessage: sendMessage
  };