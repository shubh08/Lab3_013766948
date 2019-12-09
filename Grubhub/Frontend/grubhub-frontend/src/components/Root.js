import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Navbar from './Navbar/Navbar'
import Grubhub from './Grubhub/Grubhub';
import Signup from './Signup/Signup';
import ManageCustomer from './Manage/ManageCustomer'
import PastOrder from './Grubhub/CustomerOrders/PastOrder';
import UpcomingOrder from './Grubhub/CustomerOrders/UpcomingOrder';
import CustomerProfile from './CustomerProfile/CustomerProfile';
import NavbarOwner from './NavbarOwner/NavbarOwner';

import NavbarInitial from './NavbarInitial/NavbarInitial';
import OwnerLogin from './Login/OwnerLogin';
import OwnerSignup from './Signup/OwnerSignup';
import ManageRestaurant from './Grubhub/ManageRestaurant/ManageRestaurant';
import OwnerProfile from './OwnerProfile/OwnerProfile';
import ManageMenu from './Grubhub/ManageRestaurant/ManageMenu';
import ManageSection from './Grubhub/ManageRestaurant/ManageSection';
import ManageOrders from './ManageOrders/ManagePastOrders';
import ManagePastOrders from './ManageOrders/ManagePastOrders';
import ManageCurrentOrders from './ManageOrders/ManageCurrentOrders';
import CustomerHome from './CustomerHome/CustomerHome';
import CustomerSearch from './CustomerSearch/CustomerSearch';
import LoadRestaurant from './LoadRestaurant/LoadRestaurant';
import OrderSuccess from './Grubhub/CustomerOrders/OrderSuccess';
import MenuView from './ManageOrders/MenuView';

class Root extends Component {
    render(){
        return(
            <div>
                
                
                <Route path="/restaurant" component={NavbarOwner}/>
                <Route path="/restaurant/home" component={OwnerProfile}/>  
                

                <Route path="/restaurant/manageSection" component={ManageSection}/>   
                <Route path="/restaurant/managePastOrders" component={ManagePastOrders}/>  
                <Route path="/restaurant/manageCurrentOrders" component={ManageCurrentOrders}/>
                
                 
                <Route path="/restaurant/manage/menu" component={ManageMenu}/>      
                <Route path="/restaurant/menuView" component={MenuView}/>
                <Route path="/restaurant/manage/profile" component={OwnerProfile}/>  
              

                <Route exact path="/" component={NavbarInitial}></Route>
                <Route exact path="/buyer/login" component={Login}></Route>
                <Route exact path="/buyer/signup" component={Signup}></Route>
                <Route exact path="/owner/login" component={OwnerLogin}></Route>
                <Route exact path="/owner/signup" component={OwnerSignup}></Route>
                
                 <Route path="/customer" component={Navbar}/>
                 <Route path="/customer/home" component={CustomerHome}/>
                 <Route path="/customer/search" component={CustomerSearch}/> 
                 <Route path="/customer/loadRestaurant" component={LoadRestaurant}/>  

                <Route path="/customer/manageCustomer" component={ManageCustomer}/>
                <Route path="/customer/manageCustomer/pastOrder" component={PastOrder}/>
                <Route path="/customer/manageCustomer/upcomingOrder" component={UpcomingOrder}/>
                <Route path="/customer/OrderSuccess" component={OrderSuccess}/>
                <Route path="/customer/manageCustomer/customerProfile" component={CustomerProfile}/>

             
            </div>
        )
    }
}
//Export The Main Component
export default Root;