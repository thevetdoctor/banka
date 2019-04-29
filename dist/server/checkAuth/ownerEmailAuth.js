"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connect = _interopRequireDefault(require("../db/connect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */
var ownerEmailAuth = function ownerEmailAuth(req, res, next) {
  var text = 'SELECT * FROM accounts INNER JOIN users ON accounts.owner = users.id WHERE email = $1';
  var values = [req.token.email];
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

var _default = ownerEmailAuth;
exports["default"] = _default;