
import axios from 'axios'
import cookie from 'react-cookies'
import { graphql } from 'react-apollo';

import {reactAddress} from '../../global/globalVar'

export const valueMapper = (e) =>{
    return {type:'ValueChange',value:e};
}


export const loginAsync = (obj) =>{
    console.log('Herere in Async',obj);

    if(obj.type==='customer'){
        localStorage.setItem("cust_id",obj._id);
        localStorage.setItem("cust_email",obj.cust_email);
        localStorage.setItem("cust_fname",obj.cust_fname);
        localStorage.setItem("cust_lname",obj.cust_lname);
    }

    else{
        localStorage.setItem("owner_id",obj._id);
        localStorage.setItem("owner_email",obj.owner_email);
        localStorage.setItem("owner_fname",obj.owner_fname);
        localStorage.setItem("owner_lname",obj.owner_lname);
    }
                   
    localStorage.setItem("JCT",obj.token);
    
    return {type:'Login',value:obj};
}


export const loadProfileDataAsync = (obj) =>{
    console.log('Herere in Async',obj);
  
    return {type:'LoadProfileData',value:obj};
}


export const loadProfileData = (data) =>{
    console.log('Preapring for Launch',data)
    let accessToken = localStorage.getItem('JCT')
    return dispatch =>{
    axios.defaults.withCredentials = true;
    console.log('Addres defined'+reactAddress+'loadProfileData');
    axios.post(reactAddress+'loadProfileData',data)
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(loadProfileDataAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    dispatch(loadProfileDataAsync({
                        authFlag : true,
                        loginStatus:'success',
                        ...response.data
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(loadProfileDataAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}

//updateProfileData
export const updateProfileDataAsync = (obj) =>{
    console.log('Herere in Async',obj);
    return {type:'UpdateProfile',value:obj};
}


export const updateProfileData = (data) =>{
    console.log('Preapring for Launch update',data)
    let accessToken = localStorage.getItem('JCT')
    return dispatch =>{
    axios.defaults.withCredentials = true;
    axios.post(reactAddress+'update',data,{headers:{Authorization:accessToken}})
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(updateProfileDataAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    dispatch(updateProfileDataAsync({
                        authFlag : true,
                        loginStatus:'success',
                        updateSuccess:true,
                        ...response.data
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(updateProfileDataAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}


export const login = (data) =>{
    console.log('Preapring for Launch',data)
    return dispatch =>{
    //set the with credentials to true
    axios.defaults.withCredentials = true;

    //make a post request with the user data
    axios.post(reactAddress+'signin',data)
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(loginAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    dispatch(loginAsync({
                        authFlag : true,
                        loginStatus:'success',
                        ...response.data,
                        
                        
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(loginAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}

export const signUpAsync = (obj) =>{
    console.log('Here in Async',obj);
    return {type:'CustSignup',value:obj};
}


export const signUp = (data) =>{
    console.log('Preapring for Signup',data)
    return dispatch =>{
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    
    //make a post request with the user data
    axios.post(reactAddress+'signup',data)
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(signUpAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    dispatch(signUpAsync({
                        authFlag : true,
                        loginStatus:'success'
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(signUpAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}

//load Section Data
export const loadSectionDataAsync = (obj) =>{
    console.log('Here in Async',obj);
    return {type:'LoadSection',value:obj};
}


export const loadSectionData = (data) =>{
    console.log('Preapring for Launch Section Data',data)
    let accessToken = localStorage.getItem('JCT')
    return dispatch =>{
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    
    //make a post request with the user data
    axios.post(reactAddress+'loadSectionData',data,{headers:{Authorization:accessToken}})
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(loadSectionDataAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    dispatch(loadSectionDataAsync({
                        authFlag : true,
                        loginStatus:'success',
                        sectionData:response.data.sectionData
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(loadSectionDataAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}

//addSectionData


export const addSectionDataAsync = (obj) =>{
    console.log('Here in Async',obj);
    return {type:'LoadSection',value:obj};
}


export const addSectionData = (data) =>{
    console.log('Preapring for Launch Add Section Data',data)
    let accessToken = localStorage.getItem('JCT')
    return dispatch =>{
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    
    //make a post request with the user data
    axios.post(reactAddress+'addSection',data ,{headers:{Authorization:accessToken}})
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(addSectionDataAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    dispatch(addSectionDataAsync({
                        authFlag : true,
                        loginStatus:'success',
                        sectionData:response.data.sectionData
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(addSectionDataAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}



//updateSection   

export const updateSectionData = (data) =>{
    let accessToken = localStorage.getItem('JCT')
    console.log('Preapring for Launch Update Section Data',data)
    return dispatch =>{
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    
    //make a post request with the user data
    axios.post(reactAddress+'updateSection',data,{headers:{Authorization:accessToken}})
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(addSectionDataAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    dispatch(addSectionDataAsync({
                        authFlag : true,
                        loginStatus:'success',
                        sectionData:response.data.sectionData
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(addSectionDataAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}



//loadMenuData

export const loadMenuDataAsync = (obj) =>{
    console.log('Here in Async',obj);
    return {type:'LoadMenu',value:obj};
}


export const loadMenuData = (data) =>{
    let accessToken = localStorage.getItem('JCT')
    console.log('Preapring for Launch Load Menu Data',data)
    return dispatch =>{
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    
    //make a post request with the user data
    axios.post(reactAddress+'loadMenu',data,{headers:{Authorization:accessToken}})
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(loadMenuDataAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    dispatch(loadMenuDataAsync({
                        authFlag : true,
                        loginStatus:'success',
                        menuData:response.data.menuData
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(loadMenuDataAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}


//ChangeSuccess

export const ChangeSuccess = () =>{
    console.log('Changing Order Success Flag')
    return {type:'LoadMenu',value:{orderSuccess:false}};
}



//addMenuData


export const addMenuDataAsync = (obj) =>{
    console.log('Here in Async',obj);
    return {type:'LoadMenu',value:obj};
}


export const addMenuData = (data) =>{
    let accessToken = localStorage.getItem('JCT')
    console.log('Preapring for Launch Add Menu Data',data)
    return dispatch =>{
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    
    //make a post request with the user data
    axios.post(reactAddress+'addMenu',data,{headers:{Authorization:accessToken}})
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(addMenuDataAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    dispatch(addMenuDataAsync({
                        authFlag : true,
                        loginStatus:'success',
                        menuData:response.data.menuData
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(addMenuDataAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}
 

//update Menu   

export const updateMenuAsync = (obj) =>{
    console.log('Here in Async',obj);
    return {type:'LoadMenu',value:obj};
}


export const updateMenu = (data) =>{
    let accessToken = localStorage.getItem('JCT')
    console.log('Preapring for Launch Update Menu Data')
    return dispatch =>{
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    
    //make a post request with the user data
    axios.post(reactAddress+'updateMenu',data,{headers:{Authorization:accessToken}})
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(updateMenuAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    dispatch(updateMenuAsync({
                        authFlag : true,
                        loginStatus:'success',
                        menuData:response.data.menuData
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(updateMenuAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}




//delete Section   



export const deleteSectionDataAsync = (obj) =>{
    console.log('Here in Async',obj);
    return {type:'LoadMenu',value:obj};
}


export const deleteSectionData = (data) =>{
    console.log('Preapring for Launch Delete Section Data',data)
    let accessToken = localStorage.getItem('JCT')
    return dispatch =>{
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    
    //make a post request with the user data
    axios.post(reactAddress+'deleteSection',data,{headers:{Authorization:accessToken}})
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(deleteSectionDataAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    dispatch(deleteSectionDataAsync({
                        authFlag : true,
                        loginStatus:'success',
                        sectionData:response.data.sectionData
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(deleteSectionDataAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}


//delete Menu
 



export const deleteMenuAsync = (obj) =>{
    console.log('Here in Async',obj);
    return {type:'LoadMenu',value:obj};
}


export const deleteMenu = (data) =>{
    console.log('Preapring for Launch Delete Menu Data',data)
    let accessToken = localStorage.getItem('JCT')
    return dispatch =>{
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    
    //make a post request with the user data
    axios.post(reactAddress+'deleteMenu',data,{headers:{Authorization:accessToken}})
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(deleteMenuAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    dispatch(deleteMenuAsync({
                        authFlag : true,
                        loginStatus:'success',
                        menuData:response.data.menuData
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(deleteMenuAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}


 

//Search Dishes  

export const searchDishesAsync = (obj) =>{
    console.log('Here in Search Async',obj);
    return {type:'LoadSearch',value:obj};
}


export const searchDishes = (data) =>{
    console.log('Preapring for Launch Search Dishes',data)
    let accessToken = localStorage.getItem('JCT')
    return dispatch =>{
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    
    //make a post request with the user data
    axios.post(reactAddress+'searchDishes',data,{headers:{Authorization:accessToken}})
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(searchDishesAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    dispatch(searchDishesAsync({
                        authFlag : true,
                        loginStatus:'success',
                        searchData:response.data.searchData
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(searchDishesAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}

//Load Restaurant   


export const loadRestaurantAsync = (obj) =>{
    console.log('Here in Load Restaurant Async',obj);
    return {type:'LoadRest',value:obj};
}


export const loadRestaurant = (data) =>{
    console.log('Preparing for Load Restaurant',data)
    let accessToken = localStorage.getItem('JCT')
    return dispatch =>{
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    
    //make a post request with the user data
    axios.post(reactAddress+'loadRestaurant',data,{headers:{Authorization:accessToken}})
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(loadRestaurantAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    dispatch(loadRestaurantAsync({
                        authFlag : true,
                        loginStatus:'success',
                        restaurantData:response.data.restaurantData
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(loadRestaurantAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}

//order


export const orderAsync = (obj) =>{
    console.log('Here in order Async',obj);
    return {type:'UpcomingOrder',value:obj};
}


export const order = (data) =>{
    console.log('Preparing for order ',data)
    let accessToken = localStorage.getItem('JCT')
    return dispatch =>{
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    
    //make a post request with the user data
    axios.post(reactAddress+'order',data,{headers:{Authorization:accessToken}})
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(orderAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    dispatch(orderAsync({
                        authFlag : true,
                        loginStatus:'success',
                        orderSuccess:true
                        
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(orderAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}


// Load Past Orders



export const pastorderAsync = (obj) =>{
    console.log('Here in order Async',obj);
    return {type:'PastOrder',value:obj};
}


export const pastorder = (data) =>{
    console.log('Preparing for order ',data)
    let accessToken = localStorage.getItem('JCT')
    return dispatch =>{
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    
    //make a post request with the user data
    axios.post(reactAddress+'pastorder',data,{headers:{Authorization:accessToken}})
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(pastorderAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    dispatch(pastorderAsync({
                        authFlag : true,
                        loginStatus:'success',
                        restaurantData:response.data.restaurantData
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(pastorderAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}

//Load upComingOrder



export const upComingOrderAsync = (obj) =>{
    console.log('Here in order Async',obj);
    return {type:'UpcomingOrder',value:obj};
}


export const upComingOrder = (data) =>{
    console.log('Preparing for order ',data)
    let accessToken = localStorage.getItem('JCT')
    return dispatch =>{
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    
    //make a post request with the user data
    axios.post(reactAddress+'upComingOrder',data,{headers:{Authorization:accessToken}})
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(upComingOrderAsync({
                        authFlag : false,
                        loginStatus:'failure',
                        orderSuccess:false
                    })) 
                }
               
                else{
                    dispatch(upComingOrderAsync({
                        authFlag : true,
                        loginStatus:'success',
                        upComingOrderData:response.data.dataOrder,
                        orderSuccess:false
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(upComingOrderAsync({
                authFlag : false,
                loginStatus:'failure',
                orderSuccess:false
            }))
            
        })
        
    }
}

//Load Restaurant Current Orders   



export const upComingRestaurantOrderAsync = (obj) =>{
    console.log('Here in upComingRestaurantOrderAsync Async',obj);
    return {type:'UpcomingOrder',value:obj};
}


export const upComingRestaurantOrder = (data) =>{
    console.log('Preparing for order ',data)
    let accessToken = localStorage.getItem('JCT')
    return dispatch =>{
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    
    //make a post request with the user data
    axios.post(reactAddress+'upComingRestaurantOrder',data,{headers:{Authorization:accessToken}})
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(upComingRestaurantOrderAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    dispatch(upComingRestaurantOrderAsync({
                        authFlag : true,
                        loginStatus:'success',
                        upComingRestaurantOrderData:response.data.upComingRestaurantOrder
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(upComingRestaurantOrderAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}

//SendMessage



export const sendMessage = (data) =>{
    console.log('Sending Message ',data)
    let accessToken = localStorage.getItem('JCT')
    return dispatch =>{
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    
    //make a post request with the user data
    axios.post(reactAddress+'sendMessage',data,{headers:{Authorization:accessToken}})
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(upComingRestaurantOrderAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    if(response.data.type=='Customer')
                    {
                        dispatch(upComingRestaurantOrderAsync({
                            authFlag : true,
                            loginStatus:'success',
                            upComingOrderData:response.data.dataOrder
                        }))
                    }

                    else{
                        dispatch(upComingRestaurantOrderAsync({
                            authFlag : true,
                            loginStatus:'success',
                            upComingRestaurantOrderData:response.data.upComingRestaurantOrder
                        }))
                    }
                 
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(upComingRestaurantOrderAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}



//Change Order State



export const changeOrderStateProps = (data) =>{
    console.log('Preparing for order ',data)
    let accessToken = localStorage.getItem('JCT')
    return dispatch =>{
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    
    //make a post request with the user data
    axios.post(reactAddress+'changeOrderState',data,{headers:{Authorization:accessToken}})
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(upComingRestaurantOrderAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    dispatch(upComingRestaurantOrderAsync({
                        authFlag : true,
                        loginStatus:'success',
                        upComingRestaurantOrderData:response.data.upComingRestaurantOrder
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(upComingRestaurantOrderAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}


//upload menu



export const uploadMenu = (data) =>{
    console.log('Preparing for image upload ',data)
    let accessToken = localStorage.getItem('JCT')
    return dispatch =>{
    //set the with credentials to true
    
    let fd = new FormData();

    const config = { headers: { 'Content-Type': 'multipart/form-data',Authorization:accessToken } };
    fd.append('image',data.image)  
    fd.append('section_name',data.section_name)  
    fd.append('id',data.id)
    fd.append('type',data.type)
    fd.append('menu_name_old',data.menu_name_old)

    console.log('Datadaa to be sent',fd)
    axios.defaults.withCredentials = true;
    
    //make a post request with the user data
    axios.post(reactAddress+'upload', fd, config)
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.status === 200){
                if(response.data.status==="failure")
                {
                    dispatch(upComingRestaurantOrderAsync({
                        authFlag : false,
                        loginStatus:'failure'
                    })) 
                }
               
                else{
                    dispatch(upComingRestaurantOrderAsync({
                        authFlag : true,
                        loginStatus:'success',
                        menuData:response.data.menuData,
                        ...response.data,
                    }))
                }
               
            }else{
               
            }
        }).catch(error => {
            console.log('Inside exception throw!!')
            dispatch(upComingRestaurantOrderAsync({
                authFlag : false,
                loginStatus:'failure'
            }))
            
        })
        
    }
}