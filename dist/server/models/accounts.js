"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Account = function Account(owner, type) {
  var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'draft';

  _classCallCheck(this, Account);

  this.id = Number();
  this.accountNumber = Number();
  this.createdOn = new Date().toDateString();
  this.owner = owner;
  this.type = type;
  this.status = status;
  this.balance = Number().toFixed(2);
};

var _default = Account;
exports["default"] = _default;