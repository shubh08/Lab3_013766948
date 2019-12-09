import React, {Component} from 'react';
import './Order.css'
import {connect} from 'react-redux';
import * as actions from '../../actions/actions';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import PastOrder from './PastOrder';




//upComingOrder
class UpcomingOrder extends Component{

  constructor(props){
    super(props)
    this.state={
      orderState:"",
      pastOrderView:false,
      message:""
    }

  }


  componentWillMount(){



    let cust_id = localStorage.getItem('cust_id')
    
     this.props.upComingOrder({id:cust_id});

     
     }


     valueChange=(event)=>{
      const {name,value} = event.target;
    this.setState({
        [name]:value
    });

     }

     setPastView=()=>{
      this.setState({
       pastOrderView:!this.state.pastOrderView
      })
    }

    openMessages = (id)=>{
      let div = document.getElementById(id);
    console.log('Inside Load Message', div);
    if (div.style.display === "none") {
      div.style.display = "block";
    }

    else {
      div.style.display = "none";
    }
    }

    sendMessage = (orderid)=>{
     let cust_id = localStorage.getItem('cust_id')
      console.log('The message to be sent is',this.state.message)
      this.props.sendMessageProps({type:'Customer',order_id:orderid,message:this.state.message,id:cust_id});

     }

    render(){

    console.log('Upcoming Orders::',this.props.upComingOrderData)
    let orders = ""
    if(this.props.upComingOrderData.length>0){
     orders =  this.props.upComingOrderData.map((element)=>{
      if((element.status==='New')||(element.status==='Preparing')||(element.status==='Ready') ) {    
        console.log('Loading order item',element)     
  return <div> 
    <h2><b>Restaurant Name:</b>{element.rest_name} <b><i>Order ID : {element._id} </i></b></h2>
    <table class="table">
  <thead class="thead-dark">
    <tr>
      <th class="tableh">Item Name</th>
      <th class="tableh">Item Price</th>
      <th class="tableh">Item Quantity</th>
    </tr>
  </thead>
  <tbody> 
  
  {element.orderItems.map((elem)=>{
return <tr>
<td>{elem.menu_name}</td>
<td>{elem.menu_price}</td>
<td>{elem.quantity}</td>

</tr>
  })}
  
  </tbody></table>
  Status:<font color="red">{element.status}</font>  
  <br></br>
  Total : <b>${element.order_total}</b>
  
  <button class="btn btn-danger" onClick={()=>this.openMessages(element._id)}>View Messages</button>
  
  <div id={element._id} style={{ display: 'none' }}>
  
  {element.messages.map((elem)=>{
return <div>
  {elem.type=='Owner'?<p><b>Owner</b>: {elem.message}</p>:<p><b>You</b>: {elem.message}</p>}
</div>
  })}

  <textarea name="message" onChange={this.valueChange} placeholder="Type your message here!!" ></textarea>
  <br/>
  <button class="btn btn-primary" onClick={()=>this.sendMessage(element._id)}>Send Message</button>
  </div>
  
  <br></br><hr></hr>
   </div>}
      })
    }

    else{
      orders = <h3 >No Orders yet!!</h3>
    }
      
        return(  <div class="content">
          
    {this.state.pastOrderView==true?<PastOrder pastData={ this.props.upComingOrderData} switchback={this.setPastView}></PastOrder>: <div>
          <button class="btn btn-primary float-right" orderData={this.props.upComingOrderData} onClick={this.setPastView}>View Past Orders</button><h2><b>Your Upcoming Orders!!</b>  </h2>
          
 {orders}

    </div>}
      </div>)
       

    }


}




const mapState = (store) =>{
  console.log('Past Orders',store)
    return{
      upComingOrderData:store.upComingOrderData,
      loginStatus:store.loginStatus,
      objLogin:store.objLogin,
      updateSuccess:store.updateSuccess
    }
  }
  


  const mapDispach = (dispach) =>{
  return{
    valueChangeObserver:(e) => dispach(actions.valueMapper(e)),
    loadProfileData:(data)=>dispach(actions.loadProfileData(data)),
    upComingOrder:(data)=>dispach(actions.upComingOrder(data)),
    sendMessageProps:(data)=>dispach(actions.sendMessage(data))
    // decAge:() => dispach({type:'Agedo'})
  }
  }
  
  
export default connect(mapState,mapDispach) (UpcomingOrder);

