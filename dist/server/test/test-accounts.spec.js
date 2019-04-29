"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../../index"));

var _accounts = _interopRequireDefault(require("../controllers/accounts"));

var _testConnect = _interopRequireDefault(require("../db/test-connect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-unused-vars */

/* eslint-disable no-console */

/* eslint-disable no-unused-expressions */

/* eslint-disable no-undef */
var accounts;
var text = 'SELECT accountnumber FROM accounts';

_testConnect["default"].query(text).then(function (result) {
  var allAccounts = result.rows;
  accounts = allAccounts;
})["catch"](function (err) {
  console.group(err);
});

var should = _chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

var myToken;
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
  }); // test1-1

  describe('Account Controller', function () {
    it('AccountController should exist', function () {
      _accounts["default"].should.exist;
    });
  });
  describe('Account Creation Endpoint', function () {
    // test1-2
    it('Account CREATE method should exist', function () {
      _accounts["default"].create.should.exist;
    }); // test1-3

    it('Create(POST) should create a new account', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/accounts').set('Authorization', "Bearer ".concat(myToken)).send({
        type: 'current'
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
  }); // test1-4

  describe('Error Handling (Account Creation Endpoint)', function () {
    // it('should return an ERROR if owner ID is invalid', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/accounts')
    //     .set('Authorization', `Bearer ${myToken}`)
    //     .send({
    //       owner: '1fr',
    //       type: 'current',
    //     })
    //     .end((err, res) => {
    //       res.should.have.status(400);
    //       res.should.be.json;
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('status');
    //       res.body.status.should.equal(400);
    //       res.body.should.have.property('error');
    //     });
    //   done();
    // });
    // // test1-5
    // it('should return an ERROR if owner ID not supplied', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/accounts')
    //     .set('Authorization', `Bearer ${myToken}`)
    //     .send({
    //     // owner: 1,
    //       type: 'current',
    //     })
    //     .end((err, res) => {
    //       res.should.have.status(400);
    //       res.should.be.json;
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('status');
    //       res.body.status.should.equal(400);
    //       res.body.should.have.property('error');
    //     });
    //   done();
    // });
    // test1-6
    it('should return an ERROR if account TYPE is not supplied', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/accounts').set('Authorization', "Bearer ".concat(myToken)).send({
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
    }); // test1-7
    // it('should return an ERROR if account owner does not exist', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/accounts')
    //     .set('Authorization', `Bearer ${myToken}`)
    //     .send({
    //       owner: 111,
    //       type: 'current',
    //     })
    //     .end((err, res) => {
    //       res.should.have.status(400);
    //       res.should.be.json;
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('status');
    //       res.body.status.should.equal(400);
    //       res.body.should.have.property('error');
    //     });
    //   done();
    // });
  });
  describe('Account Activate/Deactivate Endpoint', function () {
    // test2-1
    it('Account ACTIVATE method should exist', function () {
      _accounts["default"].activate.should.exist;
    }); // test2-2

    it('Activate(PATCH) should change account status', function (done) {
      _chai["default"].request(_index["default"]).patch("/api/v1/accounts/".concat(accounts[2].accountnumber)).set('Authorization', "Bearer ".concat(myToken)).send({
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
    // test2-3
    it('return an ERROR if STATUS is invalid', function (done) {
      _chai["default"].request(_index["default"]).patch('/api/v1/accounts/2019031111').set('Authorization', "Bearer ".concat(myToken)).send({
        status: 'activerrr'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });

      done();
    }); // test2-4

    it('return an ERROR if STATUS is not supplied', function (done) {
      _chai["default"].request(_index["default"]).patch('/api/v1/accounts/2019031111').set('Authorization', "Bearer ".concat(myToken)).send({// status: 'active',
      }).end(function (err, res) {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });

      done();
    }); // test2-5

    it('return an ERROR if STATUS supplied is neither DORMANT nor ACTIVE', function (done) {
      _chai["default"].request(_index["default"]).patch('/api/v1/accounts/2019031111').set('Authorization', "Bearer ".concat(myToken)).send({
        status: 'activedorm'
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
  }); // test3-1

  describe('Account Delete Endpoint', function () {
    it('Account DELETE method should exist', function () {
      _accounts["default"]["delete"].should.exist;
    }); // test3-2

    it('Delete(DELETE) should delete account from records', function (done) {
      _chai["default"].request(_index["default"])["delete"]("/api/v1/accounts/".concat(accounts[0].accountnumber)).set('Authorization', "Bearer ".concat(myToken)).end(function (err, res) {
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
  describe('Error Handling (Account Delete Endpoint)', function () {
    // test3-3
    it('return an ERROR if account number is INVALID', function (done) {
      _chai["default"].request(_index["default"])["delete"]('/api/v1/accounts/20190311error').set('Authorization', "Bearer ".concat(myToken)).end(function (err, res) {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });

      done();
    }); // test3-4

    it('return an ERROR if account not available', function (done) {
      _chai["default"].request(_index["default"])["delete"]('/api/v1/accounts/2019031110').set('Authorization', "Bearer ".concat(myToken)).end(function (err, res) {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(404);
        res.body.should.have.property('error');
      });

      done();
    });
  }); // test4-1

  describe('Accounts List All Accounts Endpoint', function () {
    it('Account ListAllAccounts method should exist', function () {
      _accounts["default"].listAllAccounts.should.exist;
    }); // test4-2

    it('List(GET) should list all (available) accounts from records', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/accounts').set('Authorization', "Bearer ".concat(myToken)).end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(200);
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
      });

      done();
    });
  });
  describe('List Account Endpoint', function () {
    // test5-1
    it('Account ListAccount method should exist', function () {
      _accounts["default"].listAccount.should.exist;
    }); // test5-2

    it('ListAccount(GET) should list a specific account from records', function (done) {
      _chai["default"].request(_index["default"]).get("/api/v1/accounts/".concat(accounts[1].accountnumber)).set('Authorization', "Bearer ".concat(myToken)).end(function (err, res) {
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
  describe('Error Handling (List Account Endpoint)', function () {
    // test5-3
    it('should return an ERROR if account number is INVALID', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/accounts/201903111err').set('Authorization', "Bearer ".concat(myToken)).end(function (err, res) {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });

      done();
    }); // test5-4

    it('should return an ERROR if account number is not available', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/accounts/2019031111').set('Authorization', "Bearer ".concat(myToken)).end(function (err, res) {
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
  describe('ListAccount(GET) with req.query (accounts?status="")', function () {
    // test5-5
    it('(accounts?status="active") should list active accounts', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/accounts/accounts?status=active').set('Authorization', "Bearer ".concat(myToken)).end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(200);
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
      });

      done();
    }); // test5-6

    it('(accounts?status="dormant") should list dormant accounts', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/accounts/accounts?status=dormant').set('Authorization', "Bearer ".concat(myToken)).end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(200);
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
      });

      done();
    });
  });
  describe('Error Handling (ListAccount(GET) with req.query (accounts?status="")', function () {
    // test5-7
    it('should return an ERROR if query value is neither ACTIVE nor DORMANT', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/accounts/accounts?status="dormactive"').set('Authorization', "Bearer ".concat(myToken)).end(function (err, res) {
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
  describe('GET Transactions Endpoint', function () {
    // test6-1
    it('getTransactions METHOD should exist', function () {
      _accounts["default"].getTransactions.should.exist;
    }); // test6-2

    it('should return a list of transactions for a specified account', function (done) {
      _chai["default"].request(_index["default"]).get("/api/v1/accounts/".concat(accounts[2].accountnumber, "/transactions")).set('Authorization', "Bearer ".concat(myToken)).end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(200);
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
      });

      done();
    });
  });
  describe('Error Handling (GET Transactions Endpoint)', function () {
    // test6-3
    it('return an ERROR if params is not "transactions"', function (done) {
      _chai["default"].request(_index["default"]).get("/api/v1/accounts/".concat(accounts[2].accountnumber, "/transact")).set('Authorization', "Bearer ".concat(myToken)).end(function (err, res) {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });

      done();
    }); // test6-4

    it('return an ERROR if accountnumber does not exist', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/accounts/2019031112/transactions').set('Authorization', "Bearer ".concat(myToken)).end(function (err, res) {
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
  describe('getuserBankAccounts Endpoint', function () {
    // test7-1
    it('getUserBankAccounts method should exist', function () {
      _accounts["default"].getUserBankAccounts.should.exist;
    }); // test7-2

    it('GET getUSerBankAccounts should return a list of a specific user"s bank accounts', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/accounts/user/admin@banka.com/accounts').set('Authorization', "Bearer ".concat(myToken)).end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(200);
        res.body.should.have.property('accounts');
        res.body.accounts.should.be.a('array');
      });

      done();
    });
  });
  describe('Error Handling (getuserBankAccounts Endpoint)', function () {
    // test7-3
    it('should return an ERROR if "/accounts" not in params', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/accounts/user/dami@gmail.com/').set('Authorization', "Bearer ".concat(myToken)).end(function (err, res) {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });

      done();
    }); // test7-4

    it('should return an ERROR if email is INVALID', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/accounts/user/invalid@@banka.com/accounts').set('Authorization', "Bearer ".concat(myToken)).end(function (err, res) {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });

      done();
    }); // test7-5

    it('should return an ERROR if email does not exist in records', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/accounts/user/invalid@banka.com/accounts').set('Authorization', "Bearer ".concat(myToken)).end(function (err, res) {
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