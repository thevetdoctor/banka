"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _accounts = _interopRequireDefault(require("../controllers/accounts"));

var _validateAccount = _interopRequireDefault(require("../helper/validateAccount"));

var _checkAuth = _interopRequireDefault(require("../checkAuth"));

var _staffAuth = _interopRequireDefault(require("../checkAuth/staffAuth"));

var _ownerAuth = _interopRequireDefault(require("../checkAuth/ownerAuth"));

var _ownerEmailAuth = _interopRequireDefault(require("../checkAuth/ownerEmailAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Create bank account


router.post('/', _checkAuth["default"], _validateAccount["default"].creation, _accounts["default"].create); // Admin / Staff can activate or deactivate an account

router.patch('/:accountNumber', _checkAuth["default"], _staffAuth["default"], _validateAccount["default"].activation, _accounts["default"].activate); // Admin / Staff can delete an account

router["delete"]('/:accountNumber', _checkAuth["default"], _staffAuth["default"], _validateAccount["default"].deletion, _accounts["default"]["delete"]); // User can view account transaction history

router.get('/:accountNumber/:transactions', _checkAuth["default"], _validateAccount["default"].getTransactions, _ownerAuth["default"], _accounts["default"].getTransactions); // User can view account details
// Staff/Admin can view all active bank accounts
// Staff/Admin can view all dormant bank accounts

router.get('/:accountNumber', _checkAuth["default"], _validateAccount["default"].listing, _ownerAuth["default"], _accounts["default"].listAccount); // Admin / staff can view a list of accounts owned by a specific user

router.get('/user/:userEmailAddress/:accounts', _checkAuth["default"], _validateAccount["default"].getUserBankAccounts, _ownerEmailAuth["default"], _accounts["default"].getUserBankAccounts); // Staff / Admin can view all bank accounts

router.get('/', _checkAuth["default"], _staffAuth["default"], _accounts["default"].listAllAccounts);
var _default = router;
exports["default"] = _default;