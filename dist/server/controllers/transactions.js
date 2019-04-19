"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _transactions = _interopRequireDefault(require("../models/transactions"));

var _accountRecord = _interopRequireDefault(require("../db/accountRecord"));

var _transactionRecord = _interopRequireDefault(require("../db/transactionRecord"));

var _cashierRecord = _interopRequireDefault(require("../db/cashierRecord"));

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
        var foundAccount = _accountRecord["default"].find(function (item) {
          return item.accountNumber === parseInt(tranx.accountNumber, 10);
        }); // console.log(foundAccount);
        // console.log(tranx.type);


        if (!foundAccount && foundAccount === undefined) {
          res.status(401).json({
            status: 401,
            error: 'Account not available'
          });
        } else {
          // Assign a transaction ID
          tranx.id = _transactionRecord["default"].length ? _transactionRecord["default"].length + 1 : 1; // Then, acquire a unique cashier identity

          tranx.cashier = Math.ceil(Math.random() * 3);

          var foundCashier = _cashierRecord["default"].find(function (item) {
            return item.id === tranx.cashier;
          }); // Run this block for credit transaction


          if (tranx.type === 'credit') {
            tranx.oldBalance = Number(foundAccount.balance);
            tranx.newBalance = tranx.oldBalance + Number(tranx.amount);
            tranx.newBalance = tranx.newBalance.toFixed(2);
            foundAccount.balance = tranx.newBalance;

            _transactionRecord["default"].push(tranx);

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
          } else {
            // And this block for debit transaction
            tranx.oldBalance = Number(foundAccount.balance);

            if (tranx.oldBalance < Number(tranx.amount)) {
              res.status(400).json({
                status: 400,
                error: 'Insufficient balance in account'
              });
            } else {
              tranx.newBalance = tranx.oldBalance - Number(tranx.amount);
              tranx.newBalance = tranx.newBalance.toFixed(2);
              foundAccount.balance = tranx.newBalance;

              _transactionRecord["default"].push(tranx);

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
            }
          } // End of debit transaction block

        }
      }
    }
  }]);

  return TransactionController;
}();

var _default = TransactionController;
exports["default"] = _default;