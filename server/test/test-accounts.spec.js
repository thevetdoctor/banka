/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');

// eslint-disable-next-line no-unused-vars
const should = chai.should();
const AccountController = require('../controllers/accounts');

chai.use(chaiHttp);


describe('Account Controller', () => {
  it('AccountController should exist', () => {
    AccountController.should.exist;
  });
});


describe('Account Creation Endpoint', () => {
  it('Account create method should exist', () => {
    AccountController.create.should.exist;
  });

  it('Create(POST) should create a new account', (done) => {
    chai.request(server)
      .post('/api/v1/accounts')
      .send({
        owner: 1,
        type: 'current',
        status: 'active',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(200);
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
      });
    done();
  });
});
