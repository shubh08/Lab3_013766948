
const loadRestaurant = (req, res, kafka) =>{
    console.log('Inside load restaurant ')
    const{id} = req.body;
    console.log('Req body',req.body)

        kafka.make_request('loadRestaurant',req.body, function(err,results){
         if(err){
             res.send("error");
         }
         else{
           
       
            console.log('Result Section Data', results)
    
            let menuArr = [];
            results.forEach(element => {
                
                    console.log('hererer in the matched section name menu array',element)
                    if(element.menu.length>0)
                    {
                        element.menu.forEach(elem=>{
                            
                            menuArr.push(elem);
                        })
    
                       
                    }
                
            });
    
            
            console.log('Data pushed in the menu arrrrrrrrrrrrrrr',menuArr)
            //let sectionArr = rest[0]._doc.sections
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
           
            res.end(JSON.stringify({status:"success",
            restaurantData:menuArr
           }));
         }
     })

    }



module.exports = {
    loadRestaurant: loadRestaurant
  };