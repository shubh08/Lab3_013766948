import React, { Component } from 'react';

import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import {reactAddress} from '../../../global/globalVar'

import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { gql } from 'apollo-boost';

const addMenu = gql`
mutation($section_name:String,$section_id:String,$section_description:String,$msg:String){
  addMenu(section_name:$section_name,section_id:$section_id,section_description:$section_description){  
    section_name
      }
}
`;

let menu_uploaded = ""
let menu_name=""
let menu_description=""
let menu_price=""

class ManageMenu extends Component {


  constructor() {
    super();

    this.state = {
      sectionid: "",
      sectionname: "",
      menuitems: "",
      menu_name: "",
      menu_price: "",
      image: null,
      menu_description: "",
      menu_id: "",
      menu_name_old:""
    }

  }


async addMenu(e){
  e.preventDefault()
  let {data} = await this.props.addMenu({
    variables: {
  section_name:this.state.email,
  section_description:this.state.pass
    },
});

console.log(data);
if(data['addSection']==null)
{
  alert('Add section fail');
}
}

  ImageChangedHandler = (event) => {
    this.setState({
      image: event.target.files[0],
      loaded: 0,
    })

    console.log('State status', this.state)
  }

  valueChangedHandler = (event) => {
    console.log('Event target', event.target)
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

    console.log('State status', this.state)
  }


  updateForm = (data) => {
    document.getElementById('formupdate').reset();
    console.log('Here in the update form', data)
    this.setState({
      menu_name: data.menu_name,
      menu_description: data.menu_description,
      menu_price: data.menu_price,
      menu_image: data.menu_image,
      updateAction: true,
      menu_id: data.menu_id,
      menu_name_old:data.menu_name
    })

    menu_name = data.menu_name
    menu_description= data.menu_description
    menu_price= data.menu_price


    console.log('State Values', this.state)

  }


  updateMenu = () => {
    let sectid = this.props.location.state.sectionid;

    let data = { menu_name: this.state.menu_name, menu_description: this.state.menu_description, menu_price: this.state.menu_price, menu_image: this.state.menu_image, id:sectid,section_name:this.state.sectionname,menu_name_old:this.state.menu_name_old }

    console.log('Inside Update section', data);
    this.props.updateMenu(data)
    
    this.setState({
      menu_name: "",
      menu_description: "",
      menu_price: ""
    })
  }


  updateAdd = () => {
    document.getElementById('menuadd').reset();
    this.setState({
      menu_name: "",
      menu_price: "",
      menu_image: "",
      menu_description: ""
    })

  }
  addMenu = () => {

    let sectid = this.props.location.state.sectionid;
    let sectionname = this.props.location.state.sectionname;

    let data = { menu_name: this.state.menu_name, menu_description: this.state.menu_description, menu_price: this.state.menu_price, menu_image: this.state.menu_image, id: sectid,section_name:sectionname }
    console.log('here after getting input!!!', data);
    this.props.addMenuData(data)


  }

  viewMenu = (menu) => {
    console.log('Inside section view', menu.menu_id);
    {/* <Redirect to={{
    pathname: '/restaurant/manage/menu',
    state: { id: id }
  }}/> */}

    console.log('here clicked');
    let reDirect = <Redirect to={{
      pathname: '/restaurant/manage/menu',
      state: { menu_id: menu.menu_id }
    }}
    />

    this.setState({
      reDirect: reDirect
    })
    console.log(this.reDirect)


  }

  deleteMenu = (menu) => {
    console.log('Menu name to be deleted!!', menu.menu_name)

    this.props.deleteMenu({ id: this.state.sectionid, menu_name: menu.menu_name, section_name:this.state.sectionname })
  }


  imageUpload = (e, menu) => {

    
    e.preventDefault()
    console.log('Menu uisssssssss', menu_uploaded)
    let data = { image: this.state.image, menu_name_old:menu_uploaded, id: this.state.sectionid, type: "Menu",section_name:this.state.sectionname }
    console.log('Data to be uploaded', data);
    this.props.uploadMenu(data);

  }

  showUpload = (menu) => {
    menu_uploaded = menu.menu_name
    console.log('Menu id to be uploaded!!', menu.menu_name)

    let div = document.getElementById(menu.menu_name);

    if (div.style.display === "none") {
      div.style.display = "block";
    }

    else {
      div.style.display = "none";
    }
  }

  componentWillMount() {

   
    console.log('State bar is ',this.props.location.state)
    if(this.props.location.state){
      let sectid = this.props.location.state.sectionid;
      let sectionname = this.props.location.state.sectionname;
  
      this.setState({
        sectionid: sectid,
        sectionname: sectionname
      })
      console.log('here in the will mount',this.state)
      this.props.loadMenuData({ id: sectid,sectionname:sectionname });

    }


  }


  render() {

    let menuArray = []
    if(this.props.menuData!==undefined){
    menuArray = this.props.menuData.map((Menu) => {

      let imgURL = reactAddress + Menu.menu_image
      let menu_id = Menu.menu_id
      return <li class="list-group-item"><h3>{Menu.menu_name}</h3>  &nbsp; <p>${Menu.menu_price}</p>


        <img src={reactAddress + Menu.menu_image} style={{ height: "200px", width: "200px" }}></img>

        &nbsp; <p>Description:{Menu.menu_description}</p>
        &nbsp;
               <div id={Menu.menu_name} style={{ display: 'none' }}>
          <form onSubmit={(e, menu_name) => this.imageUpload(e, menu_name)} >
            Select image to upload:
    <input type="file" id="image" name="image" onChange={this.ImageChangedHandler} />

            <input type="submit" value="Upload Image" name="submit" />
          </form>
        </div>
        <div id="outer">
          <div class="inner"><button class='btn btn-primary btnFormat' data-toggle="modal" data-target="#myModalUpdate" onClick={() => this.updateForm(Menu)} ><i class="fa fa-edit"></i></button></div>
          <div class="inner"><button class="btn btn-danger btnFormat" onClick={() => this.deleteMenu(Menu)} ><i class="fa fa-trash"></i></button></div>
          <div class="inner"><button class="btn btn-danger btnFormat" onClick={() => this.showUpload(Menu)} ><i class="fa fa-upload"></i></button></div>

        </div>


      </li>

    });
  }

    let redirectVar = null


    if (this.props.owner_email === "") {

      return <div />
    }

    if (!localStorage.getItem('owner_id')) {
      console.log('Not logged in owner')
      redirectVar = <Redirect to="/" />
    }




    return (<div class="menu">  <div class="content">

      <h1>Manage Section: {this.state.sectionname} </h1>

      <div class="col-md-4 text-center">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" onClick={this.updateAdd}>Add Menu</button>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span><Link to="/restaurant/manageSection" ><u>Back To Manage Section</u></Link>
      </div>

      <ul class="list-group sectionul">

        <br /> <hr />

        {menuArray}

      </ul>

      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog .modal-lg ">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Add Menu Details</h4>
            </div>
            <div class="modal-body">
              <form id="menuadd" >
                <div class="form-group">
                  <label for="menu_name">Enter Menu Name</label>
                  <input type="text" class="form-control" id="menu_name" name="menu_name" onChange={this.valueChangedHandler} required />
                </div>
                <div class="form-group">
                  <label for="menu_description">Enter Menu Description</label>
                  <input type="text" class="form-control" id="menu_description" name="menu_description" onChange={this.valueChangedHandler} required />
                </div>

                <div class="form-group">
                  <label for="menu_price">Enter Menu Price</label>
                  <input type="number" class="form-control" id="menu_price" name="menu_price" onChange={this.valueChangedHandler} required/>
                </div>
               
              </form>
            </div>
            <button type="submit" onClick={this.addMenu} class="btn btn-primary" data-dismiss="modal">Add Menu</button>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>


      <div class="modal fade" id="myModalUpdate" role="dialog">
        <div class="modal-dialog .modal-lg ">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Update Menu Details</h4>
            </div>
            <div class="modal-body">
              <form autocomplete="jsahdjks" id="formupdate">
          


                <div class="form-group">
               
                  
                  <label for="menu_name">Enter Menu Name</label>
                  
                  <input type="text" class="form-control" id="menu_name" name="menu_name" autocomplete="new-password" placeholder={menu_name} onChange={this.valueChangedHandler} />
                </div>
                <div class="form-group">
               
                  <label for="menu_description">Enter Menu Description</label>
                 
                  <input type="text" class="form-control" id="menu_description" name="menu_description" autocomplete="new-password" placeholder={menu_description} onChange={this.valueChangedHandler} />
                </div>

                <div class="form-group">
                  <label for="menu_price">Enter Menu Price</label>
                  <input type="number" class="form-control" id="menu_price" name="menu_price" autocomplete="off" placeholder={menu_price} onChange={this.valueChangedHandler} />
                </div>
              
              </form>
            </div>
            <button type="submit" onClick={this.updateMenu} class="btn btn-primary" data-dismiss="modal">Update Menu</button>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>)


  }


}

export default compose(
  graphql(addMenu, { name: "addMenu" })
)(ManageMenu);


