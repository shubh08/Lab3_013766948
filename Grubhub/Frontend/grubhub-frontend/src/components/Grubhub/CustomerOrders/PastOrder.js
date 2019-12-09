import React, {Component} from 'react';
import './Order.css'

class PastOrder extends Component{

constructor(props)
{
    super(props)
}

render(){



    console.log('Past Orders::',this.props.pastData)
    let orders = ""
    if(this.props.pastData.length>0){
     orders =  this.props.pastData.map((element)=>{
    if((element.status==='Delivered')||(element.status==='Cancel')) {        
  return <div>  <h2><b>Restaurant Name:</b>{element.restname} <b><i>Order ID : {element._id} </i></b></h2>
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
  
  </tbody></table>
  Status:<font color="red">{element.status}</font>  
  <br></br>
  Total : <b>${element.order_total}</b>
  <br></br><hr></hr>

  </div>}

      })
    }
else{
  orders = <h3 >No Orders yet!!</h3>
}
    return(
        <div> 
          <div> <button class="btn btn-primary float-right" onClick={this.props.switchback}>View Current Orders</button>  </div>
        <h2 ><b>Your Past Orders!!</b> </h2>
       
 
 {orders}

        
        
            </div>

    )

}
}

export default PastOrder;