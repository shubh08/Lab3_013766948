const graphql = require('graphql');
const _ = require('lodash');
const Restaurant = require('../models/Restaurant');
const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;
const saltRounds = 10;



const OwnerType = new GraphQLObjectType({
    name: 'Owner',
    fields: ( ) => ({

        owner_email:  { type: GraphQLString },
  owner_hash:  { type: GraphQLString },
  owner_image: { type: GraphQLString },
  owner_number: { type: GraphQLString },
  owner_fname:  { type: GraphQLString },
  owner_lname: { type: GraphQLString },
  rest_name: { type: GraphQLString },
  rest_zipcode: { type: GraphQLString },
  rest_image: { type: GraphQLString },
  rest_cuisine: { type: GraphQLString },
  id:{type:GraphQLString}
    })
});

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: ( ) => ({
    cust_email: { type: GraphQLString },
  cust_hash: { type: GraphQLString} ,
  cust_image: { type: GraphQLString} ,
  cust_fname:{ type: GraphQLString },
  cust_lname:{ type: GraphQLString },
  cust_address:{ type: GraphQLString} ,
  cust_number:{ type: GraphQLString },
  id:{type:GraphQLString}

    })
});


const RootQuery = new GraphQLObjectType({

     name: 'RootQueryType',
    fields: {
        signincust: {
            type: CustomerType,
            args: { email: { type: GraphQLString },pass:{ type: GraphQLString } },
           async resolve(parent, args){

            const user = await Customer.findOne({ cust_email: args.email })
            if (!user) {
                throw new Error('No user with that email')
              }
              const valid = await bcrypt.compareSync(args.pass, user.cust_hash);

              if (!valid) {
                throw new Error('Incorrect password')
              }
              return user
        
            }
        },
        signinowner:{

            type: OwnerType,
            args: { email: { type: GraphQLString },pass:{ type: GraphQLString } },
           async resolve(parent, args){

            const user = await Restaurant.findOne({ owner_email: args.email })
            if (!user) {
                throw new Error('No owner with that email')
              }
              const valid = await bcrypt.compareSync(args.pass, user.owner_hash);

              if (!valid) {
                throw new Error('Incorrect password')
              }
              return user
        
            }
            
        },
     
        owners: {
            type: new GraphQLList(OwnerType),
            resolve(parent, args){
                Restaurant.find({ }, function (err, owner) {

                    return owner

                })
            }
        }
    }
});

var count =10;
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signincust: {
            type: CustomerType,
            args: { email: { type: GraphQLString },pass:{ type: GraphQLString } },
           async resolve(parent, args){

            const user = await Customer.findOne({ cust_email: args.email })
            if (!user) {
                return null
              }
              const valid = await bcrypt.compareSync(args.pass, user.cust_hash);

              if (!valid) {
                return null
              }
              return user
        
            }
        },
        signinowner:{

            type: OwnerType,
            args: { email: { type: GraphQLString },pass:{ type: GraphQLString } },
           async resolve(parent, args){

            const user = await Restaurant.findOne({ owner_email: args.email })
            if (!user) {
                throw new Error('No owner with that email')
              }
              const valid = await bcrypt.compareSync(args.pass, user.owner_hash);

              if (!valid) {
                throw new Error('Incorrect password')
              }
              return user
        
            }
            
        },
        addOwner: {
            type: OwnerType,
            args: {
                email:  { type: GraphQLString },
                fname:  { type: GraphQLString },
                lname: { type: GraphQLString },
                restname: { type: GraphQLString },
                zip: { type: GraphQLString },
                pass: { type: GraphQLString },
                cuisine:{ type: GraphQLString }
            },
           async resolve(parent, args){
                var newRest = Restaurant({
                    owner_email: args.email,
                    owner_hash: args.pass,
                    owner_image: 'default.png',
                    owner_fname: args.fname,
                    owner_lname: args.lname,
                    rest_name: args.restname,
                    rest_zipcode: args.zip,
                    rest_image:'default.png',
                    rest_cuisine:args.cuisine
                });
                let owner =  await Restaurant.find({ owner_email: args.email });
                if(owner.length==0)
                {
                    let hashpass = await bcrypt.hash(args.pass, saltRounds);
                    newRest.owner_hash = hashpass;
                    return  newRest.save();
                }
                else
               return null
            }
        },

        addCustomer:{
        
            type: CustomerType,
            args: {
                email:  { type: GraphQLString },
                fname:  { type: GraphQLString },
                lname: { type: GraphQLString },
                pass: { type: GraphQLString }
            },
           async resolve(parent, args){
                var newUser = Customer({
                    cust_fname: args.fname,
                    cust_lname: args.lname,
                    cust_email: args.email,
                    cust_hash: args.pass,
                    cust_image: 'default.png'
                });

                let cust =  await  Customer.find({ cust_email: args.email });
                if(cust.length==0)
                {
                    let hashpass = await bcrypt.hash(args.pass, saltRounds);
                    newUser.cust_hash = hashpass;
                    return  newUser.save();
                }
                else
                return  null;
    
            }
       
        }
        ,
            updateProfileCustomer:{
            type: CustomerType,
            args: {
                email:  { type: GraphQLString },
                fname:  { type: GraphQLString },
                lname:  { type: GraphQLString },
                pass:  { type: GraphQLString },
                cust_image: { type: GraphQLString },
                id:{ type: GraphQLString }
            },
           async resolve(parent, args){
              
                let cust =  await  Customer.findOneAndUpdate(
                    {"_id":args.id},
                        { 
                            "$set": {
                                "cust_fname": args.fname,
                                "cust_lname":args.lname,
                                "cust_email":args.email,
                                "cust_number":args.number,
                                "cust_address":args.address,
                            }
                        }
                    );

                    if(cust)
                {
                    console.log('result data profile', cust)
                    return cust

                }
                else
                return  null;
            }
       
        },
        updateProfileOwner:{
            type: OwnerType,
            args: {
                email:  { type: GraphQLString },
                fname:  { type: GraphQLString },
                lname: { type: GraphQLString },
                restname: { type: GraphQLString },
                zip: { type: GraphQLString },
                pass: { type: GraphQLString },
                cuisine:{ type: GraphQLString },
                owner_image:{type: GraphQLString},
                rest_image:{type: GraphQLString }
            },
           async resolve(parent, args){
               
                let owner =  await   Restaurant.findOneAndUpdate(
                    {"_id":args.id},
                        { 
                            "$set": {
                                "cust_fname": args.fname,
                                "cust_lname":args.lname,
                                "cust_email":args.email,
                                "cust_number":args.number,
                                "cust_address":args.address,
                            }
                        }
                    );

                    if(owner)
                {
                    console.log('result data profile', owner)
                    return owner

                }
                else
                return  null;
            }
       
        },

        addSection:{
            type: OwnerType,
            args: {
                section_name:  { type: GraphQLString },
                id:  { type: GraphQLString },
                section_description: { type: GraphQLString },
            },
           async resolve(parent, args){
               
                let rest =  await   Restaurant.update({_id:id}, { $push: { sections: section  } }, {upsert: true});

                    if(rest)
                {
                    console.log('result Add section', rest)
                    return rest

                }
                else
                return  null;
            }
       
        },

        addMenu:{
            type: OwnerType,
            args: {
                section_name:  { type: GraphQLString },
                id:  { type: GraphQLString },
                section_description: { type: GraphQLString },
                msg:{type: GraphQLString}
            },
           async resolve(parent, args){
               
               // let rest =  await   Restaurant.update({_id:id}, { $push: { sections: section  } }, {upsert: true});
                let rest =  await   Restaurant.update({$and:[{"_id":args.id},{"sections":{$elemMatch:  {section_name:args.section_name}}}]}, { $push: {  "sections.$.menu": args.msg  } }, {upsert: true});

                    if(rest)
                {
                    console.log('result Add section', rest)
                    return rest

                }
                else
                return  null;
            }
       
        },
        viewMenu:{
            type: OwnerType,
            args: {
                section_name:  { type: GraphQLString },
                id:  { type: GraphQLString },
                section_description: { type: GraphQLString },
                msg:{type:GraphQLString}
            },
           async resolve(parent, args){
                let rest =  await   Restaurant.find({ _id: id })
                    if(rest[0])
                {
                    console.log('result View Menu Data', rest)
                    return rest[0]._doc.sections

                }
                else
                return  null;
            }
       
        }

     
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});