import React, {Component} from 'react';
import './signup.css';
import {connect} from 'react-redux';
import * as actions from '../actions/actions'
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { gql } from 'apollo-boost';



const addOwner = gql`
mutation($email:String,$fname:String,$lname:String,$restname:String,$zip:String,$pass:String,$cuisine:String){
  addOwner(email:$email,fname:$fname,lname:$lname,restname:$restname,zip:$zip,pass:$pass,cuisine:$cuisine){  
          owner_fname
      }
}
`;


class OwnerSignup extends Component {

  constructor (props) {
    super(props);
    this.state={
      fname:"",
      lname:"" ,
      email: "",
      pass:"",
      restname:"",
      zip:"",
      cuisine:"",
      type:'owner'
    }

  }

  valueChangedHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
 
    console.log('State status', this.state)
  }


    getDataSignup = (e)=>{

      e.preventDefault()
        return {
            fname:this.props.owner_fname,
            lname:this.props.owner_lname ,
            email: this.props.owner_email,
            pass: this.props.owner_pass,
            restname:this.props.rest_name,
            zip:this.props.rest_zipcode,
            type:'owner'
            
        }
    }

    async signUp (e){
      e.preventDefault()
      console.log('Login in here!!!!!!!!!!!!!!!!!1')
      let {data} = await  this.props.addOwner({
        variables: {
      email:this.state.email,
      fname:this.state.fname,
      lname:this.state.lname ,
      restname:this.state.restname,
      zip:this.state.zip,
      pass:this.state.pass,
      cuisine:this.state.cuisine
        },
        //efetchQueries: [{ query: signupQuery }]
    });

    console.log(data);
    if(data['addOwner']==null)
    {
      alert('Email ID already registered');
    }
    else
    {
      console.log('here after signup!!!')
      console.log(data);
      alert('Signup Successfull!!');
      // localStorage.setItem("cust_id",obj._id);
      //   localStorage.setItem("cust_email",obj.cust_email);
      //   localStorage.setItem("cust_fname",obj.cust_fname);
      //   localStorage.setItem("cust_lname",obj.cust_lname);
      
    }
    this.setState({})
    }

    render(){

        let signUpStatus ;
        let redirectVar = null;

        if(localStorage.getItem('owner_id')){
            redirectVar = <Redirect to= "/restaurant/manage/profile"/>
        }
        
        else if (localStorage.getItem('cust_id')) {
          redirectVar = <Redirect to="/customer/home" />
        }

        else if (this.props.loginStatus==='failure') {
            signUpStatus = <div id='invalidLogin'><h2><font color="red">Email id already exists!</font></h2></div>;
          }
          else if(this.props.loginStatus==='success')
        { signUpStatus = <div id='invalidLogin'><p><font color="green">Account created successfully. Please login with your username and password!</font></p></div> 
        document.getElementById('owner_signup').reset();}  

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
                    <form onSubmit = {(e)=>this.signUp(e)} id="owner_signup">
                    <h2><b>Create your account</b></h2>
                <div className="form-row">
    <div className="form-group col-md-6">
    <label for="owner_fname">First name</label>
      <input type="text" class="form-control" id="owner_fname" name="fname" onChange = {this.valueChangedHandler} placeholder="First name" required/>
    </div>

    <div className="form-group col-md-6">
    <label for="owner_lname">Last name</label>
      <input type="text" class="form-control" id="owner_lname" name="lname" onChange = {this.valueChangedHandler} placeholder="Last name"  required/>
    </div>
</div>
      <div className="form-group">
          <label for="owner_email">Email address</label>
    <input type="email" className="form-control" id="owner_email" name="email" onChange = {this.valueChangedHandler} placeholder="Enter email" required/>
          </div>      

          <div className="form-group">
          <label for="owner_pass">Password</label>
      <input type="password" className="form-control" id="owner_pass" name="pass" onChange = {this.valueChangedHandler} placeholder="Password" required/>
          </div>  
          <div className="form-group">
    <label for="rest_name">Restaurant Name</label>
    <input type="text" className="form-control" id="rest_name" name="name" onChange = {this.valueChangedHandler} placeholder="Enter Restaurant Name" required/>
  </div>
  <div className="form-group">
    <label for="rest_zipcode">Zipcode</label>
    <input type="number" className="form-control" id="rest_zipcode" name="zipcode"  onChange = {this.valueChangedHandler} placeholder="Zip Code" required/>
  </div>
  <div className="form-group">
    <label for="rest_cuisine">Cuisine</label>
    <input type="text" className="form-control" id="rest_cuisine" name="cuisine"  onChange = {this.valueChangedHandler} placeholder="Zip Code" required/>
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
//       owner_email:store.owner_email,
//       owner_pass:store.owner_pass,
//       owner_fname:store.owner_fname,
//       owner_lname:store.owner_lname,
//       loginStatus:store.loginStatus,
//       rest_name:store.rest_name,
//       rest_zipcode:store.rest_zipcode
//     }
//   }
  


//   const mapDispach = (dispach) =>{
//   return{
//     valueChangeHandler:(e) => dispach(actions.valueMapper(e)),
//     signUp:(dataSignup)=>dispach(actions.signUp(dataSignup))
   
//   }
//   }
  

export default compose(
  graphql(addOwner, { name: "addOwner" })
)(OwnerSignup);

