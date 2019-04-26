"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var numberRegex = /[^0-9]/;

var validateTransaction =
/*#__PURE__*/
function () {
  function validateTransaction() {
    _classCallCheck(this, validateTransaction);
  }

  _createClass(validateTransaction, null, [{
    key: "validateCreditAndDebit",
    value: function validateCreditAndDebit(req, res, next) {
      var amount = req.body.amount;
      var accountNumber = req.params.accountNumber;
      var type = req.params.type; // Validate amount to credit

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
      }

      if (numberRegex.test(accountNumber)) {
        res.status(400).json({
          status: 400,
          error: 'Invalid Amount Number'
        });
        return;
      } // Run this block if type of transaction is neither credit nor debit


      if (type !== 'credit' && type !== 'debit') {
        res.status(400).json({
          status: 400,
          error: 'Invalid Transaction type'
        });
        next();
      }
    }
  }, {
    key: "getTransaction",
    value: function getTransaction(req, res, next) {
      var transactionId = req.params.transactionId;

      if (numberRegex.test(transactionId)) {
        res.status(400).json({
          status: 400,
          error: 'Invalid transaction ID'
        });
        return;
      }

      next();
    }
  }]);

  return validateTransaction;
}();

var _default = validateTransaction;
exports["default"] = _default;