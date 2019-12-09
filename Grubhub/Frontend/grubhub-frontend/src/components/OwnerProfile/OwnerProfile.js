import React, {Component} from 'react';
import './OwnerProfile.css';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import {reactAddress} from '../../global/globalVar'
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { gql } from 'apollo-boost';

const updateProfileOwner = gql`
mutation($email:String,$pass:String,$fname:String,$lname:String,$rest_name:String){
  updateProfileOwner(email:$email,pass:$pass){  
    owner_email,
    owner_hash,
    owner_image,
    owner_number,
    owner_fname,
    owner_lname,
    rest_name,
    rest_zipcode,
    rest_image,
    rest_cuisine,
    id
      }
}
`;


class OwnerProfile extends Component{


constructor(){
super();
this.state=({
  image: null
})
console.log('Inside Construtor!');
}

async updateProfile(e)
{
  e.preventDefault()
    let {data} = await this.props.updateProfileOwner({
      variables: {
    email:this.state.email,
    pass:this.state.pass
      },
      //efetchQueries: [{ query: signupQuery }]
  });

  console.log(data);
  if(data['updateProfileOwner']==null)
  {
    alert('Update Failure');
  }
}

getUploadData = (e,type)=>{
  e.preventDefault();
  console.log('type is',type);
  let loggedinID = localStorage.getItem('owner_id')
  console.log('Cookie',loggedinID)
  console.log('Object Value hererere',this.props);
  let object = {
    fname:type==="name"?this.props.owner_fname_holder:this.props.owner_fname,
    lname:type==="name"?this.props.owner_lname_holder:this.props.owner_lname ,
    email:type==="email"?this.props.owner_email_holder:this.props.owner_email ,
    number:type==="number"?this.props.owner_number_holder:this.props.owner_number,
    owner_image:type==="ownerimage"?this.props.owner_image_holder:this.props.owner_image,
    type:'owner',
    rest_name:type==="restname"?this.props.rest_name_holder:this.props.rest_name,
    rest_zipcode:type==="restzip"?this.props.rest_zipcode_holder:this.props.rest_zipcode,
    rest_image:type==="restimage"?this.props.rest_image_holder:this.props.rest_image,
    rest_cuisine:type==="restcuisine"?this.props.rest_cuisine_holder:this.props.rest_cuisine,
    id:loggedinID
};
console.log('final object to send to db for owner profile updatehererere',object);
  return object;
}

componentWillMount(){

   let loggedinID = localStorage.getItem('owner_id')
 console.log('Cookie',loggedinID)
this.props.loadProfileData({id:loggedinID,type:'owner'});

}
ImageChangedHandler = (event) => {
  this.setState({
    image: event.target.files[0],
    loaded: 0,
  })

  console.log('State status', this.state)
}
changeName=()=>{
    let div = document.getElementById("nameedit");
    console.log(div);
  if (div.style.display === "none") {
    div.style.display = "block";
  } 

  else {
    div.style.display = "none";
  }

}

changeImage=()=>{
  let div = document.getElementById("imageedit");
  console.log(div);
if (div.style.display === "none") {
  div.style.display = "block";
} 

else {
  div.style.display = "none";
}

}

changeRestImage=()=>{
  let div = document.getElementById("imageRestedit");
  console.log(div);
if (div.style.display === "none") {
  div.style.display = "block";
} 

else {
  div.style.display = "none";
}

}

imageUpload = (e, menu) => {

  let loggedinID = localStorage.getItem('owner_id')
  console.log('Cookie',loggedinID)

 
  e.preventDefault()

  let data = { image: this.state.image, menu_id: "",id:loggedinID,type:"Owner" }
  console.log('Data to be uploaded', data);
this.props.uploadMenu(data);

}

imageRestUpload = (e, menu) => {

  let loggedinID = localStorage.getItem('restaurant_id')
  let loggedOwnerID = localStorage.getItem('owner_id')
  console.log('Cookie',loggedinID)

 
  e.preventDefault()

  let data = { image: this.state.image, menu_id: "",id:loggedOwnerID,restid:loggedinID,type:"Restaurant" }
  console.log('Data to be uploaded', data);
this.props.uploadMenu(data);

}


changeEmail=()=>{
    let div = document.getElementById("emailEdit");
    console.log('Inside email',div);
  if (div.style.display === "none") {
    div.style.display = "block";
  } 

  else {
    div.style.display = "none";
  }

}



changeRestName=()=>{
    let div = document.getElementById("restedit");
    console.log('Inside number',div);
  if (div.style.display === "none") {
    div.style.display = "block";
  } 

  else {
    div.style.display = "none";
  }

}

changeRestZip=()=>{
    let div = document.getElementById("restzip");
    console.log('Inside number',div);
  if (div.style.display === "none") {
    div.style.display = "block";
  } 

  else {
    div.style.display = "none";
  }

}


changeRestCuisine=()=>{
    let div = document.getElementById("restcuisine");
    console.log('Inside number',div);
  if (div.style.display === "none") {
    div.style.display = "block";
  } 

  else {
    div.style.display = "none";
  }

}


changeNumber=()=>{
    let div = document.getElementById("numberEdit");
    console.log('Inside number',div);
  if (div.style.display === "none") {
    div.style.display = "block";
  } 

  else {
    div.style.display = "none";
  }

}

    render(){




     let redirectVar=null

      console.log('Customer Email',this.props.owner_email)
      if (this.props.owner_email==="") {
        
        return <div />
    }

    if(!localStorage.getItem('owner_id')){
        console.log('Not logged in owner')
        redirectVar = <Redirect to= "/"/>
    }
  

    console.log('Profile Object Name',this.props.cust_name);

    let defaultName = this.props.owner_fname +" "+this.props.owner_lname ;

    let defaultEmail = this.props.owner_email;

    let defaultNumber = this.props.owner_number;
    

        return( <div>  <div class="content">
        <h3><b>Your Profile</b></h3>
        <br/>
        <div >
            <div class='nameedit' >
                Name:
                <br/>
              {/* <b> {this.props.name===""?this.props.objLogin.cust_name:this.props.objLogin.cust_name} </b> */}
               <b> {defaultName} </b>
                <a onClick={this.changeName} class='customALign'>Edit</a>
            </div>
            <div id='nameedit' style={{display : 'none'}}>
            <form onSubmit= {(e)=>this.props.updateProfileData(this.getUploadData(e,"name"))}>
  <div class="form-group">
    <label for="owner_fname_holder">First Name:</label>
    <input type="text" class="form-control" id="owner_fname_holder" onChange = {this.props.valueChangeObserver} name="owner_fname_holder" defaultValue={this.props.owner_fname} placeholder="Enter First Name" required/>
  </div>
  <div class="form-group">
    <label for="owner_lname_holder">Last Name:</label>
    <input type="text" class="form-control" id="owner_lname_holder" onChange = {this.props.valueChangeObserver} name="owner_lname_holder" defaultValue={this.props.owner_lname} placeholder="Enter Last Name" required/>
  </div>
  <button type="submit" class="btn btn-success"  >Update Name</button> 
  &nbsp;  &nbsp;  &nbsp;
  <button class="btn btn-danger" style={{display: 'inline-block'}} onClick={this.changeName}>Close</button>
</form>

 
            </div>
        </div>
        <br/>
      
        <hr/>
        <div >
            <div class='imageedit' >
                Image:
                <br/>
              {/* <b> {this.props.name===""?this.props.objLogin.cust_name:this.props.objLogin.cust_name} </b> */}
              <img src={reactAddress + this.props.owner_image} style={{ height: "200px", width: "200px" }}></img>
                <a onClick={this.changeImage} class='customALign'>Edit</a>
            </div>
            <div id='imageedit' style={{display : 'none'}}>
            <form onSubmit={(e, menu_id) => this.imageUpload(e, menu_id )}>
            <div class="form-group">
            Select image to upload:
    <input type="file" id="image" name="image" onChange={this.ImageChangedHandler} />
           
         </div>
         <input type="submit" value="Upload Image" class="btn btn-success" name="submit" />
         &nbsp;  &nbsp;  &nbsp;
  <button class="btn btn-danger" style={{display: 'inline-block'}} onClick={this.changeImage}>Close</button>
</form>

            </div>
        </div>
        <br></br>
        <hr></hr>
        <div >
            <div class='imageRestedit' >
                Restaurant Image:
                <br/>
              {/* <b> {this.props.name===""?this.props.objLogin.cust_name:this.props.objLogin.cust_name} </b> */}
              <img src={reactAddress + this.props.rest_image} style={{ height: "200px", width: "200px" }}></img>
                <a onClick={this.changeRestImage} class='customALign'>Edit</a>
            </div>
            <div id='imageRestedit' style={{display : 'none'}}>
            <form onSubmit={(e, menu_id) => this.imageRestUpload(e, menu_id )}>
            <div class="form-group">
            Select image to upload:
    <input type="file" id="image" name="image" onChange={this.ImageChangedHandler} />
           
         </div>
         <input type="submit" value="Upload Image" class="btn btn-success" name="submit" />
         &nbsp;  &nbsp;  &nbsp;
  <button class="btn btn-danger" style={{display: 'inline-block'}} onClick={this.changeRestImage}>Close</button>
</form>
 
            </div>
        </div>
        <br></br>
        <hr></hr>


        <div>
        <div class='emailedit'>
            <div>
                Email
                <br/>
               {/* <b> {this.props.email===""?this.props.objLogin.owner_email:this.props.email}</b> */}
               <b> {this.props.owner_email}</b>
                <a onClick={this.changeEmail} class='customALign'>Edit</a>
            </div>
        </div>
        <div id='emailEdit' style={{display : 'none'}}>
            <form onSubmit = {(e)=>this.props.updateProfileData(this.getUploadData(e,"email"))}>
  <div class="form-group">
    <label for="owner_email_holder">Email address:</label>
    <input type="email" class="form-control" name="owner_email_holder" onChange = {this.props.valueChangeObserver}  defaultValue={defaultEmail} id="owner_email_holder" required/>
  </div>
  <button type="submit" class="btn btn-primary" >Update Email</button>
  &nbsp;  &nbsp;  &nbsp;
  <button class="btn btn-danger" style={{display: 'inline-block'}} onClick={this.changeEmail}>Close</button>
</form>

            </div>
        </div>
        <br/>
      
        <hr/>
        <div>
        <div class='numberEdit'>
            <div>
                Number
                <br/>
               {/* <b> {this.props.number===""?this.props.objLogin.owner_number:this.props.number} </b> */}
               <b>{defaultNumber}</b>
                <a onClick={this.changeNumber} class='customALign'>Edit</a>
            </div>
        </div>

        <div id='numberEdit' style={{display : 'none'}}>
            <form onSubmit = {(e)=>this.props.updateProfileData(this.getUploadData(e,"number"))}>
  <div class="form-group">
    <label for="owner_number_holder">Phone Number:</label>
    <input type="number" class="form-control" name="owner_number_holder" pattern="[0-9]{10}" title="10 Digits Only" onChange = {this.props.valueChangeObserver}  defaultValue={defaultNumber} id="owner_number_holder" required/>
  </div>
  <button type="submit" class="btn btn-success" >Update Number</button>
  &nbsp;  &nbsp;  &nbsp;
  <button class="btn btn-danger" style={{display: 'inline-block'}} onClick={this.changeNumber}>Close</button>
</form>

            </div>

        </div>

        <br/>
      
      <hr/>
        <div >
            <div class='restedit' >
                Restaurant Name:
                <br/>
              {/* <b> {this.props.name===""?this.props.objLogin.cust_name:this.props.objLogin.cust_name} </b> */}
               <b> {this.props.rest_name} </b>
                <a onClick={this.changeRestName} class='customALign'>Edit</a>
            </div>
            <div id='restedit' style={{display : 'none'}}>
            <form onSubmit = {(e)=>this.props.updateProfileData(this.getUploadData(e,"restname"))}>
  <div class="form-group">
    <label for="rest_name_holder">Restaurant Name:</label>
    <input type="text" class="form-control" id="rest_name_holder" onChange = {this.props.valueChangeObserver} name="rest_name_holder" defaultValue={this.props.rest_name} placeholder="Enter Restaurant Name" required/>
  </div>
  <button type="submit" class="btn btn-success" >Update Restaurant Name</button> 
  &nbsp;  &nbsp;  &nbsp;
  <button class="btn btn-danger" style={{display: 'inline-block'}} onClick={this.changeRestName}>Close</button>
</form>

            </div>
        </div>
        <br/>
      
      <hr/>
        <div >
            <div class='restzip' >
            Restaurant Zipcode:
                <br/>
             
               <b> {this.props.rest_zipcode} </b>
                <a onClick={this.changeRestZip} class='customALign'>Edit</a>
            </div>
            <div id='restzip' style={{display : 'none'}}>
            <form onSubmit = {(e)=>this.props.updateProfileData(this.getUploadData(e,"restzip"))}>
  <div class="form-group">
    <label for="rest_zipcode_holder">Restaurant Zipcode:</label>
    <input type="number" class="form-control" id="rest_zipcode_holder" onChange = {this.props.valueChangeObserver} name="rest_zipcode_holder" defaultValue={this.props.rest_zipcode} placeholder="Enter Restaurant ZipCode" required/>
  </div>
  <button type="submit" class="btn btn-success"  >Update Restaurant ZipCode</button> 
  &nbsp;  &nbsp;  &nbsp;
  <button class="btn btn-danger" style={{display: 'inline-block'}} onClick={this.changeRestZip}>Close</button>
</form>

            </div>
        </div>

        <br/>
      
      <hr/>
        <div >
            <div class='restcuisine' >
                Restaurant Cuisine:
                <br/>
              {/* <b> {this.props.name===""?this.props.objLogin.cust_name:this.props.objLogin.cust_name} </b> */}
               <b> {this.props.rest_cuisine} </b>
                <a onClick={this.changeRestCuisine} class='customALign'>Edit</a>
            </div>
            <div id='restcuisine' style={{display : 'none'}}>
            <form onSubmit = {(e)=>this.props.updateProfileData(this.getUploadData(e,"restcuisine"))}>
  <div class="form-group">
    <label for="rest_cuisine_holder">Restaurant Cuisine:</label>
    <input type="text" class="form-control" id="rest_cuisine_holder" onChange = {this.props.valueChangeObserver} name="rest_cuisine_holder" defaultValue={this.props.rest_cuisine} placeholder="Enter Restaurant Cuisine" required/>
  </div>
  <button type="submit" class="btn btn-success" >Update Cuisine</button> 
  &nbsp;  &nbsp;  &nbsp;
  <button class="btn btn-danger" style={{display: 'inline-block'}} onClick={this.changeRestCuisine}>Close</button>
</form>

            </div>
        </div>
      </div>
      </div>)
       

    }


}


export default compose(
  graphql(updateProfileOwner, { name: "updateProfileOwner" })
)(OwnerProfile);
  

