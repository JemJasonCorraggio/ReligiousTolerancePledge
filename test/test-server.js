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
            it('Should return status 200 when accessing index.html', function() {
                return chai.request(app).get('/').then(res => {
                    expect(res).to.have.status(200);
                });
            });
            it('Should return status 200 when accessing why.html', function() {
                return chai.request(app).get('/why.html').then(res => {
                    expect(res).to.have.status(200);
                });
            });
            it('Should return status 200 when accessing list.html', function() {
                return chai.request(app).get('/list.html').then(res => {
                    expect(res).to.have.status(200);
                });
            });
            it('Should return status 200 when accessing ask.html', function() {
                return chai.request(app).get('/ask.html').then(res => {
                    expect(res).to.have.status(200);
                });
            });
})