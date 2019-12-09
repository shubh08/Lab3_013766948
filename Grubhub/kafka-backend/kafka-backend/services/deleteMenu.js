
const Restaurant = require('../models/Restaurant');

function handle_request(msg, callback){

  console.log('Inside delete Menu ', msg)
    const {section_name,id,menu_name} = msg;

    Restaurant.update(
      {$and:[{"_id":id},{"sections":{$elemMatch:  {section_name:section_name}}}]}, 
      { $pull: { "sections.$.menu" : { menu_name: menu_name } } },
      function(err,doc) {
        if(err) {
          console.log('error-->');
          callback(err,"Error");
      }
      else{
          
        callback(null, {succes:true});
        }
        }  )


  
};

exports.handle_request = handle_request;
