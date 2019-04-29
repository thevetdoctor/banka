"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../../index"));

var _transactions = _interopRequireDefault(require("../controllers/transactions"));

var _testConnect = _interopRequireDefault(require("../db/test-connect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */

/* eslint-disable no-undef */

/* eslint-disable no-unused-expressions */
var accounts;
var text = 'SELECT accountnumber FROM accounts';

_testConnect["default"].query(text).then(function (result) {
  var allAccounts = result.rows;
  accounts = allAccounts;
})["catch"](function (err) {
  console.group(err);
}); // eslint-disable-next-line no-unused-vars


var should = _chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

var myToken;
var cashierToken;
describe('Testing...', function () {
  before(function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
      email: 'admin@banka.com',
      password: 'password1'
    }).end(function (err, res) {
      var token = res.body.data.token;
      myToken = token;
      done(err);
    });
  });
  before(function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
      email: 'c@banka.com',
      password: 'password3'
    }).end(function (err, res) {
      var token = res.body.data.token;
      cashierToken = token;
      done(err);
    });
  });
  describe('Transaction Controller', function () {
    it('TransactionController should exist', function () {
      _transactions["default"].should.exist;
    });
  });
  describe('Credit/Debit Transaction Endpoint', function () {
    it('CreditAndDebit transaction method should exist', function () {
      _transactions["default"].creditAndDebit.should.exist;
    });
    it('Credit/Debit(POST) should credit/debit an account with the specified amount', function (done) {
      _chai["default"].request(_index["default"]).post("/api/v1/transactions/".concat(accounts[2].accountnumber, "/debit")).set('Authorization', "Bearer ".concat(cashierToken)).send({
        amount: '00.00'
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
    it('CreditAndDebit transaction method should exist', function () {
      _transactions["default"].creditAndDebit.should.exist;
    });
    it('Credit/Debit(POST) should credit/debit an account with the specified amount', function (done) {
      _chai["default"].request(_index["default"]).post("/api/v1/transactions/".concat(accounts[2].accountnumber, "/credit")).set('Authorization', "Bearer ".concat(cashierToken)).send({
        amount: '1200.00'
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
  describe('Error Handling (Credit/Debit Transaction Endpoint)', function () {
    it('should return an ERROR if amount to DEBIT is not supplied', function (done) {
      _chai["default"].request(_index["default"]).post("/api/v1/transactions/".concat(accounts[2].accountnumber, "/debit")).set('Authorization', "Bearer ".concat(cashierToken)).send({// amount: '30000.21',
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
    it('should return an ERROR if amount to CREDIT is not supplied', function (done) {
      _chai["default"].request(_index["default"]).post("/api/v1/transactions/".concat(accounts[2].accountnumber, "/credit")).set('Authorization', "Bearer ".concat(cashierToken)).send({// amount: '30000.21',
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
    it('should return an ERROR if amount to credit is INVALID', function (done) {
      _chai["default"].request(_index["default"]).post("/api/v1/transactions/".concat(accounts[2].accountnumber, "/credit")).set('Authorization', "Bearer ".concat(cashierToken)).send({
        amount: '30000.21wer'
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
    it('should return an ERROR if amount to debit is INVALID', function (done) {
      _chai["default"].request(_index["default"]).post("/api/v1/transactions/".concat(accounts[2].accountnumber, "/debit")).set('Authorization', "Bearer ".concat(cashierToken)).send({
        amount: '30000.21wer'
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
    it('should return an ERROR if "type" of transaction is neither CREDIT not DEBIT', function (done) {
      _chai["default"].request(_index["default"]).post("/api/v1/transactions/".concat(accounts[2].accountnumber, "/debitcredit")).set('Authorization', "Bearer ".concat(cashierToken)).send({
        amount: '30000.21'
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
    it('should return an ERROR if account supplied does not exist', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/transactions/2019031112/credit').set('Authorization', "Bearer ".concat(cashierToken)).send({
        amount: '30000.21'
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
    it('should return an ERROR if account supplied does not exist', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/transactions/2019031112/debit').set('Authorization', "Bearer ".concat(cashierToken)).send({
        amount: '30.21'
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
    it('should return an ERROR if there"s insufficient balance for debit transaction', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/transactions/2019031111/debit').set('Authorization', "Bearer ".concat(cashierToken)).send({
        amount: '30000000000.21'
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
});