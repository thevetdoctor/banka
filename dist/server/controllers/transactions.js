"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connect = _interopRequireDefault(require("../db/connect"));

var _transactions = _interopRequireDefault(require("../models/transactions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
      console.log(req.token.id);
      console.log(accountNumber);
      accountNumber = parseInt(accountNumber, 10);
      console.log(accountNumber);
      var currentBalance;
      var text = 'SELECT balance FROM accounts WHERE accountnumber = $1';
      var values = [accountNumber];

      _connect["default"].query(text, values).then(function (result) {
        // console.log(result.rows[0], result.rows, 'mm');
        if (result.rows.length < 1) {
          res.status(400).json({
            status: 400,
            error: 'Account does not exist'
          });
          return;
        }

        var balance = result.rows[0].balance;
        currentBalance = balance;
        console.log(currentBalance, 'in'); //   })
        //   .catch(err => err);
        // console.log(currentBalance, 'out');

        console.log('getting in');
        var tranx = new _transactions["default"](type, accountNumber, amount);
        var cashierID = req.token.id; // Run this block for 'valid' transaction type
        // And this block for credit transaction

        if (tranx.type === 'credit') {
          var newBalance = parseFloat(currentBalance + amount, 10).toFixed(2);
          console.log(currentBalance);
          console.log(amount);
          console.log(newBalance);
          var text1 = 'INSERT INTO transactions (createdon, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES ($1, $2, $3, $4, $5, $6, $7)';
          var values1 = [tranx.createdOn, type, accountNumber, cashierID, amount, currentBalance, newBalance];
          var text2 = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
          var values2 = [accountNumber, newBalance];
          console.log('getting in');
          console.log(values1);

          _connect["default"].query(text1, values1).then(function (result) {
            console.log(result.rows);
          })["catch"](function (err) {
            res.status(400).json({
              status: 400,
              error: err
            });
          });

          _connect["default"].query(text2, values2).then(function () {
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
          console.log('getting in');

          var _newBalance = parseFloat(currentBalance - amount, 10).toFixed(2);

          console.log(currentBalance);
          console.log(amount);
          console.log(_newBalance);
          var _text = 'INSERT INTO transactions (createdon, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES ($1, $2, $3, $4, $5, $6, $7)';
          var _values = [tranx.createdOn, type, accountNumber, cashierID, amount, currentBalance, _newBalance];
          var _text2 = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
          var _values2 = [accountNumber, _newBalance];
          console.log('getting out');

          if (_newBalance < 0) {
            res.status(400).json({
              status: 400,
              error: 'Insufficient balance in account'
            });
          } else {
            _connect["default"].query(_text, _values).then(function (result) {// console.log(result.rows);
            })["catch"](function (err) {
              res.status(400).json({
                status: 400,
                error: err
              });
            });

            _connect["default"].query(_text2, _values2).then(function (result) {
              // console.log(result.rows);
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

      })["catch"](function (err) {
        return err;
      });

      console.log(currentBalance, 'out');
    }
  }, {
    key: "getTransaction",
    value: function getTransaction(req, res) {
      var transactionId = req.params.transactionId;
      var text = 'SELECT * FROM transactions WHERE id = $1';
      var values = [transactionId];

      _connect["default"].query(text, values).then(function (result) {
        // console.log(result.rows);
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