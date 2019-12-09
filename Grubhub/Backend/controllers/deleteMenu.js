
const loadMenu =  require('./loadMenu'); 

const deleteMenu = (req, res, kafka) =>{
   console.log('Inside delete Menu ', req.body)
    const {section_name,id,menu_name} = req.body;

    kafka.make_request('deleteMenu',req.body, function(err,results){
      if(err) throw err;
      req.sectionname = section_name;
  
      loadMenu.loadMenu(req,res,kafka);
  })

}

module.exports = {
    deleteMenu: deleteMenu
  };