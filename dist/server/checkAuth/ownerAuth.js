"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connect = _interopRequireDefault(require("../db/connect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */
var ownerAuth = function ownerAuth(req, res, next) {
  var text = 'SELECT * FROM accounts WHERE owner = $1 AND accountnumber = $2';
  var values = [req.token.id, req.params.accountNumber];
  console.log(req.token.id);

  _connect["default"].query(text, values).then(function (result) {
    console.log(result.rows);

    if (result.rows.length > 0 || req.token.type === 'staff' || req.token.type === 'admin') {
      next();
    } else {
      res.status(403).json({
        status: 403,
        error: 'Not authorised'
      });
    }
  })["catch"](function (err) {
    console.log(err);
  });
};

var _default = ownerAuth;
exports["default"] = _default;