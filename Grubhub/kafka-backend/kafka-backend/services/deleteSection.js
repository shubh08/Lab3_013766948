
const Restaurant = require('../models/Restaurant');

function handle_request(msg, callback){
  console.log('Inside delete section ', msg)
  const {section_name,id} = msg;

  Restaurant.update(
    {'_id':id}, 
    { $pull: { "sections" : { section_name: section_name } } },
    function(err,doc) {
      if (err) {
        console.log('error-->');
        callback(err,"Error");
    }
    else{
      callback(null, {success:true});
  }
      }  )

};

exports.handle_request = handle_request;

