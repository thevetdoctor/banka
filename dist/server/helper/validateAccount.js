"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable no-console */
var validateEmail = function validateEmail(email) {
  var validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(email) && email.trim() !== '';
  return validEmail;
};

var regExp = /[^0-9]/g;
var specialCharacters = /[.*&%£$"!@"^><!¬+=-_`|?/;:')()]/;

var validateAccount =
/*#__PURE__*/
function () {
  function validateAccount() {
    _classCallCheck(this, validateAccount);
  }

  _createClass(validateAccount, null, [{
    key: "creation",
    value: function creation(req, res, next) {
      var type = req.body.type;

      if (type === undefined || type === '') {
        res.status(400).json({
          status: 400,
          error: 'Account type not supplied'
        });
        return;
      }

      next();
    }
  }, {
    key: "activation",
    value: function activation(req, res, next) {
      var accountStatus = req.body.status;
      var accountNumber = req.params.accountNumber; // accountNumber = parseInt(accountNumber, 10);

      accountNumber = accountNumber.replace(/[^\w\s\][^,]/gi, '');

      if (req.params === '') {
        res.status(400).json({
          status: 400,
          error: 'No parameter supplied'
        });
        return;
      }

      if (accountStatus === undefined || accountStatus.trim() === '') {
        res.status(400).json({
          status: 400,
          error: 'Status not supplied'
        });
        return;
      }

      if (typeof accountStatus !== 'string') {
        res.status(400).json({
          status: 400,
          error: 'Invalid status supplied'
        });
        return;
      }

      if (regExp.test(accountNumber)) {
        res.status(400).json({
          status: 400,
          error: 'Invalid account number supplied'
        });
        return;
      }

      if (specialCharacters.test(accountNumber)) {
        res.status(400).json({
          status: 400,
          error: 'Special characters not allowed'
        });
        return;
      }

      next();
    }
  }, {
    key: "deletion",
    value: function deletion(req, res, next) {
      var accountNumber = req.params.accountNumber;

      if (regExp.test(accountNumber)) {
        res.status(400).json({
          status: 400,
          error: 'Invalid account number supplied'
        });
      }

      if (specialCharacters.test(accountNumber)) {
        res.status(400).json({
          status: 400,
          error: 'Special characters not allowed'
        });
        return;
      }

      next();
    }
  }, {
    key: "getTransactions",
    value: function getTransactions(req, res, next) {
      var transactions = req.params.transactions;
      var accountNumber = req.params.accountNumber; // console.log(req.params);

      if (transactions !== 'transactions') {
        res.status(400).json({
          status: 400,
          error: 'Params can only be transactions'
        });
        return;
      }

      if (regExp.test(accountNumber)) {
        res.status(400).json({
          status: 400,
          error: 'Invalid account number supplied'
        });
      }

      if (specialCharacters.test(accountNumber)) {
        res.status(400).json({
          status: 400,
          error: 'Invalid account supplied'
        });
        return;
      }

      next();
    }
  }, {
    key: "listing",
    value: function listing(req, res, next) {
      var accountNumber = req.params.accountNumber;
      var status = req.query.status; // if no 'status' indicated as a req.query, proceed with get single account

      if (status === undefined) {
        if (regExp.test(accountNumber)) {
          res.status(400).json({
            status: 400,
            error: 'Invalid account number'
          });
          return;
        }

        if (specialCharacters.test(accountNumber)) {
          res.status(400).json({
            status: 400,
            error: 'Invalid account supplied'
          });
          return;
        }
      }

      next();
    }
  }, {
    key: "getUserBankAccounts",
    value: function getUserBankAccounts(req, res, next) {
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

      if (!validateEmail(userEmailAddress)) {
        res.status(400).json({
          status: 400,
          error: 'Invalid Email'
        });
        return;
      }

      next();
    }
  }]);

  return validateAccount;
}();

var _default = validateAccount;
exports["default"] = _default;