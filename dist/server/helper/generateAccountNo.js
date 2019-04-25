"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connect = _interopRequireDefault(require("../db/connect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable max-len */

/* eslint-disable no-console */
var generateAccountNumber = function generateAccountNumber() {
  var accountNo = _connect["default"].query('SELECT * FROM accounts ORDER BY accountnumber DESC').then(function (result) {
    console.log(result.rows[0]);
    var newAccountNumber = result.rows.length === 0 ? 2019031111 : parseInt(result.rows[0], 10) + 1; //   console.log(newAccountNumber);

    return newAccountNumber;
  })["catch"](function (err) {
    console.log(err);
  });

  return accountNo;
};

var _default = generateAccountNumber;
exports["default"] = _default;