"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var transactionRecord = [{
  id: 1,
  createdOn: new Date().toDateString(),
  type: 'credit',
  accountNumber: 2019030001,
  cashier: 2,
  amount: 2000.00,
  oldBalance: 15000.05,
  newBalance: 17000.05
}, {
  id: 2,
  createdOn: new Date().toDateString(),
  type: 'credit',
  accountNumber: 2019030001,
  cashier: 2,
  amount: 2000.00,
  oldBalance: 17000.05,
  newBalance: 19000.05
}, {
  id: 3,
  createdOn: new Date().toDateString(),
  type: 'credit',
  accountNumber: 2019030001,
  cashier: 1,
  amount: 2500.00,
  oldBalance: 19000.05,
  newBalance: 21500.05
}];
var _default = transactionRecord;
exports["default"] = _default;