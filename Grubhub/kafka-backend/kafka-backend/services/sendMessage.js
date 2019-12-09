
const Orders = require('../models/Orders');


function handle_request(msg, callback){
  console.log('Inside send Message ', msg)
  const {type,order_id,message,id} = msg;
  let messagedata = {type:type,message:message}

  Orders.update({_id:order_id}, { $push: { messages: messagedata  } }, {upsert: true}, function(err, docs){
    if (err) {
      console.log('error-->');
      callback(err,"Error");
  }
  else{
    callback(null, {success:true});
}
       
    });

};

exports.handle_request = handle_request;

