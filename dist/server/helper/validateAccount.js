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

var regExp = /[^0-9]/;

var validateAccount =
/*#__PURE__*/
function () {
  function validateAccount() {
    _classCallCheck(this, validateAccount);
  }

  _createClass(validateAccount, null, [{
    key: "creation",
    value: function creation(req, res, next) {
      var owner = req.body.owner;
      var type = req.body.type;
      type = type.trim();

      if (regExp.test(owner)) {
        res.status(400).json({
          status: 400,
          error: 'Invalid account owner supplied'
        });
        return;
      }

      if (owner === undefined || owner === '') {
        res.status(400).json({
          status: 400,
          error: 'Account owner not supplied'
        });
        return;
      }

      if (type === undefined || type === '') {
        res.status(400).json({
          status: 400,
          error: 'Account type not supplied'
        });
        return;
      } // if (type !== 'current' || type !== 'savings') {
      //   console.log(type.trim());
      //   res.status(400).json({
      //     status: 400,
      //     error: 'Account type must be CURRENT or SAVINGS',
      //   });
      //   return;
      // }


      next();
    }
  }, {
    key: "activation",
    value: function activation(req, res, next) {
      var accountStatus = req.body.status; // console.log(accountStatus);

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

      next();
    }
  }, {
    key: "listing",
    value: function listing(req, res, next) {
      var accountNumber = req.params.accountNumber; // if no 'status' indicated as a req.query, proceed with get single account

      if (regExp.test(accountNumber)) {
        res.status(400).json({
          status: 400,
          error: 'Invalid account number'
        });
        return;
      }

      next();
    }
  }, {
    key: "getTransactions",
    value: function getTransactions(req, res, next) {
      var transactions = req.params.transactions;
      console.log(req.params);

      if (transactions !== 'transactions') {
        res.status(400).json({
          status: 400,
          error: 'Params can only be transactions'
        });
        return;
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

      if (!validateEmail.test(userEmailAddress)) {
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