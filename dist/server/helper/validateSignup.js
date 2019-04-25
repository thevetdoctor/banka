"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var validateEmail = function validateEmail(email) {
  var validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(email) && email.trim() !== '';
  return validEmail;
};

var validatePassword = function validatePassword(password) {
  var validPassword = typeof password === 'string' && password.trim() !== '' && password.trim().length >= 6;
  return validPassword;
};

var mobileRegex = /[^0-9]/;

var validateSignup = function validateSignup(req, res, next) {
  var _req$body = req.body,
      firstName = _req$body.firstName,
      lastName = _req$body.lastName,
      sex = _req$body.sex,
      mobile = _req$body.mobile;
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;
  firstName = firstName.trim();
  lastName = lastName.trim();
  sex = sex.trim();
  mobile = mobile.trim();

  if (email === undefined) {
    res.status(400).json({
      status: 400,
      error: 'Email not supplied'
    });
    return;
  }

  if (firstName === undefined || firstName.trim() === '') {
    res.status(400).json({
      status: 400,
      error: 'Firstname not supplied'
    });
    return;
  }

  if (lastName === undefined || lastName.trim() === '') {
    res.status(400).json({
      status: 400,
      error: 'Lastname not supplied'
    });
    return;
  }

  if (password === undefined) {
    res.status(400).json({
      status: 400,
      error: 'Password not supplied'
    });
    return;
  }

  if (sex === undefined || sex.trim() === '') {
    res.status(400).json({
      status: 400,
      error: 'Sex not supplied'
    });
    return;
  }

  if (mobile === undefined || mobile.trim() === '') {
    res.status(400).json({
      status: 400,
      error: 'Mobile not supplied'
    });
    return;
  }

  if (mobileRegex.test(mobile)) {
    res.status(400).json({
      status: 400,
      error: 'Invalid Mobile Number supplied'
    });
    return;
  }

  if (!validateEmail(email)) {
    res.status(400).json({
      status: 400,
      error: 'Invalid Email'
    });
  }

  if (!validatePassword(password)) {
    res.status(400).json({
      status: 400,
      error: 'Password must be minimum of 6 characters'
    });
  }

  next();
};

var _default = validateSignup; // if (user.sex !== 'M' || user.sex !== 'F') {
//   res.status(400).json({
//     status: 400,
//     error: 'Invalid Sex supplied',
//   });
//   return;
// }

exports["default"] = _default;