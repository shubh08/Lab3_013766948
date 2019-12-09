

const Restaurant = require('../models/Restaurant');

function handle_request(msg, callback){

    console.log('Inside add Menu ', msg)
const  {menu_name,id,menu_description,menu_price,menu_image,section_name} = msg;
msg.menu_image = 'default.png'

Restaurant.update({$and:[{"_id":id},{"sections":{$elemMatch:  {section_name:section_name}}}]}, { $push: {  "sections.$.menu": msg  } }, {upsert: true}, function(err, docs){
    
    if (err) {
        console.log('error-->');
        callback(err,"Error");
    }
    else{
        callback(null, {success:true});
    }
   
    });

    
  };
  
  exports.handle_request = handle_request;

