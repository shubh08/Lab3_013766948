

const Restaurant = require('../models/Restaurant');
const loadMenu =  require('./loadMenu'); 

function handle_request(msg, callback){
    console.log('Inside update section ', msg)
    const {section_name,updateid,section_description,id,section_name_old} = msg;


    let section = {section_name:section_name,section_description:section_description}

    Restaurant.find({"_id":id}, function(err, user) {
        if (err) {
            console.log('error-->');
        callback(err,"Error");
        }
    
        console.log('USer',user)
       let obj =  user[0].sections.filter((elem)=>{
                return elem.section_name===section_name_old
        })
       // obj = section;
        console.log('Section here and menu',obj,'Section',section)
        if(obj.menu===undefined)
        {
            section.menu = []
        }

        else{
            section.menu = obj.menu;
        }
       
        Restaurant.findOneAndUpdate(
           {$and:[{"_id":id},{"sections":{$elemMatch:  {section_name:section_name_old}}}]},
               { 
                   "$set": {
                       "sections.$": section
                   }
               },
               function(err,doc) {
                if (err) {
                    console.log('error-->');
                callback(err,"Error");
                }
        
                else{
                    console.log('result data profile')
                      callback(null, {status:true});
                  }
               

               }
           );
      });
  




     
};

exports.handle_request = handle_request;