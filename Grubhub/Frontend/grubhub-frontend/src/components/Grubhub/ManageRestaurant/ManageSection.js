
import React, { Component } from 'react';


import cookie from 'react-cookies';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import './ManageSection.css'


import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { gql } from 'apollo-boost';

const addSection = gql`
mutation($section_name:String,$section_id:String,$section_description:String){
  addSection(section_name:$section_name,section_id:$section_id,section_description:$section_description){  
    section_name
      }
}
`;



class ManageSection extends Component {

  reDirect = ''
  constructor() {

    super();

    this.state = {
      sectionName: "",
      sectionDescription: "",
      reDirect: "",
      updateAction: false,
      sectionid: "",
      restaurant_id: "",
      section_name_old:""
    }

  }



  valueChangedHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }


async updateSection(e){
  e.preventDefault()
  let {data} = await this.props.addSection({
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



  sectionItem = (id) => {

    //this.props.loadMenu({id:id});

  }

  closeForm = () => {
    console.log("Here in the close form");
    this.setState({
      sectionName: "",
      sectionDescription: "",
      updateAction: false,
      sectionid: ""

    })

  }


  updateForm = (data) => {
    document.getElementById('formupdate').reset();
    console.log('Here in the update form', data)
    this.setState({
      sectionName: data.section_name,
      sectionDescription: data.section_description,
      updateAction: true,
      section_name_old: data.section_name

    })
    console.log('State Values', this.state)
  }

  updateSection = () => {

    let data = { section_name: this.state.sectionName, section_description: this.state.sectionDescription, updateid: this.state.sectionid,section_name_old:this.state.section_name_old, id: this.state.restaurant_id }

    console.log('Inside Update section', data);

    this.setState({
      sectionName: "",
      sectionDescription: "",
      updateAction: false,
      sectionid: ""

    })
    this.props.updateSectionData(data)


  }
  updateAdd = () => {

    document.getElementById('menuadd').reset();
  }


  addSection = () => {

    let data = { section_name: this.state.sectionName, section_description: this.state.sectionDescription, id: this.state.restaurant_id }

    console.log('Data for addition', data);
    this.props.addSectionData(data)


  }

  viewSection = (data) => {

    let reDirect = <Redirect to={{
      pathname: '/restaurant/manage/menu',
      state: {
        sectionid: this.state.restaurant_id,
        sectionname: data.section_name
      }
    }}
    />

    this.setState({
      reDirect: reDirect
    })



  }

  deleteSection = (data) => {
    let owner_id = localStorage.getItem('owner_id')



    this.props.deleteSectionData({ section_name: data.section_name, id: owner_id });

  }


  componentWillMount() {

    let owner_id = localStorage.getItem('owner_id')

    this.props.loadSectionData({ id: owner_id });

  }

  componentDidMount() {

    let owner_id = localStorage.getItem('owner_id')

    this.setState({
      restaurant_id: owner_id
    })

  }


  render() {
    let redirectVar = null;
    if (!localStorage.getItem('owner_id')) {

      redirectVar = <Redirect to="/" />
    }


    let sectionArray = this.props.sectionData.map((sectionItem) => {


      return <li class="list-group-item"><h3>{sectionItem.section_name}</h3>
        <p>{sectionItem.section_description}</p>

        &nbsp;
          {/* <button class='btn btn-primary btnFormat' onClick = {()=>this.updateSection(sectionItem)}> */}

        <div id="outer">
          <div class="inner"><button class="btn btn-primary btnFormat" data-toggle="modal" data-target="#myModalUpdate" onClick={() => this.updateForm(sectionItem)} ><i class="fa fa-edit"></i></button></div>
          <div class="inner"><button class="btn btn-danger btnFormat" onClick={() => this.deleteSection(sectionItem)}  ><i class="fa fa-trash"></i></button></div>
          <div class="inner"><button class="btn btn-danger btnFormat" onClick={() => this.viewSection(sectionItem)}  ><i class="fa fa-eye"></i></button></div>
        </div>


      </li>

    });


    return (<div class="section">
      {redirectVar}



      {this.state.reDirect}

      <h1 align="center">Manage Sections</h1>

      <div class="col-md-4 text-center">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" onClick={this.updateAdd}>Add Section</button>
      </div>

      <ul class="list-group sectionul">

        <br /> <hr />

        {sectionArray}

      </ul>


      <div class="modal fade" id="myModal" role="dialog">

        <div class="modal-dialog .modal-lg ">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" onCLick={this.closeForm} data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Add Section Details</h4>
            </div>
            <div class="modal-body">
              <form id="menuadd">
                <div class="form-group">
                  <label for="sectionName">Enter Section Name</label>
                  <input type="text" class="form-control" id="sectionName" name="sectionName" onChange={this.valueChangedHandler} />
                </div>
                <div class="form-group">
                  <label for="sectionDescription">Enter Section Description</label>
                  <input type="text" class="form-control" id="sectionDescription" name="sectionDescription" onChange={this.valueChangedHandler} />
                </div>

              </form>
            </div>
            <button type="submit" onClick={this.addSection} class="btn btn-primary" data-dismiss="modal">Add Section</button>
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
              <h4 class="modal-title">Update Section Details</h4>
            </div>
            <div class="modal-body">
              <form ID="formupdate">
                <div class="form-group">
                  <label for="sectionName">Enter Section Name</label>
                  <input type="text" class="form-control" id="sectionName" name="sectionName" defaultValue={this.state.sectionName} onChange={this.valueChangedHandler} />
                </div>
                <div class="form-group">
                  <label for="sectionDescription">Enter Section Description</label>
                  <input type="text" class="form-control" id="sectionDescription" name="sectionDescription" defaultValue={this.state.sectionDescription} onChange={this.valueChangedHandler} />
                </div>

              </form>
            </div>
            <button type="submit" onClick={this.updateSection} class="btn btn-primary" data-dismiss="modal">Update Section</button>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </div>)


  }


}


export default compose(
  graphql(addSection, { name: "addSection" })
)(ManageSection);


