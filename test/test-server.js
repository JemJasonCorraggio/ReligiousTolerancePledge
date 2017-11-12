const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// this makes the should syntax available throughout
// this module
const should = chai.should();

const {Business} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);
function seedBusinessData() {
var promiseArray = [];
  for (let i=1; i<=10; i++) {
 promiseArray.push(createBusinessData());
  }
  // this will return a promise
  return Promise.all(promiseArray);
}

function createBusinessData(){
         var newBusiness =generateBusinessData();
      var username=newBusiness.username;
      var name = newBusiness.name;
      var address = newBusiness.address;
      return Business.hashPassword(newBusiness.password).then(password=>
      Business.create({
          username,
          password,
          name,
          address
      })
      );
    
}

// can be used to generate seed data for db
// or request.body data
function generateBusinessData() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    name: faker.company.companyName(),
    address:{
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode()
    }
  };
}


// this function deletes the entire database.
// we'll call it in an `afterEach` block below
// to ensure  ata from one test does not stick
// around for next one
function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('GET', function() {
    before(function() {
        return runServer(TEST_DATABASE_URL);
    });
 beforeEach(function() {
    return seedBusinessData();
  });

  afterEach(function() {
    return tearDownDb();
  });
    after(function() {
        return closeServer();
    });
            it('Should return status 200 when accessing index.html', function() {
                return chai.request(app).get('/').then(res => {
                    res.should.have.status(200);
                });
            });
            it('Should return status 200 when accessing why.html', function() {
                return chai.request(app).get('/why.html').then(res => {
                    res.should.have.status(200);
                });
            });
            it('Should return status 200 when accessing list.html', function() {
                return chai.request(app).get('/list.html').then(res => {
                    res.should.have.status(200);
                });
    });
    it ('Should return list of businesses at /businesses',function(){
                        let resBusiness;
                return chai.request(app).get('/businesses').then(res => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.should.have.length.of.at.least(1);
                    res.body.forEach(function(business) {
            business.should.be.a('object');
            business.should.include.keys(
              '_id', 'username', 'password', 'name','address');
          });
         resBusiness = res.body[0];
          return Business.findById(resBusiness._id);
        })
        .then(function(business) {

          resBusiness._id.should.equal(business._id.toString());
          resBusiness.username.should.equal(business.username);
          resBusiness.password.should.equal(business.password);
          resBusiness.name.should.equal(business.name);
          resBusiness.address.street.should.equal(business.address.street);
          resBusiness.address.city.should.equal(business.address.city);
          resBusiness.address.state.should.equal(business.address.state);
          resBusiness.address.zip.should.equal(business.address.zip);
        });
    });

            it('Should return status 200 when accessing ask.html', function() {
                return chai.request(app).get('/ask.html').then(res => {
                    res.should.have.status(200);
                });
            });
})