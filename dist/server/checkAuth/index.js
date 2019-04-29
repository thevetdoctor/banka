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
  var bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(' ');
    var bearerToken = bearer[1];
    req.token = bearerToken;

    _jsonwebtoken["default"].verify(req.token, _codes["default"].val, function (err, decoded) {
      if (err) {
        res.status(403).json({
          status: 403,
          error: "".concat(err, ", Authentication failed")
        });
        return;
      }

      req.token = decoded.newUser;
      next();
    });
  } else {
    res.status(403).json({
      status: 403,
      error: 'Authentication failed'
    });
  }
};

var _default = auth;
exports["default"] = _default;