
const Restaurant = require('../models/Restaurant');


function handle_request(msg, callback){
    console.log('Inside update menu ', msg)
    const {menu_name,updateid,menu_description,menu_image,menu_price,section_name,menu_name_old,id} = msg;
  
    Restaurant.find({$and:[{"_id":id},{"sections":{$elemMatch:  {section_name:section_name}}},{"sections.menu":{$elemMatch:  {menu_name:menu_name_old}}}]}, function(err, user) {
        if(err) {
            console.log('error-->');
            callback(err,"Error");
        }
        console.log('Menuuuu',user,'Type',typeof user)
       
  
     

    for (var i in user[0].sections) {
        if ( user[0].sections[i].section_name == section_name) {
            for (var j in user[0].sections[i].menu) {
                if (user[0].sections[i].menu[j].menu_name == menu_name_old) {
                    user[0].sections[i].menu[j] = msg;
                   break; 
                }
              }
           break; 
        }
      }


    console.log('Section objjjjjjjjjjj',user[0].sections[i]);


    console.log('Menu to be inserted',user[0].sections[i].menu[j])
   
    Restaurant.findOneAndUpdate(
        {$and:[{"_id":id},{"sections":{$elemMatch:  {section_name:section_name}}},{"sections.menu":{$elemMatch:  {menu_name:menu_name_old}}}]},
           { 
               "$set": {
                   "sections":  user[0].sections
               }
           },
           function(err,doc) {
            if(err) {
                console.log('error-->');
                callback(err,"Error");
            }
            else{
                
              callback(null, {succes:true});
              }
           }
       );
    })

  };
  
  exports.handle_request = handle_request;


