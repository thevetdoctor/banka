"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User(email, firstName, lastName, password, sex, mobile) {
  _classCallCheck(this, User);

  this.id = Number();
  this.email = email;
  this.firstName = firstName;
  this.lastName = lastName;
  this.password = password;
  this.type = 'client';
  this.isAdmin = false;
  this.sex = sex;
  this.mobile = mobile;
  this.active = false;
  this.createdDate = new Date().toDateString();
};

var _default = User;
exports["default"] = _default;