import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions'
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


class NavbarOwner extends Component {

  constructor(props){
    super(props)
    this.state=({
      owner_fname:"",
      owner_lname:""
    })
    }


    componentWillMount(){
      let owner_fname = localStorage.getItem('owner_fname')
      let owner_lname = localStorage.getItem('owner_lname')
      console.log('Owner Name',owner_fname,'sdsd',owner_lname)
      this.setState({
        owner_fname:owner_fname,
        owner_lname:owner_lname
      })
    }
  
 handleLogout = () => {
  localStorage.clear();
}


    render(){

      let redirectVar = null;
      if(!localStorage.getItem('owner_id')){
        console.log('loggin out owner id');
          redirectVar = <Redirect to= "/"/>
      }
        return(
        <div>
          {redirectVar}
        <nav class="navbar navbar-default navbar-fixed-top">
        
          <div class="navbar-header">
            
            <a class="navbar-brand navbar-left" href="/"><p><font color="red"><b>GRUBHUB</b></font></p></a>
          </div>
        
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown"><b>Hi {this.state.owner_fname}</b> <b class="caret"></b></a>
              <ul class="dropdown-menu">
                  <li><Link to="/restaurant/manage/profile"><span class="glyphicon glyphicon-user" ></span> Manage Profile</Link></li> 
                  <li><Link to="/restaurant/menuView"><span class="glyphicon glyphicon-eye-open" ></span> View Menu</Link></li>
                  <li><Link to="/restaurant/manageSection"><span class="glyphicon glyphicon-cog" ></span> Manage Restaurant</Link></li> 
                  {/* <li class="dropdown-submenu"> <a href="#" class="dropdown-toggle" data-toggle="dropdown">Manage Orders</a>
                  <ul class="dropdown-menu">
                          <li><Link to="/restaurant/manageOrders">Manage Past Orders</Link> </li>
                          <li><Link to="/restaurant/manageOrders">Manage Current Orders</Link></li>
                         
                        </ul>
                  </li>  */}
              
                  <li><Link to="/restaurant/manageCurrentOrders"><span class="glyphicon glyphicon-cog" ></span> Manage Current Orders</Link></li>
                  <li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-log-out" ></span> Logout</Link></li>
              </ul>
            </li>
          </ul>

          {/* <ul class="nav navbar-nav navbar-right">
           
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Settings<b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="#">Manage Account</a></li>
              </ul>
            </li>
          </ul> */}
        </div>
      
       
      </nav>
      </div>
   )
    }

}



const mapState = (store) =>{
  console.log('Navbar Props of the ownererr',store)
    return{
      owner_email:store.owner_email,
      owner_fname:store.owner_fname,
      owner_lname:store.owner_lname,
      loginStatus:store.loginStatus,
      objLogin:store.objLogin
    }
  }
  


  const mapDispach = (dispach) =>{
  return{
    valueChangeHandler:(e) => dispach(actions.valueMapper(e))
    // decAge:() => dispach({type:'Agedo'})
  }
  }

  export default connect(mapState,mapDispach) (NavbarOwner);

