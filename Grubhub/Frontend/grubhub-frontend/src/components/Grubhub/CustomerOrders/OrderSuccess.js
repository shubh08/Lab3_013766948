import React, {Component} from 'react';
import './Order.css'
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import * as actions from '../../actions/actions';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import PastOrder from './PastOrder';





class OrderSuccess extends Component{

  constructor(props){
    super(props)
    this.state={
      orderState:"",
      pastOrderView:false,
      flag:false,
      redirect:null,
    }

  }


  componentWillMount(){
    
    console.log('This props location value',this.props.location.state)

    if(this.props.location.state)
    {
        console.log('Here in the OrderSucess success')
        this.setState({
            flag:this.props.location.state.flag
        })
        
         this.props.ChangeSuccess();
    }
   
    else{
        console.log('Here in the OrderSucess failure')
        this.setState({
            redirect:<Redirect to="/" />
        })
    }

     
     }


    
    render(){

    
      
        return(  <div>
            {this.state.redirect}
        <div class="container">
            <div class="jumbotron">\
            <div  align="center">
                <h3><font color="green">Your Order Was Successfull!</font></h3>
                <Link to="/customer/manageCustomer/upcomingOrder">Track Your Order</Link>
                </div>
            </div>
        </div>
      </div>)
       

    }


}




const mapState = (store) =>{
  console.log('Past Orders',store)
    return{
    
      updateSuccess:store.updateSuccess
    }
  }
  


  const mapDispach = (dispach) =>{
  return{
    valueChangeObserver:(e) => dispach(actions.valueMapper(e)),
    loadProfileData:(data)=>dispach(actions.loadProfileData(data)),
    ChangeSuccess:()=>dispach(actions.ChangeSuccess()),
    // decAge:() => dispach({type:'Agedo'})
  }
  }
  
  
export default connect(mapState,mapDispach) (OrderSuccess);

