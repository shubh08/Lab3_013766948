import React, {Component} from 'react';
import './CustomerHome.css';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';


class CustomerHome extends Component{


    reDirect = ''
    constructor(){
  
      super();
  
      this.state={
          searchBox:"",
          reDirect:""
          }
          
  }
  
  
  
  valueChangedHandler=(event)=>{
    const {name,value} = event.target;
    this.setState({
        [name]:value
    });
  }
  
  
  
  search = ()=>{
    let reDirect= <Redirect to={{
        pathname: '/customer/search',
        state: { searchBox: this.state.searchBox 
        }
    }}
    />
    
    this.setState({
    reDirect:reDirect
    })
    
  
  }
  
  
  
  
  
    componentWillMount(){
  
//   let restaurant_id = localStorage.getItem('restaurant_id')
  
//    this.props.loadSectionData({id:restaurant_id});
   
   }
  
   componentDidMount(){
  
    //   let restaurant_id = localStorage.getItem('restaurant_id')
      
    //   this.setState({
    //       restaurant_id:restaurant_id
    //   })
       
       }
  
      
      render(){
          let redirectVar = null;
        if(!localStorage.getItem('cust_id')){
          
            redirectVar = <Redirect to= "/"/>
        }
  
 
  
       
          return( <div>
                {this.state.reDirect}
              <div class="section">
              
              <div class="logSection">

                <div class="searchBox">
                    <form>
                    <div class="form-group">
    
    <input type="text" class="form-control" id="searchBox" name="searchBox" placeholder="Search Dishes" onChange={this.valueChangedHandler}/>
  </div>
                    </form>
                    <button class="btn btn-primary" onClick={this.search}>Search</button>
                </div>

              </div>
              </div>
              </div>)
         
  
      }
  
  
  

}


const mapState = (store) =>{
  console.log('CustomerProfile Props',store)
    return{
  
      loginStatus:store.loginStatus,
      objLogin:store.objLogin,
      updateSuccess:store.updateSuccess
    }
  }
  


  const mapDispach = (dispach) =>{
  return{
    loadProfileData:(data)=>dispach(actions.loadProfileData(data)),
    searchDishes:(data)=>dispach(actions.searchDishes(data)),
    // decAge:() => dispach({type:'Agedo'})
  }
  }
  
  
export default connect(mapState,mapDispach) (CustomerHome);
