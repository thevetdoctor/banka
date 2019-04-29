"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = _interopRequireDefault(require("pg"));

var _config = _interopRequireDefault(require("../config"));

var _testConfig = _interopRequireDefault(require("../config/test-config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var configDetails;

if (process.env.NODE_ENV === 'test') {
  configDetails = _testConfig["default"];
} else {
  configDetails = _testConfig["default"];
}

var db = new _pg["default"].Pool(configDetails);
var _default = db;
exports["default"] = _default;