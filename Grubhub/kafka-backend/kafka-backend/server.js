var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var LoadCustProfile = require('./services/LoadCustProfile');  
const updateUser =  require('./services/updateUser'); 
const loadOwnerProfile =  require('./services/loadOwnerProfile'); 
const updateOwner = require('./services/updateOwner')
const loadSectionData =  require('./services/loadSectionData')
const addSection = require('./services/addSection')
const updateSection = require('./services/updateSection')
const deleteSection = require('./services/deleteSection')
const sendMessage= require('./services/sendMessage')
const addMenu = require('./services/addMenu')
const loadMenu= require('./services/loadMenu')
const deleteMenu=  require('./services/deleteMenu') 
const updateMenu = require('./services/updateMenu') 
const searchDishes = require('./services/searchDishes')
const loadRestaurant= require('./services/loadRestaurant')
const order = require('./services/order')
const upComingOrder= require('./services/upComingOrder')
const upComingRestaurantOrder= require('./services/upComingRestaurantOrder')
const changeOrderState= require('./services/changeOrderState')
const registerOwn = require('./services/registerOwner') //
const registerCust = require('./services/registerCustomer') 
const signinCust = require('./services/signinCustomer') 
const signinOwn=   require('./services/signinOwner') 
const saveImagetoMenu =  require('./services/saveImagetoMenu') 
const saveImagetoCustomer = require('./services/saveImagetoCustomer') 
const saveImagetoOwner = require('./services/saveImagetoOwner') 
const saveImagetoRestaurant = require('./services/saveImagetoRestaurant') 

var Database=require('../kafka-backend/Database');

function handleTopicRequest(topic_name,fname){ 
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
// first argument is topic name
// second argument is a function that will handle this topic request

handleTopicRequest("registerCust",registerCust)
handleTopicRequest("registerOwn",registerOwn)  //saveImagetoRestaurant
handleTopicRequest("saveImagetoMenu",saveImagetoMenu)

handleTopicRequest("saveImagetoRestaurant",saveImagetoRestaurant)

handleTopicRequest("saveImagetoCustomer",saveImagetoCustomer)

handleTopicRequest("saveImagetoOwner",saveImagetoOwner)

handleTopicRequest("signinOwn",signinOwn)
handleTopicRequest("signinCust",signinCust)

handleTopicRequest("loadCustProfile",LoadCustProfile)  //deleteMenu
handleTopicRequest("loadOwnerProfile",loadOwnerProfile) 
handleTopicRequest("updateCust",updateUser) 
handleTopicRequest("updateOwner",updateOwner) 
handleTopicRequest("loadSection",loadSectionData) 
handleTopicRequest("addSection",addSection) 
handleTopicRequest("updateSection",updateSection) 
handleTopicRequest("deleteSection",deleteSection) 
handleTopicRequest("sendMessage",sendMessage) 
handleTopicRequest("addMenu",addMenu) 
handleTopicRequest("loadMenu",loadMenu) 
handleTopicRequest("deleteMenu",deleteMenu) //registerCust

handleTopicRequest("updateMenu",updateMenu)
handleTopicRequest("searchDishes",searchDishes)
handleTopicRequest("loadRestaurant",loadRestaurant)
handleTopicRequest("order",order)
handleTopicRequest("upComingOrder",upComingOrder)
handleTopicRequest("upComingRestaurantOrder",upComingRestaurantOrder)
handleTopicRequest("changeOrderState",changeOrderState)



// handleTopicRequest("add_to_menu",AddToMenu)
// handleTopicRequest("item_details",ItemDetails)
// handleTopicRequest("delete_items",DeleteItems)

