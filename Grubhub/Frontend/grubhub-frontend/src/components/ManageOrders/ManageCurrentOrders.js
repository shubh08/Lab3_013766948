import React, {Component} from 'react';
import './ManageCurrentOrders.css'
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import PastOrder from './PastOrder';




//upComingOrder
class ManageCurrentOrders extends Component{

  constructor(props){
    super(props)
    this.state={
      orderState:"",
      pastOrderView:false
    }

  }




  componentWillMount(){

    let owner_id = localStorage.getItem('owner_id')
    

     this.props.upComingRestaurantOrder({id:owner_id});

     
     }

     setPastView=()=>{
       this.setState({
        pastOrderView:!this.state.pastOrderView
       })
     }

     valueChange=(event)=>{
      const {name,value} = event.target;
    this.setState({
        [name]:value
    });

     }

       openMessages = (id)=>{
      let div = document.getElementById(id);
    console.log('Inside Load Message', div);
    if (div.style.display === "none") {
      div.style.display = "block";
    }
  }

  sendMessage = (orderid)=>{
    let owner_id = localStorage.getItem('owner_id')
     console.log('The message to be sent is',this.state.message)
     this.props.sendMessageProps({type:'Owner',order_id:orderid,message:this.state.message,id:owner_id});

    }


     changeOrderState = (orderid)=>{
      let owner_id = localStorage.getItem('owner_id')
      console.log('Order State is',this.state.orderState,orderid)
      this.props.changeOrderStateProps({status:this.state.orderState,id:owner_id,order_id:orderid});

     }
    render(){

    console.log('Upcoming Orders::',this.props.upComingRestaurantOrderData)
    let orders = ""
    if(this.props.upComingRestaurantOrderData.length>0){
    orders  =  this.props.upComingRestaurantOrderData.map((element)=>{
      if((element.status==='New')||(element.status==='Preparing')||(element.status==='Ready')) {
               
  return <div>
    <h4><b>Customer Name:</b>{element.cust_fname} {element.cust_lname} <b><i>Order ID : {element._id} </i></b></h4> 
    <p>Customer Address:{element.cust_address}</p>
   
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

    
return  <tr>
<td>{elem.menu_name}</td>
<td>{elem.menu_price}</td>
<td>{elem.quantity}</td>

</tr>
  })}
  
</tbody>
</table>

Status:<font color="red">{element.status}</font>  
  <br></br>
  Total : <b>${element.order_total}</b>
 <br></br>

<form>
<div class="form-group">
<label for="inputState">Change Order Status</label>
      <select id="inputState" class="form-control" name="orderState" onChange={this.valueChange}>
        <option selected>Choose...</option>
        <option value="Preparing">Preparing</option>
        <option value="Ready">Ready</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancel">Cancel</option>
      </select>
  </div>

</form>
<button class="btn btn-danger" onClick={()=>this.changeOrderState(element._id)}>Submit</button>
<br/> <br/>
<button class="btn btn-danger" onClick={()=>this.openMessages(element._id)}>View Messages</button>
  
  <div id={element._id} style={{ display: 'none' }}>
  
  {element.messages.map((elem)=>{
return <div>
  {elem.type=='Owner'?<p><b>You</b>: {elem.message}</p>:<p><b>Customer</b>: {elem.message}</p>}
</div>
  })}

  <textarea name="message" onChange={this.valueChange} placeholder="Type your message here!!" ></textarea> <br/>
  <button class="btn btn-primary" onClick={()=>this.sendMessage(element._id)}>Send Message</button>
  </div>
<br></br><br/>


<hr/>
  </div>
      }
      })}
      else{
        orders = <h3>No Orders yet!!</h3>
      }
        return(  <div class="content">
      {this.state.pastOrderView==true?<PastOrder pastData={ this.props.upComingRestaurantOrderData} switchback={this.setPastView}></PastOrder>: <div>  <h2><b>Your Upcoming Orders!!</b> <button class="btn btn-danger" orderData={this.props.upComingRestaurantOrderData} onClick={this.setPastView}>View Past Orders</button></h2> 
         
 
 {orders}

</div>
}  
      </div>)
       

    }


}




const mapState = (store) =>{
  console.log('Past Orders',store)
    return{
      upComingRestaurantOrderData:store.upComingRestaurantOrderData,
      loginStatus:store.loginStatus,
      objLogin:store.objLogin,
      updateSuccess:store.updateSuccess
    }
  }
  


  const mapDispach = (dispach) =>{
  return{
    valueChangeObserver:(e) => dispach(actions.valueMapper(e)),
    loadProfileData:(data)=>dispach(actions.loadProfileData(data)),
    changeOrderStateProps:(data)=>dispach(actions.changeOrderStateProps(data)),
    upComingRestaurantOrder:(data)=>dispach(actions.upComingRestaurantOrder(data)),
    sendMessageProps:(data)=>dispach(actions.sendMessage(data))
    // decAge:() => dispach({type:'Agedo'})
  }
  }
  
  
export default connect(mapState,mapDispach) (ManageCurrentOrders);

