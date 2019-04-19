"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User(email, firstName, lastName, password, sex, mobile) {
  var type = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'client';
  var isAdmin = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  var active = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 'active';

  _classCallCheck(this, User);

  this.id = Number();
  this.email = email;
  this.firstName = firstName;
  this.lastName = lastName;
  this.password = password;
  this.type = type;
  this.isAdmin = isAdmin;
  this.sex = sex;
  this.mobile = mobile;
  this.active = active;
};

var _default = User;
exports["default"] = _default;