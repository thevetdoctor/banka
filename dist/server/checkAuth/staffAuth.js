"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var staffAuth = function staffAuth(req, res, next) {
  var decoded = (0, _jwtDecode["default"])(req.token);
  console.log(decoded);
  next();
};

var _default = staffAuth;
exports["default"] = _default;