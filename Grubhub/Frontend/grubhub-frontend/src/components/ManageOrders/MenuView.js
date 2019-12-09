import React, { Component } from 'react';
import '../LoadRestaurant/LoadRestaurant.css'
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';



import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { gql } from 'apollo-boost';

const viewMenu = gql`
mutation($section_name:String,$section_id:String,$section_description:String){
    viewMenu(section_name:$section_name,section_id:$section_id,section_description:$section_description){  
    section_name
      }
}
`;

class MenuView extends Component {

    constructor() {

        super();

        this.state = {
            restaurantid: "",
            rest_name: "",
            orderData:[],
            total:0,
            reDirect:null
        }

    }

    valueChangedHandler = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }


    async viewMenu(e){
        e.preventDefault()
        let {data} = await this.props.viewMenu({
          variables: {
        section_name:this.state.email,
        section_description:this.state.pass
          },
      });
      
      console.log(data);
      if(data['viewMenu']==null)
      {
        alert('Viewmenu fail');
      }
    }

    createFinalView = (restdata) =>{

        let map1 = new Map(); 
        let itemarr=[];
        restdata.forEach((element)=>{

            if(map1.has(element.section_name.toUpperCase()))
            {
                console.log('herer now')
               let arr =  map1.get(element.section_name.toUpperCase());
               arr.push(element)
                map1.set(element.section_name.toUpperCase(),arr);
            }

            else{
                console.log('herere first ')
                itemarr = []
                itemarr.push(element)
                map1.set(element.section_name.toUpperCase(),itemarr)
                console.log('Map value is ',map1)
            }

        })

        console.log('Final Map is',map1)
       let finalHtmlView = this.createHtml(map1)


       return finalHtmlView

    }

    createHtml=(map)=>{
        let menuMap = []
        for (var [key, value] of map) {
            console.log(key + ' = ' + value);
            let menuMap2 = []
            menuMap2 = value.map((value) => {
                
                return <div class="columnCard"><div class="card">
                     <img src={'http://3.17.152.109:3001/' + value.menu_image} style={{ height: "100px", width: "100px" }}></img>
                    <h3>{value.menu_name}</h3>
                    <p>{value.menu_description}</p>
                    <p>${value.menu_price}</p>
                    
                   
                </div> </div>
            })
            menuMap.push(<div><h3>{key} Menu: <br/></h3><div class="rowCard">{menuMap2} 
            </div>
            <br/><hr/>
              </div>)

          }
          console.log('Finalllll viewwww',menuMap)
return menuMap
    }


    viewSection = (data) => {

        let reDirect = <Redirect to={{
            pathname: '/customer/loadRestaurant',
            state: {
                restaurantid: data.restaurant_id,
            }
        }}
        />

        this.setState({
            reDirect: reDirect
        })



    }

    redirectHome = ()=>{
console.log('Herer in the redirectHomeeeee')
        let reDirect = <Redirect to={{
            pathname: '/customer/home'            
        }}
        />

        this.setState({
            reDirect: reDirect
        })


    }


    componentWillMount() {

let rest_name = localStorage.getItem('rest_name')
  let restaurantid = localStorage.getItem('owner_id')
  this.setState({
    rest_name:rest_name
  })
        this.props.loadRestaurant({ id: restaurantid });

    }

    

    render() {
        
        let currentOrders = null
        let total = 0;


        
        let redirectVar = null
        if (!localStorage.getItem('owner_id')) {

            redirectVar = <Redirect to="/" />
        }


       
        
        let menuFinalView  = this.createFinalView(this.props.restaurantData);
        console.log('Final HTML Vieweeee',menuFinalView)

        return (<div>
            {redirectVar}
            <div class="section">

           <div align="center"> <h1 align="center"><i>{this.state.rest_name}</i></h1>  <Link to="/restaurant/manageSection"><u>Manage Restaurant</u></Link></div>

            {menuFinalView}
            {currentOrders}
            
        </div>
        </div>)


    }




}



export default compose(
    graphql(viewMenu, { name: "viewMenu" })
  )(MenuView);


