"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connect = _interopRequireDefault(require("../db/connect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */
var checkBalance = function checkBalance(accountNumber) {
  var text = 'SELECT newbalance FROM accounts WHERE accountnumber = $1';
  var values = [accountNumber];
  return _connect["default"].query(text, values).then(function (result) {
    console.log(result.rows[0]);
    return result.rows;
  })["catch"](function (err) {
    return err;
  });
};

var _default = checkBalance;
exports["default"] = _default;