"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _transactions = _interopRequireDefault(require("../controllers/transactions"));

var _validateTransaction = _interopRequireDefault(require("../helper/validateTransaction"));

var _checkAuth = _interopRequireDefault(require("../checkAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/:accountNumber/:type', _checkAuth["default"], _validateTransaction["default"].validateCreditAndDebit, _transactions["default"].creditAndDebit);
router.get('/:transactionId', _transactions["default"].getTransaction);
var _default = router;
exports["default"] = _default;