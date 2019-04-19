/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import UserController from '../controllers/users';

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);


describe('User Controller', () => {
  it('UserController should exist', () => {
    UserController.should.exist;
  });
});


// SIGN-UP ENDPOINTS
describe('Signup Endpoint', () => {
  it('User signup method should exist', () => {
    UserController.signup.should.exist;
  });

  it('Signup(POST) should create a new user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Dami',
        lastName: 'Lola',
        password: '123456',
        sex: 'M',
        email: 'dami@yahoo.com',
        mobile: '1234567890',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(201);
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
      });
    done();
  });
});


describe('Signup Endpoint Error Handling', () => {
  it('return an ERROR if FIRSTNAME is not supplied', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        // firstname: 'Dami',
        lastName: 'Lola',
        password: '123456',
        sex: 'M',
        email: 'dami@yahoo.com',
        mobile: '1234567890',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });
    done();
  });

  it('return an ERROR if LASTNAME is not supplied', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Dami',
        // lastname: 'Lola',
        password: '123456',
        sex: 'M',
        email: 'dami@yahoo.com',
        mobile: '1234567890',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });
    done();
  });

  it('return an ERROR if EMAIL is not supplied', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Dami',
        lastName: 'Lola',
        password: '123456',
        sex: 'M',
        // email: 'dami@yahoo.com',
        mobile: '1234567890',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });
    done();
  });

  it('return an ERROR if PASSWORD is not supplied', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Dami',
        lastName: 'Lola',
        // password: '123456',
        sex: 'M',
        email: 'dami@yahoo.com',
        mobile: '1234567890',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });
    done();
  });

  it('return an ERROR if SEX is not supplied', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Dami',
        lastName: 'Lola',
        password: '123456',
        // sex: 'M',
        email: 'dami@yahoo.com',
        mobile: '1234567890',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });
    done();
  });


  it('return an ERROR if wrong SEX not supplied', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Dami',
        lastName: 'Lola',
        password: '123456',
        sex: 'YY',
        email: 'dami@yahoo.com',
        mobile: '1234567890',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });
    done();
  });


  it('return an ERROR if MOBILE is not supplied', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Dami',
        lastName: 'Lola',
        password: '123456',
        sex: 'M',
        email: 'dami@yahoo.com',
        // mobile: '1234567890',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });
    done();
  });

  it('return an ERROR if WRONG MOBILE is supplied', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Dami',
        lastName: 'Lola',
        password: '123456',
        sex: 'M',
        email: 'dami@yahoo.com',
        mobile: '1234567890decoy',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });
    done();
  });
});

// SIGN-IN ENDPOINTS
describe('Signin Endpoint', () => {
  it('User signin method should exist', () => {
    UserController.signin.should.exist;
  });

  it('Signin(POST) should sign in user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'dami@gmail.com',
        password: '123456',
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

describe('Signin Endpoint Error Handling', () => {
  it('should return an ERROR if EMAIL is not supplied', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        // email: 'dami@gmail.com',
        password: '123456',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });
    done();
  });

  it('should return an ERROR if PASSWORD is not supplied', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'dami@gmail.com',
        // password: '123456',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });
    done();
  });

  it('should return an ERROR if EMAIL is not INVALID', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'dami@gmail',
        password: '123456',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });
    done();
  });

  it('should return an ERROR if PASSWORD is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'dami@gmail.com',
        password: '1234',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });
    done();
  });
});
