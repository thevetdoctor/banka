"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../controllers/users"));

var _validateSignup = _interopRequireDefault(require("../helper/validateSignup"));

var _validateSignin = _interopRequireDefault(require("../helper/validateSignin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/signup', _validateSignup["default"], _users["default"].signup);
router.post('/signin', _validateSignin["default"], _users["default"].signin);
var _default = router;
exports["default"] = _default;