
const loadMenu =  require('./loadMenu'); 
const Restaurant = require('../models/Restaurant');
const updateMenu = (req, res, kafka) =>{
   console.log('Inside update menu ', req.body)

   const {menu_name,updateid,menu_description,menu_image,menu_price,section_name,menu_name_old,id} = req.body;
   kafka.make_request('updateMenu',req.body, function(err,results){
    if(err){
        res.send("error");
    }
    else{
        req.sectionname = section_name; 
        loadMenu.loadMenu(req,res,kafka);
    }
})

}

module.exports = {
    updateMenu: updateMenu
  };