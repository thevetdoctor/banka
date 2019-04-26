"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connect = _interopRequireDefault(require("../db/connect"));

var _transactions = _interopRequireDefault(require("../models/transactions"));

var _checkBalance = _interopRequireDefault(require("../helper/checkBalance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var regExp = /[^0-9]/;

var TransactionController =
/*#__PURE__*/
function () {
  function TransactionController() {
    _classCallCheck(this, TransactionController);
  }

  _createClass(TransactionController, null, [{
    key: "creditAndDebit",
    value: function creditAndDebit(req, res) {
      var amount = req.body.amount;
      var accountNumber = req.params.accountNumber;
      var type = req.params.type;

      var currentBalance = _checkBalance["default"].checkBalance(accountNumber);

      console.log(currentBalance);

      if (!currentBalance) {
        res.status(400).json({
          status: 400,
          error: 'Account does not exist'
        });
        return;
      }

      var tranx = new _transactions["default"](type, accountNumber, amount);
      var cashierID = 10002; // Run this block for 'valid' transaction type
      // And this block for debit transaction

      if (tranx.type === 'credit') {
        var newBalance = parseFloat(currentBalance + amount);
        var text1 = 'INSERT INTO transactions (createddate, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        var values1 = [tranx.createdOn, type, accountNumber, cashierID, amount, currentBalance, newBalance];
        var text2 = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
        var values2 = [accountNumber, newBalance];

        _connect["default"].query(text1, values1).then(function (result) {
          console.log(result.rows);
        })["catch"](function (err) {
          res.status(400).json({
            status: 400,
            error: err
          });
        });
<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
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
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa


            if (result.rows.length < 1) {
              res.status(400).json({
                status: 400,
                error: 'Account does not exist'
              });
              return;
            }

=======
            // if (result.rows.length < 1) {
            //   res.status(400).json({
            //     status: 400,
            //     error: 'Account does not exist',
            //   });
            //   return;
            // }


>>>>>>> immersive
            var foundAccount = result.rows.find(function (item) {
              return item.accountnumber === parseInt(tranx.accountNumber, 10);
            }); // console.log(foundAccount);

            if (!foundAccount && foundAccount === undefined) {
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
              res.status(401).json({
                status: 401,
=======
              res.status(400).json({
                status: 400,
>>>>>>> immersive
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

=======
>>>>>>> feature(refactoring):refactor the controllers

        _connect["default"].query(text2, values2).then(function (result) {
          console.log(result.rows);
          res.status(200).json({
            status: 200,
            data: {
              transactionId: tranx.id,
              accountNumber: tranx.accountNumber,
              amount: tranx.amount,
              cashier: cashierID,
              transactionType: tranx.type,
              accountBalance: tranx.newBalance
            }
          });
        })["catch"](function (err) {
          res.status(400).json({
            status: 400,
            error: err
          });
        });
      } else {
        // And this block for debit transaction
        var _newBalance = parseFloat(currentBalance - amount);

        var _text = 'INSERT INTO transactions (createddate, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        var _values = [tranx.createdOn, type, accountNumber, cashierID, amount, currentBalance, _newBalance];
        var _text2 = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
        var _values2 = [accountNumber, _newBalance];

        if (_newBalance < 0) {
          res.status(400).json({
            status: 400,
            error: 'Insufficient balance in account'
          });
        } else {
          _connect["default"].query(_text, _values).then(function (result) {
            console.log(result.rows);
          })["catch"](function (err) {
            res.status(400).json({
              status: 400,
              error: err
            });
          });

          _connect["default"].query(_text2, _values2).then(function (result) {
            console.log(result.rows);
            res.status(200).json({
              status: 200,
              data: {
                transactionId: tranx.id,
                accountNumber: tranx.accountNumber,
                amount: tranx.amount,
                cashier: cashierID,
                transactionType: tranx.type,
                accountBalance: tranx.newBalance
              }
            });
          })["catch"](function (err) {
            res.status(400).json({
              status: 400,
              error: err
            });
          });
        }
      } // End of debit transaction block

    }
  }, {
    key: "getTransaction",
    value: function getTransaction(req, res) {
      var transactionId = req.params.transactionId;
      var text = 'SELECT * FROM transactions WHERE id = $1';
      var values = [transactionId];

      _connect["default"].query(text, values).then(function (result) {
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
      })["catch"](function (err) {
        res.status(400).json({
          status: 400,
          error: err
        });
      });
    }
  }]);

  return TransactionController;
}();

var _default = TransactionController;
exports["default"] = _default;