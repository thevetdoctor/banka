"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _accounts = _interopRequireDefault(require("../controllers/accounts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', _accounts["default"].create);
router.patch('/:accountNumber', _accounts["default"].activate);
router["delete"]('/:accountNumber', _accounts["default"]["delete"]);
router.get('/', _accounts["default"].listAllAccounts);
router.get('/:accountNumber', _accounts["default"].listOneAccount);
router.get('/:accountNumber/:transactions', _accounts["default"].getTransactions);
router.get('/user/:userEmailAddress/:accounts', _accounts["default"].getUserBankAccounts);
router.get('/:accounts?status=active', _accounts["default"].getActiveAccounts);
var _default = router;
exports["default"] = _default;