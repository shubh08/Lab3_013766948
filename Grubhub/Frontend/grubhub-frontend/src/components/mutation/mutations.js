
import { gql } from 'apollo-boost';


const addOwnerMutation = gql`
mutation OwnerSignup($email:String,$fname:String,$lname:String,$restname:String,$zip:String,$pass:String,$cuisine:String){
    addOwner(email:$email,fname:$fname,lname:$lname,restname:$restname,zip:$zip,pass:$pass,cuisine:$cuisine){  
            owner_fname
        }
}
`;


const addCustMutation = gql`
mutation OwnerSignup($email:String,$fname:String,$lname:String,$restname:String,$zip:String,$pass:String,$cuisine:String){
    addOwner(email:$email,fname:$fname,lname:$lname,restname:$restname,zip:$zip,pass:$pass,cuisine:$cuisine){  
            owner_fname
        }
}
`;


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

const updateProfileOwner = gql`
mutation($email:String,$pass:String,$fname:String,$lname:String,$rest_name:String){
  updateProfileOwner(email:$email,pass:$pass){  
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

const addSection = gql`
mutation($section_name:String,$section_id:String,$section_description:String){
  addSection(section_name:$section_name,section_id:$section_id,section_description:$section_description){  
    section_name
      }
}
`;

const addMenu = gql`
mutation($section_name:String,$section_id:String,$section_description:String,$msg:String){
  addMenu(section_name:$section_name,section_id:$section_id,section_description:$section_description){  
    section_name
      }
}
`;



const viewMenu = gql`
mutation($section_name:String,$section_id:String,$section_description:String){
    viewMenu(section_name:$section_name,section_id:$section_id,section_description:$section_description){  
    section_name
      }
}
`;

export {addOwnerMutation,addCustMutation,signincust,signinowner,updateProfileCustomer,updateProfileOwner,addSection,addMenu,viewMenu};