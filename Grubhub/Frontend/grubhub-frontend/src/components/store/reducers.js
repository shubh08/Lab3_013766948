


const initialState = {
    cust_fname:"",
    cust_lname:"",
    cust_id : "",
    cust_email : "",
    cust_image:"",
    cust_number:"",
    cust_pass:"",
    cust_address:"",
    owner_id:"",
    owner_pass:"",
    owner_fname:"",
    owner_fname:"",
    owner_email:"",
    owner_image:"",
    owner_number:"",
    restaurant_id:"",
    rest_name:"",
    rest_zipcode:"",
    rest_image:"",
    rest_cuisine:"",
    rest_name_holder:"",
    rest_zipcode_holder:"",
    rest_image_holder:"",
    rest_cuisine_holder:"",
    type:"",
    authFlag : false,
    loginStatus:"",
    cust_fname_holder:"",
    cust_lname_holder:"",
    cust_email_holder:"",
    cust_number_holder:"",
    cust_image_holder:"",
    cust_address_holder:"",
    owner_fname_holder:"",
    owner_lname_holder:"",
    owner_email_holder:"",
    owner_number_holder:"",
    sectionData:[],
    menuData:[],
    searchData:[],
    restaurantData:[],
    upComingOrderData:[],
    upComingRestaurantOrderData:[],
    orderSuccess:false,
    objLogin:{
       
    },
   updateSuccess:false
}


const reducer = (state=initialState,action)=>{
    
  
    const newState = {...state}
    if(action.type==='ValueChange')
    {const {name,value} = action.value.target;
    console.log('Name and value:',name,value);
       const objret= Object.assign({}, state, { [name]: value });
       console.log('Object is :',objret);
       return objret;
    }
   if(action.type==='Login')
   {
    console.log('Here after login');
    console.log('Object returned after login', action.value)
    const objret= Object.assign({}, state, action.value);
    console.log('Here after login',objret);
    return objret;  
   }  //signUpAsync
   if(action.type==='CustSignup')
   {
    console.log('Here after Signup');
    const objret= Object.assign({}, state, action.value);
    console.log('Here after Signup',objret);
    return objret;  
   } 

   if(action.type==='LoadProfileData')
   {
    console.log('Here after loading profile data');
    console.log('Object returned after loading profile data', action.value)
    const objret= Object.assign({}, state, action.value);
    console.log('Final object here after loading profile data',objret);
    return objret;  
   }
   
   //UpdateProfile
   
   if(action.type==='UpdateProfile')
   {
    console.log('Here after updating profile data');
    console.log('Object returned after upadating profile data', action.value)
    const objret= Object.assign({}, state, action.value);
    console.log('Final object here after updating profile data',objret);
    return objret;  
   }   

   if(action.type==='LoadSection')
   {
    
    console.log('Object returned after loading section data', action.value)
    const objret= Object.assign({}, state, action.value);
    console.log('Final object here after loading sectiojn data',objret);
    return objret;  
   } 

   
   if(action.type==='LoadMenu')
   {
    
    console.log('Object returned after loading menu data', action.value)
    const objret= Object.assign({}, state, action.value);
    console.log('Final object here after loading menu data',objret);
    return objret;  
   }    

   if(action.type==='LoadSearch')
   {
    
    console.log('Object returned after loading search Results is', action.value)
    const objret= Object.assign({}, state, action.value);
    console.log('Final object here after loading searching results is',objret);
    return objret;  
   }  
   if(action.type==='LoadRest')
   {
    
    console.log('Object returned after loading restaurant Results is', action.value)
    const objret= Object.assign({}, state, action.value);
    console.log('Final object here after loading restaurant results is',objret);
    return objret;  
   }   //UpcomingOrder
   if(action.type==='UpcomingOrder')
   {
    
    console.log('Object returned after loading upcoming order Results is', action.value)
    const objret= Object.assign({}, state, action.value);
    console.log('Final object here after loading upcoming order results is',objret);
    return objret;  
   }  
   
   
   return state
    }
    
    export default reducer;