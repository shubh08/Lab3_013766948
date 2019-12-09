import React, { Component } from 'react';
import './LoadRestaurant.css';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';


class LoadRestaurant extends Component {


    constructor() {

        super();

        this.state = {
            restaurantid: "",
            rest_name: "",
            orderData: [],
            total: 0,
            reDirect: null
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
                    
                    <input type='button' value='-' class='qtyminus' onClick={() => this.decrease(value)} field='quantity' />
                    <p id={value.menu_name}>0</p>
                    <input type='button' value='+' class='qtyplus' onClick={() => this.increase(value)} field='quantity' />
                   
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

    increase = (item) => {
        let orderDatatemp = this.state.orderData;
        for (let i = 0; i < orderDatatemp.length; i++) {
            if (orderDatatemp[i].menu_name === item.menu_name) {
                console.log('here matched')
                orderDatatemp[i].quantity += 1
                document.getElementById(item.menu_name).innerHTML = orderDatatemp[i].quantity
                // let total = this.state.total
                // total+=parseInt(item.menu_price, 10)
                this.setState({
                    orderData: orderDatatemp,

                });

                console.log(this.state);
                return
            }
        }

        document.getElementById(item.menu_name).innerHTML = 1
        orderDatatemp.push({ ...item, quantity: 1 })
        // let total = this.state.total
        // console.log('Price is'+parseInt(item.menu_price, 10));
        // total+=parseInt(item.menu_price, 10)
        // console.log('total is',total)
        this.setState({
            orderData: orderDatatemp,

        });
        console.log('This statte', this.state);
    }


    decrease = (item) => {
        let orderDatatemp = this.state.orderData;
        console.log('orderDatatemp', orderDatatemp.length)
        for (let i = 0; i < orderDatatemp.length; i++) {
            console.log('hereree in the decrease')
            if (orderDatatemp[i].menu_name === item.menu_name) {
                orderDatatemp[i].quantity -= 1
                if (orderDatatemp[i].quantity === 0) {
                    document.getElementById(item.menu_name).innerHTML = 0
                    orderDatatemp.splice(i, 1);
                }
                else { document.getElementById(item.menu_name).innerHTML = orderDatatemp[i].quantity }
                this.setState({
                    orderData: orderDatatemp
                });

                console.log(this.state);
                return
            }
        }


        console.log(this.state);
    }

    valueChangedHandler = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }


    orderNow = (total) => {
        let cust_id = localStorage.getItem('cust_id')
        let cust_fname = localStorage.getItem('cust_fname')
        let cust_lname = localStorage.getItem('cust_lname')
        let cust_address = localStorage.getItem('cust_address')

        let orderItems = this.state.orderData;
        let restaurant_id = this.state.restaurantid;
        let status = "New"
        this.props.order({cust_fname:cust_fname,cust_lname:cust_lname,cust_address:cust_address, cust_id: cust_id, orderItems: orderItems, restaurant_id: restaurant_id, status: status, rest_name: this.state.rest_name, order_total: total });
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

    redirectHome = () => {
        console.log('Herer in the redirectHome')
        let reDirect = <Redirect to={{
            pathname: '/customer/home'
        }}
        />

        this.setState({
            reDirect: reDirect
        })


    }


    componentWillMount() {

        if (this.props.location.state) {

            let restaurantid = this.props.location.state.restaurantid;
            let rest_name = this.props.location.state.rest_name;
            this.setState({
                restaurantid: restaurantid,
                rest_name: rest_name
            })
            this.props.loadRestaurant({ id: restaurantid });
        }


    }




    render() {
       
        let currentOrders = null
        let total = 0;


        let menuFinalView  = this.createFinalView(this.props.restaurantData);
        console.log('Final HTML Vieweeee',menuFinalView)

        let redirectVar = null
        if (!localStorage.getItem('cust_id')) {

            redirectVar = <Redirect to="/" />
        }

        if (this.props.orderSuccess) {
            redirectVar = <Redirect to={{
                pathname: '/customer/OrderSuccess',
                state: {
                    flag: true
                }
            }}
            />

        }

        console.log('Order Success Value', this.props.orderSuccess)
        console.log('Order Success Value', redirectVar)

    
        if (this.state.orderData.length > 0) {
            //    currentOrders =  this.state.orderData.map((item)={
            //     return <div></div>
            //     })
            currentOrders = this.state.orderData.map((searchItem) => {

                total += (parseInt(searchItem.menu_price, 10) * parseInt(searchItem.quantity, 10))

                return <li class="list-group-item list-group-item-success">{searchItem.quantity} Number of <i>{searchItem.menu_name}</i> <p align="right">Price  = {searchItem.quantity}*${searchItem.menu_price} </p> </li>

            });
            currentOrders = <div class="container"> <br></br> <br></br> <h2>You have added the following Items to your cart:<i class="fas fa-shopping-cart"></i></h2> <ul class="list-group">{currentOrders}</ul>
                <br></br>
                <h3>Your total is: ${total}</h3>
                <button class="btn btn-primary" onClick={() => this.orderNow(total)}>Order Now!!</button> <button class="btn btn-danger" onClick={this.redirectHome}>Cancel</button>

            </div>
        }

        return (<div>
            {redirectVar}
            <div class="section">

                <h1 align="center"><i>{this.state.rest_name}</i></h1>

                {/* {breakfastmenu}
                {lunchmenu}
                {appetizersmenu}
                {dinnermenu} */}
                {menuFinalView}
                {currentOrders}

            </div>
        </div>)


    }




}


const mapState = (store) => {
    console.log('Load Restaurant Props', store)
    return {

        restaurantData: store.restaurantData,
        loginStatus: store.loginStatus,
        objLogin: store.objLogin,
        updateSuccess: store.updateSuccess,
        orderSuccess: store.orderSuccess
    }
}



const mapDispach = (dispach) => {
    return {
        loadProfileData: (data) => dispach(actions.loadProfileData(data)),
        order: (data) => dispach(actions.order(data)),
        loadRestaurant: (data) => dispach(actions.loadRestaurant(data))
        // decAge:() => dispach({type:'Agedo'})
    }
}


export default connect(mapState, mapDispach)(LoadRestaurant);
