import React, { Component } from 'react';
import './login.css';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { gql } from 'apollo-boost';
import * as actions from '../actions/actions'

const signinowner = gql`
mutation($email:String,$pass:String){
    signinowner(email:$email,pass:$pass){  
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



class OwnerLogin extends Component {

    constructor (props) {
        super(props);
        this.state={
            email: "",
            pass: "",
            type: 'owner'
        }
    
      }


    async login(e){
        e.preventDefault()
        console.log('Owner Login in here!!!!!') 
        let {data} = await this.props.signinowner({
            variables: {
          email:this.state.email,
          pass:this.state.pass
            },
            //efetchQueries: [{ query: signupQuery }]
        });
        console.log(data);
        if(data['signinowner']==null)
        {
          alert('Invalid Credentials');
        }
        else
        {
          console.log('here after login!!!')
          console.log(data);
          alert('Owner Sign in Successfull!!');
          localStorage.setItem("owner_id",data['signinowner']['id']);
          localStorage.setItem("owner_email",data['signinowner']['owner_email']);
          localStorage.setItem("owner_fname",data['signinowner']['owner_fname']);
          localStorage.setItem("owner_lname",data['signinowner']['owner_lname']);
          
        }
        this.setState({})

      }

    valueChangedHandler = (event) => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
     
        console.log('State status', this.state)
      }

    render() {
        let redirectVar = null;

        if(localStorage.getItem('owner_id')){
            redirectVar = <Redirect to= "/restaurant/manage/profile"/>
        }
        
        else if (localStorage.getItem('cust_id')) {
            redirectVar = <Redirect to="/customer/home" />
          }


        else if (this.props.loginStatus === 'success') {
            redirectVar = <Redirect to="/restaurant/manage/profile" />
        }
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
                    <form   onSubmit={(e) => this.login(e)}  >
                        <h3><b>Sign in with your Grubhub account</b></h3>
                        <div className="form-group">
                            <label for="owner_email">Email address</label>
                            <input type="email" className="form-control" id="owner_email" name="email" onChange={this.valueChangedHandler} placeholder="Enter email"  required="true"/>
                        </div>
                        <div className="form-group">
                            <label for="owner_pass">Password</label>
                            <input type="password" className="form-control" id="owner_pass" name="pass" onChange={this.valueChangedHandler} placeholder="Password" required="true"/>
                        </div>
                        <button type="submit"className="btn btn-danger">Sign in</button>
                    </form >
                   
                    
                    <p id='account'><font><a href='signup'><b>Create your account</b></a></font></p>

                </div>
            </div>
        )
    }
}




export default compose(
    graphql(signinowner, { name: "signinowner" })
  )(OwnerLogin);
  

