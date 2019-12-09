

const loadMenu = (req, res, kafka) =>{
    console.log('Inside load Menu Data!!',req.body)
    const{id,sectionname,section_name} = req.body;

    kafka.make_request('loadMenu',req.body, function(err,results){
        if(err){
            res.send("error");
        }
        else{

            
        let menuArr = [];
        results.forEach(element => {
            if(element.section_name==sectionname || element.section_name==section_name)
            {
                console.log('hererer in the matched section name menu array')
               
                if(element.menu.length>0)
                menuArr = element.menu;
            }
        });


            console.log('Data pushed in the menu arrr',menuArr)
        
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            status: "success",
            menuData:menuArr
        }));
        }
    })


}


module.exports = {
    loadMenu: loadMenu
  };