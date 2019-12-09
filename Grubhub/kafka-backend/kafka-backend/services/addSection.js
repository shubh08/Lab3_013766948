
const Restaurant = require('../models/Restaurant');


function handle_request(msg, callback){
  console.log('Inside add section ', msg)
  
  const {section_name,id,section_description} = msg;

  let section = {section_name:section_name,section_description:section_description,menu:[]}

  
  Restaurant.update({_id:id}, { $push: { sections: section  } }, {upsert: true}, function(err, docs){
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


