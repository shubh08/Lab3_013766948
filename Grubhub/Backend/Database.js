let mongoose = require('mongoose');

const connectionString='mongodb+srv://root:root@cluster0-bhnra.mongodb.net/test?retryWrites=true&w=majority'
class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(connectionString,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} )
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports = new Database()