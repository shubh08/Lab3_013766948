import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import cookie from 'react-cookies';

import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import './login.css';
import * as actions from '../actions/actions'
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { gql } from 'apollo-boost';

const signincust = gql`
mutation($email:String,$pass:String){
  signincust(email:$email,pass:$pass){  
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


class Login extends Component {

  constructor (props) {
    super(props);
    this.state={
      email:" ",
      pass:" ",
      type: 'customer'

    }

  }

valueChangedHandler = (event) => {
  // console.log('Event target', event.target)
   const { name, value } = event.target;
   this.setState({
     [name]: value
   });

   console.log('State status', this.state)
 }

  async submitLogin(e){
    e.preventDefault()
    console.log('Login in here!!!!!!!!!!!!!!!!!1')
    let {data} = await this.props.signincust({
      variables: {
    email:this.state.email,
    pass:this.state.pass
      },
      //efetchQueries: [{ query: signupQuery }]
  });

  console.log(data);
  if(data['signincust']==null)
  {
    alert('Invalid Credentials');
  }
  else
  {
    console.log('here after login!!!')
    console.log(data);
    alert('Customer Sign in Successfull!!');
    localStorage.setItem("cust_id",data['signincust']['id']);
    localStorage.setItem("cust_email",data['signincust']['cust_email']);
    localStorage.setItem("cust_fname",data['signincust']['cust_fname']);
    localStorage.setItem("cust_lname",data['signincust']['cust_lname']);
    
  }
  this.setState({})
  }

  render() {
    let redirectVar = null;

    if (localStorage.getItem('cust_id')) {
      redirectVar = <Redirect to="/customer/home" />
    }

    
    else if(localStorage.getItem('owner_id')){
      redirectVar = <Redirect to= "/restaurant/manage/profile"/>
  }
  

    console.log('Redirected', redirectVar);
    return (
      <div >
        {redirectVar}
        <nav class="navbar navbar-default navbar-fixed-top">

          <div class="navbar-header">
            <a class="navbar-brand navbar-left logo" href="/"><p><font color="red"><b>GRUBHUB</b></font></p></a>
          </div>

        </nav>
        <div className='logincontainer'>
          {this.props.loginStatus === 'failure' && <div id='invalidLogin'><p><font color="red">Hey Stranger! We don't recognize that login. Spell check your info and try again!</font></p></div>}
          <form onSubmit={(e) => this.submitLogin(e)}>
            <h3><b>Sign in with your Grubhub account</b></h3>
            <div className="form-group">
              <label for="cust_email">Email address</label>
              <input type="email" className="form-control" id="cust_email" name="email"  onChange={this.valueChangedHandler} placeholder="Enter email"  required="true"/>
            </div>
            <div className="form-group">
              <label for="cust_pass">Password</label>
              <input type="password" className="form-control" id="cust_pass" name="pass" placeholder="Password"  onChange={this.valueChangedHandler}   required="true"/>
            </div>
            <button type="submit"  className="btn btn-danger">Sign in</button>
          </form>

          <p id='account'><font><a href='signup'><b>Create your account</b></a></font></p>

        </div>
      </div>
    )
  }
}


export default compose(
  graphql(signincust, { name: "signincust" })
)(Login);
