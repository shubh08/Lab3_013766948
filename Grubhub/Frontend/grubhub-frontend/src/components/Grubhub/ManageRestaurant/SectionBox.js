import React, {Component} from 'react';
import './ManageRestaurantMenu.css'
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

import {connect} from 'react-redux';
import * as actions from '../../actions/actions';




class  SectionBox extends Component {

    constructor(props)
    {
        super(props)

        this.state = {
            sectionid:''
        }
    }
  

    sectionItem = (id)=>{

        //this.props.loadMenu({id:id});
        console.log('here clicked');
        <Redirect to={{
            pathname: '/restaurant/manage/menu',
            state: { sectionid: id }
        }}
/>

    }


 


render(){


    
    let sectionArray = this.props.sectionData.map((sectionItem)=>{

        console.log('hereererer',sectionItem)
        return  <li class="list-group-item">{sectionItem.section_name}<button class='btn btn-primary'><i class="fa fa-edit"></i></button>
            &nbsp;  
            <button class="btn btn-danger" style={{display: 'inline-block'}} ><i class="fa fa-trash"></i></button>

            <button class="btn btn-danger" style={{display: 'inline-block'}} onClick={this.sectionItem(sectionItem.section_id)} ><i class="fa fa-eye"></i></button>
            
            </li>

    });
    return(
       
        // {sectionArray}
               <div>{sectionArray}</div> 
            )

}
 

    }



    const mapState = (store) =>{
        console.log('Manage Restaurant Props',store)
          return{
        
            restaurant_id:store.restaurant_id,
            sectionData:store.sectionData,
            loginStatus:store.loginStatus,
            objLogin:store.objLogin,
            updateSuccess:store.updateSuccess
          }
        }
        
      
      
        const mapDispach = (dispach) =>{
        return{
          loadSectionData:(data)=>dispach(actions.loadSectionData(data)),
          addSectionData:(data)=>dispach(actions.addSectionData(data)),
          // decAge:() => dispach({type:'Agedo'})
        }
        }
        
        
      export default connect(mapState,mapDispach) (SectionBox);



