const loadMenu =  require('./loadMenu'); 

const saveImagetoMenu = (req, res, kafka) =>{

    console.log('Menu to be pushed!!!',req.body)
    const {image,id,section_name,menu_name_old} = req.body;
    
    kafka.make_request('saveImagetoMenu',req.body, function(err,results){
        if(err){
            res.send("error");
        }
        else{
            req.body.sectionname = section_name
            loadMenu.loadMenu(req,res,kafka);
        }
    })
  
}

module.exports = {
    saveImagetoMenu: saveImagetoMenu
  };