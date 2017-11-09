const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');
const expect = chai.expect;
chai.use(chaiHttp);

describe('GET', function() {
    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });
            it('Should return status 200', function() {
                return chai.request(app).get('/').then(res => {
                    expect(res).to.have.status(200);
                });
            });
})