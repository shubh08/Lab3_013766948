const Restaurant = require('../models/Restaurant');



function handle_request(msg, callback){
    console.log('Request Body', msg);
    const { id,searchTerm } = msg;
    console.log('Search Term is ', searchTerm)

    
    Restaurant.find({"sections.menu":{$elemMatch:  {menu_name:searchTerm}}}, function (err, rest) {
        if (err) {
            console.log('error-->');
            callback(err,"Error");
        }

        else{
            console.log('result data profile', rest)

            console.log('Result Section Data', rest)
            callback(null, rest);
            }

    })

   
    
  };
  
  exports.handle_request = handle_request;

