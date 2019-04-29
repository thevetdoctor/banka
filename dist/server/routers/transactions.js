"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _transactions = _interopRequireDefault(require("../controllers/transactions"));

var _validateTransaction = _interopRequireDefault(require("../helper/validateTransaction"));

var _checkAuth = _interopRequireDefault(require("../checkAuth"));

var _cashierAuth = _interopRequireDefault(require("../checkAuth/cashierAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Staff(cashier) can credit an account
// Staff(cashier) can debit an account


router.post('/:accountNumber/:type', _checkAuth["default"], _cashierAuth["default"], _validateTransaction["default"].validateCreditAndDebit, _transactions["default"].creditAndDebit); // User can view a specific account transaction

router.get('/:transactionId', _checkAuth["default"], _validateTransaction["default"].getTransaction, _transactions["default"].getTransaction);
var _default = router;
exports["default"] = _default;