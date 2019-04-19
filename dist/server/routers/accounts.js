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
router.get('/', _accounts["default"].list);
router.get('/:accountNumber', _accounts["default"].listOne);
var _default = router;
exports["default"] = _default;