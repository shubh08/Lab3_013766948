import React, {Component} from 'react';
import './signup.css';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions/actions'
import cookie from 'react-cookies';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { addOwnerMutation } from '../mutation/mutations';
import { gql } from 'apollo-boost';

const addCustomer = gql`
mutation($email:String!, $fname:String!, $lname: String!, $pass: String!) {
  addCustomer(email: $email, fname: $fname, lname: $lname, pass: $pass){
    cust_fname 
    }
  }
`

class Signup extends Component {
  constructor (props) {
    super(props);
    this.state={
      fname:"",
      lname:"" ,
      email: "",
      pass: "",
      type:'customer',
      signup:""
    }

  }

  
valueChangedHandler = (event) => {
   const { name, value } = event.target;
   this.setState({
     [name]: value
   });

   console.log('State status', this.state)
 }


    async signUp (e){
      e.preventDefault()
      console.log('Login in here!!!!!!!!!!!!!!!!!1')
      let {data} = await this.props.addCustomer({
        variables:{
            email: this.state.email,
            name: this.state.fname,
            lname: this.state.lname,
            fname:this.state.fname,
            pass : this.state.pass
        }
    });
    console.log(data);
    if(data['addCustomer']==null)
    {
      alert('Email ID already exists');
    }
    else
    {
      console.log('here after signup!!!')
      console.log(data);
      alert('Signup Successfull!!');
 
    }
    this.setState({})
    
    }
    render(){

        let signUpStatus ;
        let redirectVar = null;
        if (localStorage.getItem('cust_id')) {
          redirectVar = <Redirect to="/customer/home" />
        }

        
        else if(localStorage.getItem('owner_id')){
          redirectVar = <Redirect to= "/restaurant/manage/profile"/>
      }
        else if (this.props.loginStatus==='failure') {
            signUpStatus = <div id='invalidLogin'><h2><font color="red">Email id already exists!</font></h2></div>;
          }
          else if(this.props.loginStatus==='success')
        {  signUpStatus = <div id='invalidLogin'><p><font color="green">Account created successfully. Please login with your username and password!</font></p></div>
        document.getElementById('cust_signup').reset();
      }
     

    
          
        return(
           
             <div>      
               {redirectVar}
               <nav class="navbar navbar-default navbar-fixed-top">
        
        <div class="navbar-header">
          <a class="navbar-brand navbar-left logo" href="/"><p><font color="red"><b>GRUBHUB</b></font></p></a>
        </div>
    </nav>
                <div className='logincontainer'>
                {signUpStatus}
                    <form onSubmit = {(e)=>this.signUp(e)} id="cust_signup" >
                    <h2><b>Create your account</b></h2>
                <div className="form-row">
    <div className="form-group col-md-6">
    <label for="cust_fname">First name</label>
      <input type="text" class="form-control" id="cust_fname" name="fname" onChange = {this.valueChangedHandler} placeholder="First name" required/>
    </div>

    <div className="form-group col-md-6">
    <label for="cust_lname">Last name</label>
      <input type="text" class="form-control" id="cust_lname" name="lname" onChange = {this.valueChangedHandler} placeholder="Last name"  required/>
    </div>
</div>
      <div className="form-group">
          <label for="cust_email">Email address</label>
    <input type="email" className="form-control" id="cust_email" name="email" onChange = {this.valueChangedHandler} aria-describedby="emailHelp" placeholder="Enter email" required/>
          </div>      

          <div className="form-group">
          <label for="cust_pass">Password</label>
      <input type="password" className="form-control" id="pass" name="pass" onChange = {this.valueChangedHandler} placeholder="Password" required/>
          </div>  
          <button type="submit" className="btn btn-primary">Create your account</button>
          </form>
         
          <br></br>
          <p id='account'><font>Have an account? <a href='login'>Sign in</a></font></p>
          <p class="u-text-center caption"><span>By creating your Grubhub account, you agree to the</span> <a href="/legal/terms-of-use" target="_blank" rel="noopener">Terms of Use</a> <span>and</span> <a href="/legal/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>.</p>
                </div>
                </div>
        )
    }
}

// const mapState = (store) =>{
//     return{
//         cust_email:store.cust_email,
//         cust_pass:store.cust_pass,
//        cust_fname:store.cust_fname,
//        cust_lname:store.cust_lname,
//       loginStatus:store.loginStatus
//     }
//   }
  


//   const mapDispach = (dispach) =>{
//   return{
//     valueChangeHandler:(e) => dispach(actions.valueMapper(e)),
//     signUp:(dataSignup)=>dispach(actions.signUp(dataSignup))
//     // decAge:() => dispach({type:'Agedo'})
//   }
//   }
export default compose(
  graphql(addCustomer, { name: "addCustomer" })
)(Signup);
  
 // export default Signup;
