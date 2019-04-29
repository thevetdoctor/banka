"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _faker = _interopRequireDefault(require("faker"));

var _testConnect = _interopRequireDefault(require("../db/test-connect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-unused-vars */

/* eslint-disable max-len */

/* eslint-disable no-console */
// import testDB from '../db/connect';
var accountNumberArrays = [_faker["default"].finance.account(), _faker["default"].finance.account(), _faker["default"].finance.account()];
var tables = {
  createTables: function createTables() {
    var text2 = "CREATE TABLE IF NOT EXISTS accounts (\n                id SERIAL PRIMARY KEY NOT NULL,\n                accountnumber INT UNIQUE NOT NULL,\n                createdon DATE NOT NULL,\n                owner INT NOT NULL,\n                type TEXT NOT NULL,\n                status TEXT NOT NULL,\n                balance DECIMAL NOT NULL);\n                CREATE TABLE IF NOT EXISTS users (\n                id SERIAL PRIMARY KEY NOT NULL,\n                email VARCHAR UNIQUE NOT NULL,\n                firstname TEXT NOT NULL,\n                lastname TEXT NOT NULL,\n                password VARCHAR NOT NULL,\n                hash VARCHAR NOT NULL,\n                type TEXT NOT NULL,\n                isAdmin BOOLEAN NOT NULL,\n                sex TEXT NOT NULL,\n                mobile TEXT NOT NULL,\n                active BOOLEAN NOT NULL,\n                createdDate DATE NOT NULL);\n                CREATE TABLE IF NOT EXISTS transactions (\n                id SERIAL PRIMARY KEY NOT NULL,\n                createdon DATE NOT NULL,\n                type TEXT NOT NULL,\n                accountnumber INT NOT NULL,\n                cashier INT NOT NULL,\n                amount DECIMAL NOT NULL,\n                oldbalance DECIMAL NOT NULL,\n                newbalance DECIMAL NOT NULL)";

    _testConnect["default"].query(text2).then(function (result) {
      console.log(result.rows);
    })["catch"](function (err) {
      console.log(err);
    });
  },
  dropTables: function dropTables() {
    var text1 = "DROP TABLE IF EXISTS accounts;\n                 DROP TABLE users;\n                 DROP TABLE transactions";

    _testConnect["default"].query(text1).then(function (result) {
      console.log(result.rows);
    })["catch"](function (err) {
      console.log(err);
    });
  },
  seedTables: function seedTables() {
    // seed users TABLE
    var text1 = "INSERT INTO users (\n                  email, firstName, lastName, password, hash, type, isAdmin, sex, mobile, active, createdDate)\n                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING  email, firstName, lastName, password, hash, type, isAdmin, sex, mobile, active, createdDate";
    var text2 = "INSERT INTO users (\n                  email, firstName, lastName, password, hash, type, isAdmin, sex, mobile, active, createdDate)\n                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
    var text3 = "INSERT INTO users (\n                  email, firstName, lastName, password, hash, type, isAdmin, sex, mobile, active, createdDate)\n                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
    var values1 = ['b@banka.com', 'firstName2', 'lastName2', 'password2', _bcrypt["default"].hashSync('password2', 10), 'client', true, 'M', '08022222222', false, '2019-04-11'];
    var values2 = ['admin@banka.com', 'firstName1', 'lastName1', 'password1', _bcrypt["default"].hashSync('password1', 10), 'admin', true, 'M', '08011111111', false, '2019-04-22'];
    var values3 = ['c@banka.com', 'firstName3', 'lastName3', 'password3', _bcrypt["default"].hashSync('password3', 10), 'cashier', true, 'M', '08033333333', false, '2019-04-22']; // seed accounts TABLE

    var text4 = 'INSERT INTO accounts (accountnumber, createdOn, owner, type, status, balance) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    var values4 = [accountNumberArrays[0], '2019-04-11', 1, 'savings', 'draft', 5300.00];
    var text5 = 'INSERT INTO accounts (accountnumber, createdOn, owner, type, status, balance) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    var values5 = [accountNumberArrays[1], '2019-04-11', 1, 'current', 'active', 100000.00];
    var text6 = 'INSERT INTO accounts (accountnumber, createdOn, owner, type, status, balance) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    var values6 = [accountNumberArrays[2], '2019-04-11', 1, 'savings', 'dormant', 25000.00]; // seed transactions TABLE

    var text7 = 'INSERT INTO transactions (createdOn, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    var values7 = ['2019-04-11', 'credit', accountNumberArrays[0], 10, 20000.00, 0.00, 20000.00];
    var text8 = 'INSERT INTO transactions (createdOn, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES($1, $2, $3, $4, $5, $6,$7) RETURNING *';
    var values8 = ['2019-04-11', 'debit', accountNumberArrays[1], 10, 2000.00, 20000.00, 18000.00];
    var text9 = 'INSERT INTO transactions (createdOn, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    var values9 = ['2019-04-11', 'credit', accountNumberArrays[2], 10, 19000.00, 18000.00, 37000.00];

    _testConnect["default"].query(text1, values1).then(function (result) {// console.log(result.rows);
    })["catch"](function (err) {
      console.log(err);
    });

    _testConnect["default"].query(text2, values2).then(function (result) {// console.log(result.rows);
    })["catch"](function (err) {
      console.log(err);
    });

    _testConnect["default"].query(text3, values3).then(function (result) {// console.log(result.rows);
    })["catch"](function (err) {
      console.log(err);
    });

    _testConnect["default"].query(text4, values4).then(function (result) {// console.log(result.rows);
    })["catch"](function (err) {
      console.log(err);
    });

    _testConnect["default"].query(text5, values5).then(function (result) {// console.log(result.rows);
    })["catch"](function (err) {
      console.log(err);
    });

    _testConnect["default"].query(text6, values6).then(function (result) {// console.log(result.rows);
    })["catch"](function (err) {
      console.log(err);
    });

    _testConnect["default"].query(text7, values7).then(function (result) {// console.log(result.rows);
    })["catch"](function (err) {
      console.log(err);
    });

    _testConnect["default"].query(text8, values8).then(function (result) {// console.log(result.rows);
    })["catch"](function (err) {
      console.log(err);
    });

    _testConnect["default"].query(text9, values9).then(function (result) {// console.log(result.rows);
    })["catch"](function (err) {
      console.log(err);
    });
  }
};
var _default = tables;
exports["default"] = _default;