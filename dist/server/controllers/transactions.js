"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = _interopRequireDefault(require("pg"));

var _config = _interopRequireDefault(require("../config"));

var _transactions = _interopRequireDefault(require("../models/transactions"));

var _cashierRecord = _interopRequireDefault(require("../db/cashierRecord"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var regExp = /[^0-9]/;
var pool = new _pg["default"].Pool(_config["default"]);

var TransactionController =
/*#__PURE__*/
function () {
  function TransactionController() {
    _classCallCheck(this, TransactionController);
  }

  _createClass(TransactionController, null, [{
    key: "creDebit",
    value: function creDebit(req, res) {
      var amount = req.body.amount;
      var accountNumber = req.params.accountNumber;
      var type = req.params.type;
      var tranx = new _transactions["default"](type, accountNumber, amount); // Validate amount to credit

      if (amount === undefined || amount === '') {
        res.status(400).json({
          status: 400,
          error: 'Amount not supplied'
        });
        return;
      } // eslint-disable-next-line no-restricted-globals


      if (isNaN(amount)) {
        res.status(400).json({
          status: 400,
          error: 'Invalid Amount'
        });
        return;
      } // Run this block if type of transaction is neither credit nor debit


      if (tranx.type !== 'credit' && tranx.type !== 'debit') {
        res.status(400).json({
          status: 400,
          error: 'Invalid Transaction type'
        });
      } else {
        // Run this block for 'valid' transaction type
        // Search Account Records for specific bank account
        pool.connect(function (err, client, done) {
          if (err) {
            console.log(err);
          }

          client.query('SELECT * FROM accounts WHERE accountnumber = $1', [accountNumber], function (err, result) {
            if (err) {
              console.log(err);
            } // console.log(result.rows);


            if (result.rows.length < 1) {
              res.status(400).json({
                status: 400,
                error: 'Account does not exist'
              });
              return;
            }

            var foundAccount = result.rows.find(function (item) {
              return item.accountnumber === parseInt(tranx.accountNumber, 10);
            }); // console.log(foundAccount);

            if (!foundAccount && foundAccount === undefined) {
              res.status(401).json({
                status: 401,
                error: 'Account not available'
              });
            } else {
              // Assign a transaction ID
              pool.connect(function (err, client, done) {
                if (err) {
                  console.log(err);
                }

                client.query('SELECT * FROM transactions', function (err, result) {
                  if (err) {
                    console.log(err);
                  } // console.log(result.rows);


                  tranx.id = result.rows.length !== 0 ? result.rows.length + 1 : 1; // Then, acquire a unique cashier identity

                  tranx.cashier = Math.ceil(Math.random() * 3);

                  var foundCashier = _cashierRecord["default"].find(function (item) {
                    return item.id === tranx.cashier;
                  }); // Run this block for credit transaction


                  if (tranx.type === 'credit') {
                    tranx.oldBalance = Number(foundAccount.balance);
                    tranx.newBalance = tranx.oldBalance + Number(tranx.amount);
                    tranx.newBalance = tranx.newBalance.toFixed(2); // console.log(foundAccount.balance);
                    // console.log(tranx.oldBalance);
                    // console.log(tranx.amount);
                    // console.log(tranx.newBalance);

                    pool.connect(function (err, client, done) {
                      if (err) {
                        console.log(err);
                      }

                      client.query('INSERT INTO transactions (id, createddate, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [tranx.id, tranx.createdOn, tranx.type, tranx.accountNumber, foundCashier.id, tranx.amount, tranx.oldBalance, tranx.newBalance], function (err, result) {
                        if (err) {
                          console.log(err);
                        } // console.log(result.rows);


                        pool.connect(function (err, client, done) {
                          if (err) {
                            console.log(err);
                          }

                          client.query('UPDATE accounts SET balance = $1 WHERE accountnumber = $2', [tranx.newBalance, tranx.accountNumber], function (err, result) {
                            if (err) {
                              console.log(err);
                            } // console.log(result.rows);

                          });
                          done();
                        });
                        res.status(200).json({
                          status: 200,
                          data: {
                            transactionId: tranx.id,
                            accountNumber: tranx.accountNumber,
                            amount: tranx.amount,
                            cashier: foundCashier.id,
                            transactionType: tranx.type,
                            accountBalance: tranx.newBalance
                          }
                        });
                      });
                      done();
                    });
                  } else {
                    // And this block for debit transaction
                    tranx.oldBalance = Number(foundAccount.balance);

                    if (tranx.oldBalance < Number(tranx.amount)) {
                      res.status(400).json({
                        status: 400,
                        error: 'Insufficient balance in account'
                      });
                    } else {
                      // console.log(tranx.oldBalance);
                      tranx.newBalance = tranx.oldBalance - Number(tranx.amount);
                      tranx.newBalance = tranx.newBalance.toFixed(2); // console.log(foundAccount);

                      foundAccount.balance = tranx.newBalance;
                      pool.connect(function (err, client, done) {
                        if (err) {
                          console.log(err);
                        }

                        client.query('INSERT INTO transactions (id, createddate, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [tranx.id, tranx.createdOn, tranx.type, tranx.accountNumber, foundCashier.id, tranx.amount, tranx.oldBalance, tranx.newBalance], function (err, result) {
                          if (err) {
                            console.log(err);
                          } // console.log(result.rows);


                          pool.connect(function (err, client, done) {
                            if (err) {
                              console.log(err);
                            }

                            client.query('UPDATE accounts SET balance = $1 WHERE accountnumber = $2', [tranx.newBalance, tranx.accountNumber], function (err, result) {
                              if (err) {
                                console.log(err);
                              } // console.log(result.rows);

                            });
                            done();
                          });
                          res.status(200).json({
                            status: 200,
                            data: {
                              transactionId: tranx.id,
                              accountNumber: tranx.accountNumber,
                              amount: tranx.amount,
                              cashier: foundCashier.id,
                              transactionType: tranx.type,
                              accountBalance: tranx.newBalance
                            }
                          });
                        });
                        done();
                      });
                    }
                  } // End of debit transaction block

                });
                done();
              });
            }
          });
          done();
        });
      }
    }
  }, {
    key: "getAccountHistory",
    value: function getAccountHistory(req, res) {
      var accountNumber = req.body.accountNumber;
      pool.connect(function (err, client, done) {
        if (err) {
          console.log(err);
        }

        client.query('SELECT * FROM transactions WHERE accountnumber = $1', [accountNumber], function (err, result) {
          if (err) {
            console.log(err);
          }

          console.log(result.rows);
          res.status(200).json({
            status: 200,
            data: []
          });
        });
        done();
      });
    }
  }, {
    key: "getTransaction",
    value: function getTransaction(req, res) {
      var transactionId = req.params.transactionId;

      if (regExp.test(transactionId)) {
        res.status(400).json({
          status: 400,
          error: 'Invalid transaction ID'
        });
        return;
      }

      pool.connect(function (err, client, done) {
        if (err) {
          console.log(err);
        }

        client.query('SELECT * FROM transactions WHERE id = $1', [transactionId], function (err, result) {
          if (err) {
            console.log(err);
          }

          console.log(result.rows);

          if (result.rows.length < 1) {
            res.status(400).json({
              status: 400,
              error: 'Transaction not available'
            });
            return;
          }

          res.status(200).json({
            status: 200,
            data: result.rows[0]
          });
        });
        done();
      });
    }
  }]);

  return TransactionController;
}();

var _default = TransactionController;
exports["default"] = _default;