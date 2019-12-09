
const loadMenu =  require('./loadMenu'); 


const addMenu = (req, res, kafka) =>{
console.log('Inside add Menu ', req.body)

 
kafka.make_request('addMenu',req.body, function(err,results){
    if(err){
        res.send("error");
    }
    else{
        console.log('here in the add menu method',results);
        req.body.sectionname = req.body.section_name
        loadMenu.loadMenu(req,res,kafka);
    }
})


}

module.exports = {
    addMenu: addMenu
  };