"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../controllers/users"));

var _validateUser = _interopRequireDefault(require("../helper/validateUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // User sign up


router.post('/signup', _validateUser["default"].validateSignup, _users["default"].signup); // User sign in

router.post('/signin', _validateUser["default"].validateSignin, _users["default"].signin);
var _default = router;
exports["default"] = _default;