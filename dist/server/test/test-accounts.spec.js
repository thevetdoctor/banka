"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../../index"));

var _accounts = _interopRequireDefault(require("../controllers/accounts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-unused-expressions */

/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
var should = _chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe('Account Controller', function () {
  it('AccountController should exist', function () {
    _accounts["default"].should.exist;
  });
});
describe('Account Creation Endpoint', function () {
  it('Account CREATE method should exist', function () {
    _accounts["default"].create.should.exist;
  });
  it('Create(POST) should create a new account', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/accounts').send({
      owner: 1,
      type: 'current'
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
describe('Error Handling (Account Creation Endpoint)', function () {
  it('should return an ERROR if owner ID not supplied', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/accounts').send({
      // owner: 1,
      type: 'current'
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
  it('should return an ERROR if account TYPE is not supplied', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/accounts').send({
      owner: 1 // type: 'current',

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
describe('Account Activate/Deactivate Endpoint', function () {
  it('Account ACTIVATE method should exist', function () {
    _accounts["default"].activate.should.exist;
  });
  it('Activate(PATCH) should change account status', function (done) {
    _chai["default"].request(_index["default"]).patch('/api/v1/accounts/2019031111').send({
      status: 'active'
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
describe('Error Handling (Account Activate/Deactivate Endpoint)', function () {
  it('return an ERROR if STATUS is not supplied', function (done) {
    _chai["default"].request(_index["default"]).patch('/api/v1/accounts/2019031111').send({// status: 'active',
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
describe('Account Delete Endpoint', function () {
  it('Account DELETE method should exist', function () {
    _accounts["default"]["delete"].should.exist;
  });
  it('Delete(DELETE) should delete account from records', function (done) {
    _chai["default"].request(_index["default"])["delete"]('/api/v1/accounts/2019031112').end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.equal(200);
      res.body.should.have.property('message');
    });

    done();
  });
});
describe('Accounts List Endpoint', function () {
  it('Account LIST method should exist', function () {
    _accounts["default"].list.should.exist;
  });
  it('List(GET) should list all (available) accounts from records', function (done) {
    _chai["default"].request(_index["default"]).get('/api/v1/accounts').end(function (err, res) {
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
describe('Single Account List Endpoint', function () {
  it('Account LISTONE method should exist', function () {
    _accounts["default"].listOne.should.exist;
  });
  it('ListOne(GET) should list a specific account from records', function (done) {
    _chai["default"].request(_index["default"]).get('/api/v1/accounts/2019031113').end(function (err, res) {
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