"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = _interopRequireDefault(require("pg"));

var _config = _interopRequireDefault(require("../config"));

var _accounts = _interopRequireDefault(require("../models/accounts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var regExp = /[^0-9]/;
var validEmail = /(.+)@(.+){2,}\.(.+){2,}/;
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
          type = _req$body.type;

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

      if (account.owner === undefined || account.owner === '') {
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
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
              message: 'Account owner does not exist'
=======
              error: 'Account owner does not exist'
>>>>>>> immersive
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
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
                  }

                  console.log(result.rows, 'nothing');
                  console.log(accountOwner);
=======
                  } // console.log(result.rows, 'nothing');
                  // console.log(accountOwner);


>>>>>>> immersive
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
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
              });
              res.status(200).json({
                status: 200
              });
=======
              }); // res.status(200).json({
              // status: 200,
              // });

>>>>>>> immersive
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
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
      accountNumber = parseInt(accountNumber, 10);
      console.log(accountStatus);
=======
      accountNumber = parseInt(accountNumber, 10); // console.log(accountStatus);
>>>>>>> immersive

      if (typeof accountStatus !== 'string') {
        res.status(400).json({
          status: 400,
          error: 'Invalid status supplied'
        });
        return;
      }

      if (accountStatus === undefined || accountStatus.trim() === '') {
        res.status(400).json({
          status: 400,
          error: 'Status not supplied'
        });
        return;
      } // eslint-disable-next-line no-constant-condition


      if (accountStatus === 'dormant') {
        pool.connect(function (err, client, done) {
          if (err) {
            console.log(err);
          }

          client.query('UPDATE accounts SET status = $1 WHERE accountnumber = $2', [accountStatus, accountNumber], function (err, result) {
            if (err) {
              console.log(err);
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
            }

            console.log(result.rows);
=======
            } // console.log(result.rows);


>>>>>>> immersive
            res.status(200).json({
              status: 200,
              data: {
                accountNumber: accountNumber,
                status: accountStatus
              }
            });
          });
          done();
        });
      } else if (accountStatus === 'active') {
        pool.connect(function (err, client, done) {
          if (err) {
            console.log(err);
          }

          client.query('UPDATE accounts SET status = $1 WHERE accountnumber = $2', [accountStatus, accountNumber], function (err, result) {
            if (err) {
              console.log(err);
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
            }

            console.log(result.rows);
=======
            } // console.log(result.rows);


>>>>>>> immersive
            res.status(200).json({
              status: 200,
              data: {
                accountNumber: accountNumber,
                status: accountStatus
              }
            });
          });
          done();
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
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
=======

      if (regExp.test(accountNumber)) {
        regExp.status(400).json({
          status: 400,
          error: 'Invalid account number supplied'
        });
      }

>>>>>>> immersive
      pool.connect(function (err, client, done) {
        if (err) {
          console.log(err);
        }

        client.query('SELECT * FROM accounts WHERE accountnumber = $1', [accountNumber], function (err, result) {
          if (err) {
            console.log(err);
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
          }

          console.log(result.rows);
=======
          } // console.log(result.rows);

>>>>>>> immersive

          if (result.rows.length < 1) {
            res.status(404).json({
              status: 404,
              error: 'Account not available'
            });
            return;
          }

          pool.connect(function (err, client, done) {
            if (err) {
              console.log(err);
            }

            client.query('DELETE FROM accounts WHERE accountnumber = $1', [accountNumber], function (err, result) {
              if (err) {
                console.log(err);
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
              }

              console.log(result.rows);
=======
              } // console.log(result.rows);


>>>>>>> immersive
              res.status(200).json({
                status: 200,
                message: "Account No: ".concat(accountNumber, " successfully deleted")
              });
            });
            done();
          });
        });
        done();
      });
    }
  }, {
    key: "listAllAccounts",
    value: function listAllAccounts(req, res) {
      pool.connect(function (err, client, done) {
        if (err) {
          console.log(err);
        }

        client.query('SELECT * FROM accounts INNER JOIN users ON accounts.owner = users.id', function (err, result) {
          if (err) {
            console.log(err);
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
          }

          console.log(result.rows);
=======
          } // console.log(result.rows);


>>>>>>> immersive
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
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa

          if (result.rows.length < 1) {
            res.status(400).json({
              status: 400,
              error: 'No account available'
            });
          } else {
            res.status(200).json({
              status: 200,
              data: newAccountArrray
            });
          }
=======
          res.status(200).json({
            status: 200,
            data: newAccountArrray
          });
>>>>>>> immersive
        });
        done();
      });
    }
  }, {
    key: "listAccount",
    value: function listAccount(req, res) {
      var accountNumber = req.params.accountNumber;

      if (req.query.status === undefined) {
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
        console.log('no status');
=======
        console.log('no status'); // if no 'status' indicated as a req.query, proceed with get single account
>>>>>>> immersive

        if (regExp.test(accountNumber)) {
          res.status(400).json({
            status: 400,
            error: 'Invalid account number'
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
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
            }

            console.log(result.rows);
=======
            } // console.log(result.rows);


>>>>>>> immersive
            var account = result.rows.find(function (item) {
              return item.accountnumber === Number(accountNumber);
            });

            if (!account) {
              res.status(400).json({
                status: 400,
                error: "Account no: ".concat(accountNumber, " not available")
              });
            } else {
              res.status(200).json({
                status: 200,
                data: {
                  accountDetails: account
                }
              });
            }
          });
          done();
        });
      } else {
        console.log('status available');

        if (req.query.status === 'active') {
          pool.connect(function (err, client, done) {
            if (err) {
              console.log(err);
            }

            client.query('SELECT * FROM accounts WHERE status = $1', [req.query.status], function (err, result) {
              if (err) {
                console.log(err);
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
              }

              console.log(result.rows);

              if (result.rows.length < 1) {
                res.status(204).json({
                  status: 204,
                  error: 'No ACTIVE BANK ACCOUNTS available'
                });
                return;
              }
=======
              } // console.log(result.rows);

>>>>>>> immersive

              res.status(200).json({
                status: 200,
                data: result.rows
              });
            });
            done();
          });
        } else if (req.query.status === 'dormant') {
          pool.connect(function (err, client, done) {
            if (err) {
              console.log(err);
            }

            client.query('SELECT * FROM accounts WHERE status = $1', [req.query.status], function (err, result) {
              if (err) {
                console.log(err);
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
              }

              console.log(result.rows);

              if (result.rows.length < 1) {
                res.status(204).json({
                  status: 204,
                  error: 'No DORMANT BANK ACCOUNTS available'
                });
                return;
              }
=======
              } // console.log(result.rows);

>>>>>>> immersive

              res.status(200).json({
                status: 200,
                data: result.rows
              });
            });
            done();
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
      var transactions = req.params.transactions;
      console.log(req.params);

      if (transactions !== 'transactions') {
        res.status(400).json({
          status: 400,
          error: 'Params can only be transactions'
        });
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
=======
        return;
>>>>>>> immersive
      }

      pool.connect(function (err, client, done) {
        if (err) {
          console.log(err);
        }

        client.query('SELECT * FROM accounts WHERE accountnumber = $1', [accountNumber], function (err, result) {
          if (err) {
            console.log(err);
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
          }

          console.log(result.rows);
          console.log(accountNumber);
=======
          } // console.log(result.rows);
          // console.log(accountNumber);

>>>>>>> immersive

          if (result.rows.length < 1) {
            res.status(400).json({
              status: 400,
              error: 'Account Number does not exist'
            });
            return;
          }

          pool.connect(function (err, client, done) {
            if (err) {
              console.log(err);
            }

            client.query('SELECT * FROM transactions WHERE accountnumber = $1', [accountNumber], function (err, result) {
              if (err) {
                console.log(err);
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
              }

              console.log(result.rows);
=======
              } // console.log(result.rows);


>>>>>>> immersive
              res.status(200).json({
                status: 200,
                data: result.rows
              });
            });
            done();
          });
          done();
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

      if (accounts !== 'accounts') {
        res.status(400).json({
          status: 400,
          error: 'Params must be user-email-address/accounts'
        });
        return;
      }

      if (!validEmail.test(userEmailAddress)) {
        res.status(400).json({
          status: 400,
          error: 'Invalid Email'
        });
        return;
      }

      pool.connect(function (err, client, done) {
        if (err) {
          console.log(err);
        }

        client.query('SELECT * FROM users INNER JOIN accounts ON users.id = accounts.owner', function (err, result) {
          if (err) {
            console.log(err);
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
          }

          console.log(result.rows);
=======
          } // console.log(result.rows);


>>>>>>> immersive
          var userAccounts = result.rows.filter(function (item) {
            return item.email === userEmailAddress;
          });

          if (userAccounts.length < 1) {
            res.status(400).json({
              status: 400,
              error: "User with email: '".concat(userEmailAddress, "' not found")
            });
            return;
          }

          res.status(200).json({
            status: 200,
            accounts: userAccounts
          });
        });
        done();
      });
    }
  }]);

  return AccountController;
}();

var _default = AccountController;
exports["default"] = _default;