"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint-disable no-console */
var staffAuth = function staffAuth(req, res, next) {
  if (req.token.type !== 'cashier') {
    res.status(403).json({
      status: 403,
      error: 'Not authorised'
    });
    return;
  }

  next();
};

var _default = staffAuth;
exports["default"] = _default;