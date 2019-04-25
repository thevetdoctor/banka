"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _codes = _interopRequireDefault(require("./codes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */
var auth = function auth(req, res, next) {
  console.log(req.headers.authorization);
  var bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(' ');
    var bearerToken = bearer[1];
    req.token = bearerToken;

    var decoded = _jsonwebtoken["default"].verify(req.token, _codes["default"].val);

    if (decoded) {
      next(req.token);
    }
  } else {
    res.status(401).json({
      status: 401,
      error: 'Authentication failed'
    });
  }
};

var _default = auth;
exports["default"] = _default;