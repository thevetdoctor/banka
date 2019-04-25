"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _accounts = _interopRequireDefault(require("../controllers/accounts"));

var _validateAccount = _interopRequireDefault(require("../helper/validateAccount"));

var _checkAuth = _interopRequireDefault(require("../checkAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import staffAuth from '../checkAuth/staffAuth';
var router = _express["default"].Router();

router.post('/', _checkAuth["default"], _validateAccount["default"].creation, _accounts["default"].create);
router.patch('/:accountNumber', _checkAuth["default"], _validateAccount["default"].activation, _accounts["default"].activate);
router["delete"]('/:accountNumber', _checkAuth["default"], _validateAccount["default"].deletion, _accounts["default"]["delete"]);
router.get('/', _checkAuth["default"], _accounts["default"].listAllAccounts);
router.get('/:accountNumber', _checkAuth["default"], _validateAccount["default"].listing, _accounts["default"].listAccount);
router.get('/:accountNumber/:transactions', _checkAuth["default"], _validateAccount["default"].getTransactions, _accounts["default"].getTransactions);
router.get('/user/:userEmailAddress/:accounts', _checkAuth["default"], _validateAccount["default"].getUserBankAccounts, _accounts["default"].getUserBankAccounts);
var _default = router;
exports["default"] = _default;