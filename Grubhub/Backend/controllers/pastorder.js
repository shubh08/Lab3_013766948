const pastorder = (req, res, connPool) =>{
    console.log('Inside load Menu Data!!',req.body)
    const{id} = req.body;
    let resultOrder = {}
    connPool.getConnection((error,conn)=>{
       
         let loadPastOrderQuery = 'select * from orders where cust_id=?';
         console.log(loadPastOrderQuery);
         conn.query(loadPastOrderQuery,[id],(error,result)=>{
             if(error)
             {
                 throw error;
             }

             else{
                console.log('Load orders data',result);
                let loadPastOrderItemsQuery = 'select * from orders where order_id in (select order_id from orders_items where cust_id=?)';
                conn.query(loadPastOrderItemsQuery,[id],(error,resultOrderItems)=>{ 

                    if(error)
                    {
                        throw error;
                    }

                    else{
                        resultOrder = {}


                    }

                })
               
                             
             }
           
             
         })  
         conn.release();
 })
}


module.exports = {
    pastorder: pastorder
  };