"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _accounts = _interopRequireDefault(require("../models/accounts"));

var _userRecord = _interopRequireDefault(require("../db/userRecord"));

var _accountRecord = _interopRequireDefault(require("../db/accountRecord"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
      var _req$body = req.body,
          owner = _req$body.owner,
          type = _req$body.type;
      var account = new _accounts["default"](owner, type);
      console.log(account.owner);
      console.log(account.type);

      if (account.owner === undefined || account.owner === '') {
        res.status(400).json({
          status: 400,
          error: 'Account owner not supplied'
        });
        return;
      }

      if (account.type === undefined || account.type === '') {
        res.status(400).json({
          status: 400,
          error: 'Account type not supplied'
        });
        return;
      } // if (account.type !== 'current' || account.type !== 'savings') {
      //   res.status(400).json({
      //     status: 400,
      //     message: 'Account type must be savings or current',
      //   });
      //   return;
      // }


      var accountOwner = _userRecord["default"].find(function (item) {
        return item.id === parseInt(account.owner, 10);
      });

      if (!accountOwner || accountOwner === undefined) {
        res.status(400).json({
          status: 400,
          message: 'Account owner does not exist'
        });
      }

      account.id = _accountRecord["default"].length ? _accountRecord["default"].length + 1 : 1;

      var accountArray = _accountRecord["default"].map(function (item) {
        return parseInt(item.accountNumber, 10);
      });

      var newAccountNumber = Math.max.apply(Math, _toConsumableArray(accountArray));
      newAccountNumber += 1;
      account.accountNumber = newAccountNumber;

      _accountRecord["default"].push(account);

      res.status(200).json({
        status: 200,
        data: {
          accountNumber: newAccountNumber,
          firstName: accountOwner.firstName,
          lastName: accountOwner.lastName,
          email: accountOwner.email,
          type: account.type,
          openingBalance: account.balance
        }
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