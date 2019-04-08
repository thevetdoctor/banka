/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');

// eslint-disable-next-line no-unused-vars
const should = chai.should();
const UserController = require('../controllers/users');

chai.use(chaiHttp);


describe('User Controller', () => {
  it('UserController should exist', () => {
    UserController.should.exist;
  });
});

describe('Signup Endpoint', () => {
  it('User signup method should exist', () => {
    UserController.signup.should.exist;
  });

  it('Signup POST should create a new user', (done) => {
    chai.request(server)
      .post('/api/v1/users')
      .send({
        firstname: 'Dami',
        lastname: 'Lola',
        password: '123456',
        sex: 'M',
        email: 'dami@gmail.com',
        mobile: '1234567890',
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
