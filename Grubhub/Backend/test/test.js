var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

it("Should check credentials and return status code", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/signin')
    .send({ "email": "shubhamk@sjsu.edu", "pass" : "123","type":"customer"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

it("Should Load Profile data for owner and return status code", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/loadProfileData')
    .send({ "id":6,"type":"owner"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

it("Should load restaurant section data  and return status code", function(done){
    chai.request('http://127.0.0.1:3001') 
    .post('/loadSectionData')
    .send({"id":9})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

it("Should load menu for section and return status code", function(done){
    chai.request('http://127.0.0.1:3001') 
    .post('/loadMenu')
    .send({"id":18})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})


it("Should update section and return status code", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/signin')
    .send({"section_name":"Breakfast","updateid":9,"section_description":"Description Updated"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

