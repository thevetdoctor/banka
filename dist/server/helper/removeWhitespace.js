"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint-disable no-param-reassign */
var whiteSpace = /\s/g;
var noWhiteSpace = '';

var removeWhitespace = function removeWhitespace(item) {
  if (item.match(whiteSpace)) {
    item = item.replace(whiteSpace, noWhiteSpace);
  } // if (lastName.match(whiteSpace)) {
  //     lastName = lastName.replace(whiteSpace, noWhiteSpace);
  // }
  // if (email.match(whiteSpace)) {
  //     email = email.replace(whiteSpace, noWhiteSpace);
  // }
  // if (password.match(whiteSpace)) {
  //     password = password.replace(whiteSpace, noWhiteSpace);
  // }

};

var _default = removeWhitespace;
exports["default"] = _default;