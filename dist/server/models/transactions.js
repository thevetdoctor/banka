"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transaction = function Transaction(type, accountNumber, amount) {
  _classCallCheck(this, Transaction);

  this.id = Number();
  this.createdOn = new Date().toDateString();
  this.type = type;
  this.accountNumber = accountNumber;
  this.cashier = Number();
  this.amount = Number(amount).toFixed(2);
  this.oldBalance = Number().toFixed(2);
  this.newBalance = Number().toFixed(2);
};

var _default = Transaction;
exports["default"] = _default;