"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _transactions = _interopRequireDefault(require("../controllers/transactions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/:accountNumber/:type', _transactions["default"].creDebit);
router.get('/:transactionId', _transactions["default"].getTransaction); // router.get('', TransactionController.getAccountHistory);

var _default = router;
exports["default"] = _default;