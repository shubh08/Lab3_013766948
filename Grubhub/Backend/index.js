
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let cors = require('cors');
let sqlCon = require('mysql');
const bcrypt = require('bcrypt');
const multer = require("multer");
const passport = require("passport");
const schema = require('./schema/schema');

var passportJWT = require("passport-jwt");

const kafka = require('./kafka/kafka/client');
const graphqlHTTP = require('express-graphql');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

const registerOwner = require('./controllers/registerOwner');
const registerCustomer = require('./controllers/registerCustomer');
const signinCustomer = require('./controllers/signinCustomer');
const signinOwner = require('./controllers/signinOwner');
const updateOwner = require('./controllers/updateOwner');
const updateUser = require('./controllers/updateUser');
const loadCustProfile =  require('./controllers/loadCustomerProfile');
const loadOwnerProfile =  require('./controllers/loadOwnerProfile'); 
const loadSectionData =  require('./controllers/loadSectionData'); 
const addSection   =  require('./controllers/addSection'); 
const addMenu   =  require('./controllers/addMenu'); 
const loadMenu   =  require('./controllers/loadMenu'); //deleteSection
const deleteMenu = require('./controllers/deleteMenu'); 
const deleteSection = require('./controllers/deleteSection'); 
const updateSection = require('./controllers/updateSection');  
const updateMenu = require('./controllers/updateMenu'); 
const searchDishes = require('./controllers/searchDishes');
const loadRestaurant = require('./controllers/loadRestaurant');  
const order = require('./controllers/order');  
const pastorder = require('./controllers/pastorder');    //upComingOrder
const upComingOrder = require('./controllers/upComingOrder');   //upComingRestaurantOrder
const upComingRestaurantOrder = require('./controllers/upComingRestaurantOrder'); 
const changeOrderState = require('./controllers/changeOrderState'); //changeOrderState  //saveImagetoMenu
const saveImagetoMenu = require('./controllers/saveImagetoMenu');
const saveImagetoCustomer = require('./controllers/saveImagetoCustomer'); 
const saveImagetoOwner = require('./controllers/saveImagetoOwner');  //saveImagetoCustomer  //saveImagetoOwner //saveImagetoRestaurant
const saveImagetoRestaurant = require('./controllers/saveImagetoRestaurant');
const Customer = require('./models/Customer');
const Restaurant = require('./models/Restaurant');
const sendMessage = require('./controllers/sendMessage')
var Database=require('./Database');

const saltRounds = 10;

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
      
    }
})

const upload = multer({storage:storage})


let connPool = sqlCon.createPool({
    host:'database-1.cecr4orrxfsb.us-east-2.rds.amazonaws.com',
    user:'admin',
    password:'shubhamkumar',
    database:'grubhub'
});


const mongoose = require('mongoose');
const uri = "mongodb+srv://root:root@cluster0-bhnra.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true})

app.use(cookieParser());

//use cors tolow cross origin resource sharing
app.use(cors());

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_grubhub',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));


app.use(bodyParser.json());

app.use(express.static(__dirname+'/uploads'));

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'cmpe273';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received--------------------------', jwt_payload);
  console.log('ID------------------------------', jwt_payload._id);
  // usually this would be a database call:
  Customer.find({ _id: jwt_payload._id }, function (err, cust) {

    if (cust) {
        next(null, cust);
      } else {

        Restaurant.find({ _id: jwt_payload._id }, function (err, rest) {
  
            if (rest) {
                next(null, rest);
              } else {
                next(null, false);
              }
        
          })
      }

  })

});





passport.use('jwt',strategy);

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: true
}));


// Passport middleware
app.use(passport.initialize());
// Passport config
//require("./config/passport")(passport);

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//app.use(passport.initialize());
// User signup

app.post('/signup',(req,res)=>{
console.log('Inside signup post',req.body);

if(req.body.type==='customer')
{
registerCustomer.registerCust(req, res, kafka)
}

else{
registerOwner.registerOwn(req, res,kafka);
}


})



// User Signin
app.post('/signin',(req,res)=>{
    console.log('Inside sign in..',req.body);

    if(req.body.type==='customer')
    {
        signinCustomer.signinCust(req, res,kafka)
    }
    
    else{
        signinOwner.signinOwn(req, res,kafka);
    }
    

})

// User Update
app.post('/update',(req,res)=>{
    console.log('Inside update info..',req.body);
    if(req.body.type==='customer')
    {
        updateUser.updateUser(req, res, kafka)
    }
    
    else{
        updateOwner.updateOwner(req, res, kafka);
    }

})  

//Load Profile Data
app.post('/loadProfileData',(req,res)=>{
    console.log('Inside loading of profile info..',req.body);
    if(req.body.type==='customer')
    {
        loadCustProfile.loadCustProfile(req, res,kafka)
    }
    
    else{
        loadOwnerProfile.loadOwnerProfile(req, res, kafka);
    }

})

//loadSectionData


app.post('/loadSectionData',(req,res)=>{

    console.log('Inside load section data here',req.body)

        loadSectionData.loadSectionData(req, res, kafka);
    
})

//addSection

app.post('/addSection',(req,res)=>{

    addSection.addSection(req, res, kafka);

})


//updateSection

app.post('/updateSection',(req,res)=>{

    updateSection.updateSection(req, res, kafka);

})



//delete Section

app.post('/deleteSection', function (req, res) {
    console.log("Inside delete function");

    deleteSection.deleteSection(req, res, kafka)
  
});


//sendMessage

app.post('/sendMessage',function (req, res) {
    console.log("Inside send  Message");
    sendMessage.sendMessage(req, res, kafka)
  
});

//addMenu  
app.post('/addMenu',(req,res)=>{
    console.log('File path',req.file)
    addMenu.addMenu(req, res, kafka);

})


//Upload  
app.post('/upload',upload.single('image'),(req,res)=>{
    console.log('File path',req.body.id)
    // addMenu.addMenu(req, res, connPool);\

    if(req.file){
        console.log('herere in the fule upload',req.file)
        req.body.image=req.file.filename;
    }
    console.log('Final Image to push',req.body)
    if(req.body.type==='Menu')
   saveImagetoMenu.saveImagetoMenu(req,res,kafka);
   else if(req.body.type==='Customer')
   saveImagetoCustomer.saveImagetoCustomer(req,res,kafka);
   else if(req.body.type==='Owner')
   saveImagetoOwner.saveImagetoOwner(req,res,kafka);
  else
  saveImagetoRestaurant.saveImagetoRestaurant(req,res,kafka);

})



//loadMenu
app.post('/loadMenu',(req,res)=>{

    loadMenu.loadMenu(req, res, kafka);
   // res.json("Success! You can not see this without a token");
})

//Delete Menu

app.post('/deleteMenu',(req,res)=>{

    deleteMenu.deleteMenu(req, res, kafka);

})


//updateMenu

app.post('/updateMenu',(req,res)=>{

    updateMenu.updateMenu(req, res, kafka);

})

//searchDishes

app.post('/searchDishes',(req,res)=>{

    searchDishes.searchDishes(req, res, kafka);

})


//Load Restaurant  

app.post('/loadRestaurant',(req,res)=>{

    loadRestaurant.loadRestaurant(req, res, kafka);

})

//order
app.post('/order',(req,res)=>{

    order.order(req, res, kafka);

})

// Load Past Data

app.post('/pastorder',(req,res)=>{

    pastorder.pastorder(req, res, kafka);

})

// Load Upcoming order  upComingOrder
app.post('/upComingOrder',(req,res)=>{

    upComingOrder.upComingOrder(req, res, kafka);

})

//Load Upcoming Restaurant Order  
app.post('/upComingRestaurantOrder',(req,res)=>{

    upComingRestaurantOrder.upComingRestaurantOrder(req, res, kafka);

})

// Change Order State  changeOrderState
app.post('/changeOrderState',(req,res)=>{

    changeOrderState.changeOrderState(req, res, kafka);

})

app.get('/logout',(req,res) => {
    console.log('logout success');
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        
    });

});



app.listen(3001);
console.log("Server Listening on port 3001");
