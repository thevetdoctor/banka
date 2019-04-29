"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _faker = _interopRequireDefault(require("faker"));

var _connect = _interopRequireDefault(require("../db/connect"));

var _accounts = _interopRequireDefault(require("../models/accounts"));

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
      var type = req.body.type;
      var _req$token = req.token,
          id = _req$token.id,
          firstname = _req$token.firstname,
          lastname = _req$token.lastname,
          email = _req$token.email;

      var newAccount = _faker["default"].finance.account();

      var account = new _accounts["default"](type);
      var text = 'INSERT INTO accounts (accountnumber, createdOn, owner, type, status, balance) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      var values = [newAccount, account.createdOn, id, type, account.status, account.balance];

      if (type.trim() === 'current' || type.trim() === 'savings') {
        _connect["default"].query(text, values).then(function (result) {
          console.log(result.rows[0]);
          var _result$rows$ = result.rows[0],
              accountnumber = _result$rows$.accountnumber,
              type = _result$rows$.type,
              balance = _result$rows$.balance;

          if (!result.rows[0]) {
            res.status(400).json({
              status: 400,
              error: 'Account not created'
            });
            return;
          }

          return res.status(201).json({
            status: 201,
            data: {
              accountnumber: accountnumber,
              firstname: firstname,
              lastname: lastname,
              email: email,
              type: type,
              balance: balance
            }
          });
        })["catch"](function (error) {
          res.status(400).json({
            status: 400,
            error: error.message
          });
        });
      } else {
        res.status(400).json({
          status: 400,
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
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
=======
          error: error.message
>>>>>>> feature(refactoring):refactor the controllers
=======
          error: 'Only cuurent and savings allowed'
>>>>>>> feature(authorization):plus feedback implementation
        });
      }
    }
  }, {
    key: "activate",
    value: function activate(req, res) {
      var accountStatus = req.body.status;
      var accountNumber = req.params.accountNumber;
<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
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
=======
      accountNumber = parseInt(accountNumber, 10);
      var text = 'UPDATE accounts SET status = $1 WHERE accountnumber = $2 RETURNING *';
      var values = [accountStatus, accountNumber]; // eslint-disable-next-line no-constant-condition

      if (accountStatus === 'dormant' || accountStatus === 'active') {
        _connect["default"].query(text, values).then(function (result) {
          // console.log(result.rows);
          if (result.rows.length > 0) {
            res.status(200).json({
              status: 200,
              data: {
                accountNumber: accountNumber,
                status: accountStatus
              }
            });
          } else {
            res.status(400).json({
              status: 400,
              error: 'Account does not exist'
            });
          }
        })["catch"](function (err) {
          res.status(400).json({
            status: 400,
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
            error: err
>>>>>>> feature(refactoring):refactor the controllers
=======
            error: "".concat(err, ", Account does not exist")
>>>>>>> feature(authorization):plus feedback implementation
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
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
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
=======
      var text = 'DELETE * FROM accounts WHERE accountnumber = $1';
=======
      var text = 'DELETE FROM accounts WHERE accountnumber = $1 RETURNING *';
>>>>>>> feature(authorization):plus feedback implementation
      var values = [accountNumber];

      _connect["default"].query(text, values).then(function (result) {
        // console.log(result.rows);
        if (result.rows.length > 0) {
          res.status(200).json({
            status: 200,
            message: "Account No: ".concat(accountNumber, " successfully deleted")
          });
        } else {
          res.status(404).json({
            status: 404,
            error: 'Account not available'
          });
        }
      })["catch"](function (err) {
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
        res.status(404).json({
          status: 404,
          error: "".concat(err, " or Account not available")
>>>>>>> feature(refactoring):refactor the controllers
        });
      });
    }
  }, {
    key: "listAllAccounts",
    value: function listAllAccounts(req, res) {
<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
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
=======
      var text = 'SELECT * FROM accounts INNER JOIN users ON accounts.owner = users.id';
=======
        console.log("".concat(err));
      });
    }
  }, {
    key: "getTransactions",
    value: function getTransactions(req, res) {
      var accountNumber = req.params.accountNumber;
      var text = 'SELECT * FROM transactions WHERE accountnumber = $1';
      var values = [accountNumber];
>>>>>>> feature(authorization):plus feedback implementation

      _connect["default"].query(text, values).then(function (result) {
        // if (result.rows.length > 0) {
        res.status(200).json({
          status: 200,
          data: result.rows
        }); // } else {
        // res.status(400).json({
        // status: 400,
        // error: 'Not available',
        // });
        // }
      })["catch"](function (err) {
        res.status(400).json({
          status: 400,
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
          error: err
>>>>>>> feature(refactoring):refactor the controllers
=======
          error: "".concat(err, ", Account does not exist")
>>>>>>> feature(authorization):plus feedback implementation
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

<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
      if (req.query.status === undefined) {
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
        console.log('no status');
=======
        console.log('no status'); // if no 'status' indicated as a req.query, proceed with get single account
>>>>>>> immersive
=======
      if (status === undefined) {
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
        console.log('no status');
>>>>>>> feature(refactoring):refactor the controllers

=======
        // console.log('no status');
>>>>>>> feature(authorization):plus feedback implementation
        _connect["default"].query(text1, values1).then(function (result) {
          // console.log(result.rows);
          if (result.rows.length < 1) {
            res.status(404).json({
              status: 404,
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
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
          res.status(400).json({
            status: 400,
<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
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
=======
=======
          res.status(403).json({
            status: 403,
>>>>>>> feature(authorization):plus feedback implementation
            error: err
>>>>>>> feature(refactoring):refactor the controllers
          });
        });
      } else {
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
        console.log('status available');

<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
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
=======
=======
        // console.log('status available');
        // eslint-disable-next-line no-lonely-if
>>>>>>> feature(authorization):plus feedback implementation
        if (status === 'active' || status === 'dormant') {
          _connect["default"].query(text2, values2).then(function (result) {
            // console.log(result.rows);
            if (result.rows) {
              res.status(200).json({
                status: 200,
                data: result.rows
              });
            }
          })["catch"](function (err) {
            res.status(402).json({
              status: 402,
              error: err
>>>>>>> feature(refactoring):refactor the controllers
            });
          });
        } else {
          res.status(401).json({
            status: 401,
            error: 'Query should be spelt \'active\' OR \'dormant\''
          });
        }
      }
    }
  }, {
    key: "getUserBankAccounts",
    value: function getUserBankAccounts(req, res) {
      var userEmailAddress = req.params.userEmailAddress;
      var accounts = req.params.accounts; // console.log(req.params);
      // console.log(userEmailAddress, accounts);

      var text = 'SELECT * FROM users INNER JOIN accounts ON users.id = accounts.owner WHERE EMAIL = $1';
      var values = [userEmailAddress];

<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
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
=======
      _connect["default"].query(text, values).then(function (result) {
        // console.log(result.rows);
        if (result.rows.length < 1) {
          res.status(400).json({
            status: 400,
            error: "User with email: '".concat(userEmailAddress, "' not found")
          });
          return;
        }

        var list = result.rows.map(function (item) {
          return {
            createdOn: item.createdon,
            accountNumber: item.accountnumber,
            type: item.type,
            status: item.status,
            balance: item.balance
          };
        });
        res.status(200).json({
          status: 200,
          accounts: list
        });
      })["catch"](function (err) {
        res.status(400).json({
          status: 400,
          error: err
>>>>>>> feature(refactoring):refactor the controllers
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
<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
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
=======
          error: err
>>>>>>> feature(refactoring):refactor the controllers
        });
      });
    }
  }]);

  return AccountController;
}();

var _default = AccountController;
exports["default"] = _default;