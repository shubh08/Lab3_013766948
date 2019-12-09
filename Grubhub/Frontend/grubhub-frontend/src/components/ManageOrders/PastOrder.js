import React, {Component} from 'react';
import './ManageCurrentOrders.css'

class PastOrder extends Component{

constructor(props)
{
    super(props)
}

render(){

    console.log('Upcoming Orders::',this.props.pastData)
    let orders = ""
    if(this.props.pastData.length>0){
    orders =  this.props.pastData.map((element)=>{
    if((element.status==='Delivered')||(element.status==='Cancel')) {        
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
return<tr>
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
  <br></br><br/><hr/>
  </div>}

      })}

      else{
        orders = <h3 >No Orders yet!!</h3>
      }

    return(
        <div>  <div ><button class="btn btn-danger" onClick={this.props.switchback}>View Current Orders</button>  </div>
        <h2 ><b>Your Past Orders!! </b></h2>
         
 
 {orders}

        
        
            </div>

    )

}
}

export default PastOrder;