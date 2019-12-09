import React, { Component } from 'react';
import './CustomerProfile.css';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import {reactAddress} from '../../global/globalVar'
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { gql } from 'apollo-boost';


const updateProfileCustomer = gql`
mutation($email:String,$fname:String,$lname:String){
  updateProfileCustomer(email:$email,fname:$fname,lname:$lname){  
      cust_email,
       cust_hash ,
       cust_image ,
       cust_fname,
       cust_lname,
       cust_address,
       cust_number,
       id
      }
}
`;





class CustomerProfile extends Component {


  constructor() {
    super();
    this.state = ({
      image: null
    })
    console.log('Inside Construtor!');
  }

  getUploadData = (e,type) => {
    e.preventDefault()
    console.log('type is', type);
    let loggedinID = localStorage.getItem('cust_id')
    console.log('Cookie', loggedinID)
    console.log('Object Value', this.props);
    let object = {
      fname: type === "name" ? this.props.cust_fname_holder : this.props.cust_fname,
      lname: type === "name" ? this.props.cust_lname_holder : this.props.cust_lname,
      email: type === "email" ? this.props.cust_email_holder : this.props.cust_email,
      pass: this.props.cust_pass,
      number: type === "number" ? this.props.cust_number_holder : this.props.cust_number,
      address: type === "address" ? this.props.cust_address_holder : this.props.cust_address,
      type: 'customer',
      id: loggedinID
    };

    return object;
  }

  componentWillMount() {

    let loggedinID = localStorage.getItem('cust_id')
    console.log('Cookie', loggedinID)
    this.props.loadProfileData({ id: loggedinID, type: 'customer' });

  }


 async updateProfileData(e){
  e.preventDefault()
  console.log('Login in here!!!!!!!!!!!!!!!!!1')
    let {data} = await this.props.updateProfileCustomer({
      variables: {
    email:this.state.email,
    pass:this.state.pass
      },
      //efetchQueries: [{ query: signupQuery }]
  });

  console.log(data);
  if(data['updateProfileCustomer']==null)
  {
    alert('Update Failure');
  }
 }
  ImageChangedHandler = (event) => {
    this.setState({
      image: event.target.files[0],
      loaded: 0,
    })

    console.log('State status', this.state)
  }

  imageUpload = (e, menu) => {

    let loggedinID = localStorage.getItem('cust_id')
    console.log('Cookie', loggedinID)


    e.preventDefault()

    let data = { image: this.state.image, menu_id: "", id: loggedinID, type: "Customer" }
    console.log('Data to be uploaded', data);
    this.props.uploadMenu(data);

  }

  changeName = () => {
    let div = document.getElementById("nameedit");
    console.log(div);
    if (div.style.display === "none") {
      div.style.display = "block";
    }

    else {
      div.style.display = "none";
    }

  }

  changeEmail = () => {
    let div = document.getElementById("emailEdit");
    console.log('Inside email', div);
    if (div.style.display === "none") {
      div.style.display = "block";
    }

    else {
      div.style.display = "none";
    }

  }

  changeNumber = () => {
    let div = document.getElementById("numberEdit");
    console.log('Inside number', div);
    if (div.style.display === "none") {
      div.style.display = "block";
    }

    else {
      div.style.display = "none";
    }

  }

  changeImage = () => {
    let div = document.getElementById("imageEdit");
    console.log('Inside number', div);
    if (div.style.display === "none") {
      div.style.display = "block";
    }

    else {
      div.style.display = "none";
    }

  }

  changeAddress = () => {
    let div = document.getElementById("addressEdit");
    console.log('Inside address', div);
    if (div.style.display === "none") {
      div.style.display = "block";
    }

    else {
      div.style.display = "none";
    }

  }


  render() {


    let redirectVar = null;


    console.log('Customer Email', this.props.cust_email)
    if (this.props.cust_email === "") {

      return <div />
    }
    if (!localStorage.getItem('cust_id')) {
      redirectVar = <Redirect to="/" />
    }


    console.log('Profile Object Name', this.props.cust_name);

    let defaultName = this.props.cust_fname + " " + this.props.cust_lname;

    let defaultEmail = this.props.cust_email;

    let defaultNumber = this.props.cust_number;


    return (<div>
      {redirectVar}
      <div class="content">
        <h3><b>Your Profile</b></h3>
        <br />
        <div >
          <div class='nameedit' >
            Name:
                <br />
            {/* <b> {this.props.name===""?this.props.objLogin.cust_name:this.props.objLogin.cust_name} </b> */}
            <b> {defaultName} </b>
            <a onClick={this.changeName} class='customALign'>Edit</a>
          </div>
          <div id='nameedit' style={{ display: 'none' }}>
            <form onSubmit={(e) => this.updateProfileData(this.getUploadData(e,"name"))} >
              <div class="form-group">
                <label for="cust_fname_holder">First Name:</label>
                <input type="text" class="form-control" id="cust_fname_holder" onChange={this.props.valueChangeObserver} name="cust_fname_holder" defaultValue={this.props.cust_fname} placeholder="Enter First Name" required />
              </div>
              <div class="form-group">
                <label for="cust_lname_holder">Last Name:</label>
                <input type="text" class="form-control" id="cust_lname_holder" onChange={this.props.valueChangeObserver} name="cust_lname_holder" defaultValue={this.props.cust_lname} placeholder="Enter Last Name" required />
              </div>
              <button type="submit" class="btn btn-success" >Update Name</button>
            &nbsp;  &nbsp;  &nbsp;
  <button class="btn btn-danger" style={{ display: 'inline-block' }} onClick={this.changeName}>Close</button>
            </form>
           
          </div>
        </div>
        <br />

        <hr />

        <div>
          <div class='imageEdit'>
            <div>
              Customer Image
                <br />
              <img src={reactAddress + this.props.cust_image} class="img1" style={{ height: "200px", width: "200px" }}></img>
              <a onClick={this.changeImage} class='customALign'>Edit</a>
            </div>
          </div>

          <div id='imageEdit' style={{ display: 'none' }}>
         
            <form onSubmit={(e, menu_id) => this.imageUpload(e, menu_id)} >
              <div class="form-group">
                Select image to upload:
    <input type="file" id="image" name="image" onChange={this.ImageChangedHandler} />
                <input type="submit" value="Upload Image" class="btn btn-success" name="submit" />
              </div>
            </form>

            <button class="btn btn-danger" style={{ display: 'inline-block' }} onClick={this.changeImage}>Close</button>
          </div>

        </div>
        <br />
        <hr></hr>
        <div>
          <div class='emailedit'>
            <div>
              Email
                <br />
              {/* <b> {this.props.email===""?this.props.objLogin.cust_email:this.props.email}</b> */}
              <b> {this.props.cust_email}</b>
              <a onClick={this.changeEmail} class='customALign'>Edit</a>
            </div>
          </div>
          <div id='emailEdit' style={{ display: 'none' }}>
            <form onSubmit={(e) => this.props.updateProfileData(this.getUploadData(e,"email"))} >
              <div class="form-group">
                <label for="cust_email_holder">Email address:</label>
                <input type="email" class="form-control" name="cust_email_holder" onChange={this.props.valueChangeObserver} defaultValue={defaultEmail} id="cust_email_holder"  required/>
              </div>
              <button type="submit" class="btn btn-success" >Update Email</button>
            &nbsp;  &nbsp;  &nbsp;
  <button class="btn btn-danger" style={{ display: 'inline-block' }} onClick={this.changeEmail}>Close</button>
            </form>
            
          </div>
        </div>
        <br />

        <hr />
        <div>
          <div class='numberEdit'>
            <div>
              Number
                <br />
              {/* <b> {this.props.number===""?this.props.objLogin.cust_number:this.props.number} </b> */}
              <b>{defaultNumber}</b>
              <a onClick={this.changeNumber} class='customALign'>Edit</a>
            </div>
          </div>

          <div id='numberEdit' style={{ display: 'none' }}>
            <form onSubmit={(e) => this.props.updateProfileData(this.getUploadData(e,"number"))}>
              <div class="form-group">
                <label for="cust_number_holder">Phone Number:</label>
                <input type="number" class="form-control" name="cust_number_holder" pattern="[0-9]{10}" title="10 Digits Only" onChange={this.props.valueChangeObserver} defaultValue={defaultNumber} id="cust_number_holder" required />
              </div>
              <button type="submit" class="btn btn-success" >Update Number</button>
            &nbsp;  &nbsp;  &nbsp;
  <button class="btn btn-danger" style={{ display: 'inline-block' }} onClick={this.changeNumber}>Close</button>
            </form>
          
          </div>

        </div>
        <br />

        <hr />


        <div class='addressEdit'>
          <div>
            Customer Address
                <br />

            <b>  {this.props.cust_address} </b>
            <a onClick={this.changeAddress} class='customALign'>Edit</a>

          </div>


          <div id='addressEdit' style={{ display: 'none' }}>
            <form onSubmit={(e) => this.props.updateProfileData(this.getUploadData(e,"address"))}>
              
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Enter Customer Address</label>
                <textarea class="form-control rounded-0" id="cust_address_holder" name="cust_address_holder" rows="4" onChange={this.props.valueChangeObserver} required></textarea>
              </div>
              <button type="submit" class="btn btn-success" >Update Address</button>
            &nbsp;  &nbsp;  &nbsp;
  <button class="btn btn-danger" style={{ display: 'inline-block' }} onClick={this.changeAddress}>Close</button>


            </form>
            
          </div>

        </div>


      </div> </div>)


  }


}


export default compose(
  graphql(updateProfileCustomer, { name: "updateProfileCustomer" })
)(CustomerProfile);


