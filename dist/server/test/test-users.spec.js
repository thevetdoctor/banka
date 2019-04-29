"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../../index"));

var _users = _interopRequireDefault(require("../controllers/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-unused-expressions */

/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
var should = _chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe('User Controller', function () {
  it('UserController should exist', function () {
    _users["default"].should.exist;
  });
}); // SIGN-UP ENDPOINTS

describe('Signup Endpoint', function () {
  it('User signup method should exist', function () {
    _users["default"].signup.should.exist;
  });
  it('Signup(POST) should create a new user', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
      firstName: 'Dami',
      lastName: 'Lola',
      password: '123456',
      sex: 'M',
      email: 'demi@yahoo.com',
      mobile: '12345678900'
    }).end(function (err, res) {
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
describe('Signup Endpoint Error Handling', function () {
  it('return an ERROR if FIRSTNAME is not supplied', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
      // firstname: 'Dami',
      lastName: 'Lola',
      password: '123456',
      sex: 'M',
      email: 'dami@yahoo.com',
      mobile: '1234567890'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.equal(400);
      res.body.should.have.property('error');
    });

    done();
  });
  it('return an ERROR if LASTNAME is not supplied', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
      firstName: 'Dami',
      // lastname: 'Lola',
      password: '123456',
      sex: 'M',
      email: 'dami@yahoo.com',
      mobile: '1234567890'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.equal(400);
      res.body.should.have.property('error');
    });

    done();
  });
  it('return an ERROR if EMAIL is not supplied', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
      firstName: 'Dami',
      lastName: 'Lola',
      password: '123456',
      sex: 'M',
      // email: 'dami@yahoo.com',
      mobile: '1234567890'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.equal(400);
      res.body.should.have.property('error');
    });

    done();
  });
  it('return an ERROR if PASSWORD is not supplied', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
      firstName: 'Dami',
      lastName: 'Lola',
      // password: '123456',
      sex: 'M',
      email: 'dami@yahoo.com',
      mobile: '1234567890'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.equal(400);
      res.body.should.have.property('error');
    });

    done();
  });
  it('return an ERROR if SEX is not supplied', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
      firstName: 'Dami',
      lastName: 'Lola',
      password: '123456',
      // sex: 'M',
      email: 'dami@yahoo.com',
      mobile: '1234567890'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.equal(400);
      res.body.should.have.property('error');
    });

    done();
  });
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
  it('return an ERROR if wrong SEX not supplied', function (done) {
=======
  it('return an ERROR if wrong SEX is supplied', function (done) {
>>>>>>> immersive
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
      firstName: 'Dami',
      lastName: 'Lola',
      password: '123456',
      sex: 'YY',
      email: 'dami@yahoo.com',
      mobile: '1234567890'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.equal(400);
      res.body.should.have.property('error');
    });

    done();
  });
  it('return an ERROR if MOBILE is not supplied', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
      firstName: 'Dami',
      lastName: 'Lola',
      password: '123456',
      sex: 'M',
      email: 'dami@yahoo.com' // mobile: '1234567890',

    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.equal(400);
      res.body.should.have.property('error');
    });

    done();
  });
  it('return an ERROR if WRONG MOBILE is supplied', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
      firstName: 'Dami',
      lastName: 'Lola',
      password: '123456',
      sex: 'M',
      email: 'dami@yahoo.com',
      mobile: '1234567890decoy'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.equal(400);
      res.body.should.have.property('error');
    });

    done();
  });
}); // SIGN-IN ENDPOINTS

describe('Signin Endpoint', function () {
  it('User signin method should exist', function () {
    _users["default"].signin.should.exist;
  });
  it('Signin(POST) should sign in user', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
      email: 'b@banka.com',
      password: 'password2'
    }).end(function (err, res) {
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
describe('Signin Endpoint Error Handling', function () {
  it('should return an ERROR if EMAIL is not supplied', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
      // email: 'dami@gmail.com',
      password: '123456'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.equal(400);
      res.body.should.have.property('error');
    });

    done();
  });
  it('should return an ERROR if PASSWORD is not supplied', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
      email: 'dami@gmail.com' // password: '123456',

    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.equal(400);
      res.body.should.have.property('error');
    });

    done();
  });
  it('should return an ERROR if EMAIL is not INVALID', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
      email: 'dami@gmail',
      password: '123456'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.equal(400);
      res.body.should.have.property('error');
    });

    done();
  });
  it('should return an ERROR if PASSWORD is invalid', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
      email: 'dami@gmail.com',
      password: '1234'
    }).end(function (err, res) {
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