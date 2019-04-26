"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _testConnect = _interopRequireDefault(require("../db/test-connect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */
var createTestTables = function createTestTables() {
  var text1 = 'CREATE TABLE accounts(id SERIAL PRIMARY KEY NOT NULL, accountNumber UNIQUE NOT NULL, createdOn DATE NOT NULL, owner INT NOT NULL, type TEXT NOT NULL, status TEXT NOT NULL, balance DECIMAL NOT NULL)';
  var text2 = 'CREATE TABLE users(id SERIAL PRIMARY KEY NOT NULL, email VARCHAR UNIQUE NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, password VARCHAR NOT NULL, hash VARCHAR NOT NULL, type TEXT NOT NULL, isAdmin BOOLEAN NOT NULL, sex TEXT NOT NULL, mobile TEXT NOT NULL, active BOOLEAN NOT NULL, createdDate DATE NOT NULL)';
  var text3 = 'CREATE TABLE transactions(id SERIAL PRIMARY KEY NOT NULL, accountnumber INT NOOT NULL, createdon DATE NOT NULL, owner INT NOT NULL, type TEXT NOT NULL, status TEXT NOT NULL, balance DECIMAL NOT NULL)';
  var text4 = 'DROP TABLE accounts';
  var text5 = 'DROP TABLE users';
  var text6 = 'DROP TABLE transactions';
  return _testConnect["default"].query(text1, text2, text3).then(function (result) {
    console.log(result.rows);
  })["catch"](function (err) {
    return err;
  });
};

var _default = createTestTables;
exports["default"] = _default;