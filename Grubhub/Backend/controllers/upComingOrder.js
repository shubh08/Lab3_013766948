
const upComingOrder = (req, res, kafka) =>{
    console.log('Inside load Upcoming order for Customer Data!!',req.body)
    const{id} = req.body;
  
    kafka.make_request('upComingOrder',req.body, function(err,results){
        if(err){
            res.send("error");
        }
        else{
          
            console.log('result upcoming order data', results)
       
            let menuArr = [];
            results.forEach(element => {
                console.log('Here in the for each')
                element.items = element.orderItems;
                console.log('here in the element',element)
            });
    
            console.log('Final Object to be returned',results)
            
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
           
            res.end(JSON.stringify({status:"success",dataOrder:results,type:"Customer"}));
        }
    })

  
}


module.exports = {
    upComingOrder: upComingOrder
  };