
const Restaurant = require('../models/Restaurant');


function handle_request(msg, callback){
   
    console.log('Menu to be pushed!!!',msg)
    const {image,id,section_name,menu_name_old} = msg;

    Restaurant.find({$and:[{"_id":id},{"sections":{$elemMatch:  {section_name:section_name}}},{"sections.menu":{$elemMatch:  {menu_name:menu_name_old}}}]}, function(err, user) {
        if (err) {
            console.log('error-->');
            callback(err,"Error");
        }
        console.log('Menuuuuuuuuuuuu',user,'Type',typeof user)
       
        for (var i in user[0].sections) {
            if ( user[0].sections[i].section_name == section_name) {
                for (var j in user[0].sections[i].menu) {
                    if (user[0].sections[i].menu[j].menu_name == menu_name_old) {
                        user[0].sections[i].menu[j].menu_image = image;
                       break; 
                    }
                  }
               break; 
            }
          }
    
    
        console.log('Section objjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj',user[0].sections[i]);

        console.log('Menu to be inserted',user[0].sections[i].menu[j])
   
   
    Restaurant.findOneAndUpdate(
        {$and:[{"_id":id},{"sections":{$elemMatch:  {section_name:section_name}}},{"sections.menu":{$elemMatch:  {menu_name:menu_name_old}}}]},
           { 
               "$set": {
                "sections":  user[0].sections
               }
           },
           function(err,doc) {
            console.log('result data profile')
            callback(null, {status:true});
           }
       );
    })

  
  };
  
  exports.handle_request = handle_request;

