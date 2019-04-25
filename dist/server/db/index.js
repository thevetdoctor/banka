"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import config from '../config';
_dotenv["default"].config();

var connectionString = null;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.database_params;
} else {
  connectionString = process.env.database_uri;
}

var pool = new _pg.Pool({
  connectionString: connectionString
});
var _default = pool;
exports["default"] = _default;