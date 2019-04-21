"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = _interopRequireDefault(require("pg"));

var _config = _interopRequireDefault(require("../config"));

var _accounts = _interopRequireDefault(require("../models/accounts"));

var _accountRecord = _interopRequireDefault(require("../db/accountRecord"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var regExp = /[^0-9]/;
var pool = new _pg["default"].Pool(_config["default"]);

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
          type = _req$body.type; // console.log(owner);
      // console.log(type);

      if (regExp.test(owner)) {
        res.status(400).json({
          status: 400,
          error: 'Invalid account owner supplied'
        });
        return;
      } // if (type !== 'current' || type !== 'savings') {
      //   res.status(400).json({
      //     status: 400,
      //     error: 'Curent or Savings only',
      //   });
      //   return;
      // }


      var account = new _accounts["default"](owner, type);

      if (account.owner === undefined || account.owner.trim() === '') {
        res.status(400).json({
          status: 400,
          error: 'Account owner not supplied'
        });
        return;
      }

      if (account.type === undefined || account.type.trim() === '') {
        res.status(400).json({
          status: 400,
          error: 'Account type not supplied'
        });
        return;
      }

      pool.connect(function (err, client, done) {
        if (err) {
          console.log(err);
        }

        client.query('SELECT * FROM users', function (err, result) {
          if (err) {
            console.log(err);
          } // console.log(result.rows);


          var accountOwner = result.rows.find(function (item) {
            return item.id === parseInt(account.owner, 10);
          });

          if (!accountOwner || accountOwner === undefined) {
            res.status(400).json({
              status: 400,
              message: 'Account owner does not exist'
            });
            return;
          }

          pool.connect(function (err, client, done) {
            if (err) {
              console.log(err);
            }

            client.query('SELECT * FROM accounts', function (err, result) {
              if (err) {
                console.log(err);
              } // console.log(result.rows);


              var newArr = result.rows.map(function (val) {
                return val.id;
              });
              var accountArray = result.rows.map(function (item) {
                return item.accountnumber;
              });
              account.id = newArr.length !== 0 ? newArr.length + 1 : 1;

              if (newArr.length === 0) {
                account.accountNumber = 2019031111;
              } else {
                // console.log(newArr);
                // console.log(accountArray);
                var newAccountNumber = Math.max.apply(Math, _toConsumableArray(accountArray));
                newAccountNumber += 1;
                account.accountNumber = newAccountNumber;
              }

              pool.connect(function (err, client, done) {
                if (err) {
                  console.log(err);
                } // console.log(account);


                client.query('INSERT INTO accounts (id, accountnumber, createdOn, owner, type, status, balance) VALUES($1, $2, $3, $4, $5, $6, $7)', [account.id, account.accountNumber, account.createdOn, account.owner, account.type, account.status, account.balance], function (err, result) {
                  if (err) {
                    console.log(err);
                  }

                  console.log(result.rows, 'nothing');
                  console.log(accountOwner);
                  res.status(201).json({
                    status: 201,
                    data: {
                      accountNumber: account.accountNumber,
                      firstName: accountOwner.firstname,
                      lastName: accountOwner.lastname,
                      email: accountOwner.email,
                      type: account.type,
                      openingBalance: account.balance
                    }
                  });
                });
                done();
              });
              done();
            });
          });
          done();
        });
      });
    }
  }, {
    key: "activate",
    value: function activate(req, res) {
      var accountStatus = req.body.status;
      var accountNumber = req.params.accountNumber;
      accountNumber = parseInt(accountNumber, 10);
      console.log(accountStatus);

      if (accountStatus === undefined || accountStatus === '') {
        res.status(400).json({
          status: 400,
          error: 'Status not supplied'
        });
        return;
      } // if (accountStatus !== 'dormant' || accountStatus !== 'active') {
      //   res.status(400).json({
      //     status: 400,
      //     message: 'Status can only be dormant or active',
      //   });
      //   return;
      // }
      // eslint-disable-next-line max-len


      var foundAccount = _accountRecord["default"].find(function (item) {
        return item.accountNumber === accountNumber;
      });

      if (foundAccount === undefined) {
        res.status(400).json({
          status: 400,
          error: 'Account not available'
        });
      } else {
        // eslint-disable-next-line max-len
        foundAccount.status = foundAccount.status === accountStatus ? foundAccount.status : accountStatus;
        res.status(200).json({
          status: 200,
          data: {
            accountNumber: accountNumber,
            status: foundAccount.status
          }
        });
      }
    }
  }, {
    key: "delete",
    value: function _delete(req, res) {
      var accountNumber = req.params.accountNumber;
      accountNumber = parseInt(accountNumber, 10);

      var foundAccount = _accountRecord["default"].find(function (item) {
        return item.accountNumber === accountNumber;
      });

      if (foundAccount === undefined) {
        res.status(404).json({
          status: 404,
          error: 'Account not available'
        });
      } else {
        _accountRecord["default"].splice(foundAccount, 1);

        res.status(200).json({
          status: 200,
          message: "Account No: ".concat(foundAccount.accountNumber, " successfully deleted")
        });
      }
    }
  }, {
    key: "list",
    value: function list(req, res) {
      var accountList = _toConsumableArray(_accountRecord["default"]);

      if (accountList.length < 1) {
        res.status(400).json({
          status: 400,
          message: 'No account available'
        });
      } else {
        res.status(200).json({
          status: 200,
          data: {
            accounts: accountList
          }
        });
      }
    }
  }, {
    key: "listOne",
    value: function listOne(req, res) {
      var accountNumber = req.params.accountNumber;

      var accountList = _toConsumableArray(_accountRecord["default"]);

      var account = accountList.find(function (item) {
        return item.accountNumber === Number(accountNumber);
      });

      if (!account) {
        res.status(400).json({
          status: 400,
          message: "Account no: ".concat(accountNumber, " not available")
        });
      } else {
        res.status(200).json({
          status: 200,
          data: {
            accountDetails: account
          }
        });
      }
    }
  }]);

  return AccountController;
}();

var _default = AccountController;
exports["default"] = _default;