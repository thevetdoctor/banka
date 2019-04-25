"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var accountRecord = [{
  id: 1,
  accountNumber: 2019031111,
  createdOn: new Date().toDateString(),
  owner: 1,
  type: 'savings',
  status: 'active',
  balance: '12000.25'
}, {
  id: 2,
  accountNumber: 2019031112,
  createdOn: new Date().toDateString(),
  owner: 1,
  type: 'current',
  status: 'active',
  balance: '4000.05'
}, {
  id: 3,
  accountNumber: 2019031113,
  createdOn: new Date().toDateString(),
  owner: 1,
  type: 'current',
  status: 'active',
  balance: '40100.05'
}];
var _default = accountRecord;
exports["default"] = _default;