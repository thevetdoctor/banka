"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = _interopRequireDefault(require("pg"));

var _testConfig = _interopRequireDefault(require("../config/test-config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testDB = new _pg["default"].Pool(_testConfig["default"]);
var _default = testDB;
exports["default"] = _default;