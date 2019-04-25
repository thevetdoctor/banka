"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connect = _interopRequireDefault(require("../db/connect"));

var _accounts = _interopRequireDefault(require("../models/accounts"));

var _generateAccountNo = _interopRequireDefault(require("../helper/generateAccountNo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AccountController =
/*#__PURE__*/
function () {
  function AccountController() {
    _classCallCheck(this, AccountController);
  }

  _createClass(AccountController, null, [{
    key: "create",
    value: function create(req, res) {
      var _req$body = req.body,
          owner = _req$body.owner,
          type = _req$body.type;
      var account = new _accounts["default"](owner, type);
      var newAccount = (0, _generateAccountNo["default"])();
      console.log(account.accountNumber);
      var text = 'INSERT INTO accounts (accountnumber, createdOn, owner, type, status, balance) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      var values = [newAccount, account.createdOn, owner, type, account.status, account.balance];

      _connect["default"].query(text, values).then(function (result) {
        console.log(result.rows[0]);
        var _result$rows$ = result.rows[0],
            accountnumber = _result$rows$.accountnumber,
            firstname = _result$rows$.firstname,
            lastname = _result$rows$.lastname,
            email = _result$rows$.email,
            type2 = _result$rows$.type2,
            openingBalance = _result$rows$.openingBalance;

        if (!result.rows[0]) {
          return res.status(400).json({
            status: 400,
            error: 'Account not created'
          });
        }

        return res.status(201).json({
          status: 201,
          data: {
            accountnumber: accountnumber,
            firstname: firstname,
            lastname: lastname,
            email: email,
            type: type2,
            openingBalance: openingBalance
          }
        });
      })["catch"](function (error) {
        res.status(400).json({
          status: 400,
          error: error.message
        });
      });
    }
  }, {
    key: "activate",
    value: function activate(req, res) {
      var accountStatus = req.body.status;
      var accountNumber = req.params.accountNumber;
      accountNumber = parseInt(accountNumber, 10);
      var text = 'UPDATE accounts SET status = $1 WHERE accountnumber = $2';
      var values = [accountStatus, accountNumber]; // eslint-disable-next-line no-constant-condition

      if (accountStatus === 'dormant' || accountStatus === 'active') {
        _connect["default"].query(text, values).then(function (result) {
          console.log(result.rows);
          res.status(200).json({
            status: 200,
            data: {
              accountNumber: accountNumber,
              status: accountStatus
            }
          });
        })["catch"](function (err) {
          res.status(400).json({
            status: 400,
            error: err
          });
        });
      } else {
        res.status(400).json({
          status: 400,
          error: 'Status can only be dormant OR active'
        });
      }
    }
  }, {
    key: "delete",
    value: function _delete(req, res) {
      var accountNumber = req.params.accountNumber;
      accountNumber = parseInt(accountNumber, 10);
      var text = 'DELETE * FROM accounts WHERE accountnumber = $1';
      var values = [accountNumber];

      _connect["default"].query(text, values).then(function (result) {
        console.log(result.rows);
        res.status(200).json({
          status: 200,
          message: "Account No: ".concat(accountNumber, " successfully deleted")
        });
      })["catch"](function (err) {
        res.status(404).json({
          status: 404,
          error: "".concat(err, " or Account not available")
        });
      });
    }
  }, {
    key: "listAllAccounts",
    value: function listAllAccounts(req, res) {
      var text = 'SELECT * FROM accounts INNER JOIN users ON accounts.owner = users.id';

      _connect["default"].query(text).then(function (result) {
        // console.log(result.rows);
        var newAccountArrray = result.rows.map(function (item) {
          return {
            createdOn: item.createdon,
            accountNumber: item.accountnumber,
            ownerEmail: item.email,
            type: item.type,
            status: item.status,
            balance: item.balance
          };
        });
        res.status(200).json({
          status: 200,
          data: newAccountArrray
        });
      })["catch"](function (err) {
        res.status(400).json({
          status: 400,
          error: err
        });
      });
    }
  }, {
    key: "listAccount",
    value: function listAccount(req, res) {
      var accountNumber = req.params.accountNumber;
      var status = req.query.status;
      var text1 = 'SELECT * FROM accounts WHERE accountnumber = $1';
      var values1 = [accountNumber];
      var text2 = 'SELECT * FROM accounts WHERE status = $1';
      var values2 = [status];

      if (status === undefined) {
        console.log('no status');

        _connect["default"].query(text1, values1).then(function (result) {
          // console.log(result.rows);
          if (result.rows.length < 1) {
            res.status(400).json({
              status: 400,
              error: "Account no: ".concat(accountNumber, " not available")
            });
          } else {
            res.status(200).json({
              status: 200,
              data: {
                accountDetails: result.rows[0]
              }
            });
          }
        })["catch"](function (err) {
          res.status(400).json({
            status: 400,
            error: err
          });
        });
      } else {
        console.log('status available');

        if (status === 'active' || status === 'dormant') {
          _connect["default"].query(text2, values2).then(function (result) {
            // console.log(result.rows);
            res.status(200).json({
              status: 200,
              data: result.rows
            });
          })["catch"](function (err) {
            res.status(400).json({
              status: 400,
              error: err
            });
          });
        } else {
          res.status(400).json({
            status: 400,
            error: 'Query should be spelt \'active\' OR \'dormant\''
          });
        }
      }
    }
  }, {
    key: "getTransactions",
    value: function getTransactions(req, res) {
      var accountNumber = req.params.accountNumber;
      console.log(req.params);
      var text = 'SELECT * FROM transactions WHERE accountnumber = $1';
      var values = [accountNumber];

      _connect["default"].query(text, values).then(function (result) {
        if (result.rows.length < 1) {
          res.status(400).json({
            status: 400,
            error: 'Account Number does not exist'
          });
          return;
        }

        res.status(200).json({
          status: 200,
          data: result.rows
        });
      })["catch"](function (err) {
        res.status(400).json({
          status: 400,
          error: err
        });
      });
    }
  }, {
    key: "getUserBankAccounts",
    value: function getUserBankAccounts(req, res) {
      var userEmailAddress = req.params.userEmailAddress;
      var accounts = req.params.accounts;
      console.log(req.params);
      console.log(userEmailAddress, accounts);
      var text = 'SELECT * FROM users INNER JOIN accounts ON users.id = accounts.owner WHERE EMAIL = $1';
      var values = [userEmailAddress];

      _connect["default"].query(text, values).then(function (result) {
        // console.log(result.rows);
        if (result.rows.length < 1) {
          res.status(400).json({
            status: 400,
            error: "User with email: '".concat(userEmailAddress, "' not found")
          });
          return;
        }

        res.status(200).json({
          status: 200,
          accounts: result.rows
        });
      })["catch"](function (err) {
        res.status(400).json({
          status: 400,
          error: err
        });
      });
    }
  }]);

  return AccountController;
}();

var _default = AccountController;
exports["default"] = _default;