
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sectionSchema = new Schema({
    section_name:String,
    section_description:String,
  });



var restSchema = new Schema({
  owner_email: String,
  owner_hash: String,
  owner_image:String,
  owner_number:String,
  owner_fname: String,
  owner_lname:String,
  rest_name:String,
  rest_zipcode:String,
  rest_image:String,
  rest_cuisine:String,
  sections:[],
});




var Restaurant = mongoose.model('Restaurant', restSchema);


module.exports = Restaurant;