"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _users = _interopRequireDefault(require("../models/users"));

var _userRecord = _interopRequireDefault(require("../db/userRecord"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var validUser = function validUser(user) {
  var validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(user.email) && user.email.trim() !== '';
  var validPassword = typeof user.password === 'string' && user.password.trim() !== '' && user.password.trim().length >= 6;
  return validEmail && validPassword;
};

var validateEmail = function validateEmail(email) {
  var validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(email) && email.trim() !== '';
  return validEmail;
};

var mobileRegex = /[^0-9]/;

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "signup",
    value: function signup(req, res) {
      // eslint-disable-next-line object-curly-newline
      var _req$body = req.body,
          email = _req$body.email,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          password = _req$body.password,
          sex = _req$body.sex,
          mobile = _req$body.mobile;
      var user = new _users["default"](email, firstName, lastName, password, sex, mobile); // console.log(user.email);
      // const checkUser = Object.keys(user);
      // for (const item in user) {
      // console.log(item);
      // }

      if (user.firstName === undefined || user.firstName.trim() === '') {
        res.status(400).json({
          status: 400,
          error: 'Firstname not supplied'
        });
        return;
      }

      if (user.lastName === undefined || user.lastName.trim() === '') {
        res.status(400).json({
          status: 400,
          error: 'Lastname not supplied'
        });
        return;
      }

      if (user.email === undefined || user.email === '') {
        res.status(400).json({
          status: 400,
          error: 'Email not supplied'
        });
        return;
      }

      if (user.password === undefined || user.password === '') {
        res.status(400).json({
          status: 400,
          error: 'Password not supplied'
        });
        return;
      }

      if (user.sex === undefined || user.sex === '') {
        res.status(400).json({
          status: 400,
          error: 'Sex not supplied'
        });
        return;
      } // if (user.sex !== 'M' || user.sex !== 'F') {
      //   res.status(400).json({
      //     status: 400,
      //     error: 'Invalid Sex supplied',
      //   });
      //   return;
      // }


      if (user.mobile === undefined || user.mobile === '') {
        res.status(400).json({
          status: 400,
          error: 'Mobile not supplied'
        });
        return;
      }

      if (mobileRegex.test(user.mobile)) {
        res.status(400).json({
          status: 400,
          error: 'Invalid Mobile Number supplied'
        });
        return;
      } // Validate Email


      if (!validateEmail(user.email)) {
        console.log(user.email);
        res.status(400).json({
          status: 400,
          error: 'Invalid Email'
        });
        return;
      } // check validity of user name & password


      if (validUser(user)) {
        var userEmails = _userRecord["default"].map(function (value) {
          return value.email;
        }); //   Validate if email is already registered


        if (userEmails.includes(user.email)) {
          res.status(400).json({
            status: 400,
            error: 'Email already used'
          });
        } else {
          // Assign user ID
          user.id = _userRecord["default"].length ? _userRecord["default"].length + 1 : 1; // save user in User Record

          var token = _jsonwebtoken["default"].sign({
            user: user
          }, 'secretKey', {
            expiresIn: '1min'
          });

          _userRecord["default"].push(user);

          res.status(201).json({
            status: 201,
            data: {
              token: token,
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            }
          });
        }
      } else {
        // send an error
        res.status(400).json({
          status: 400,
          error: 'Password must be minimum of 6 characters'
        });
      }
    }
  }, {
    key: "signin",
    value: function signin(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;
      var user = {
        email: email,
        password: password
      };

      if (user.email === undefined || user.email === '') {
        res.status(400).json({
          status: 400,
          error: 'Email not supplied'
        });
        return;
      }

      if (user.password === undefined || user.password === '') {
        res.status(400).json({
          status: 400,
          error: 'Password not supplied'
        });
        return;
      } // Query User Record for credentials


      var newUser = _userRecord["default"].find(function (item) {
        return item.email === user.email;
      }); // console.log(newUser);


      if (newUser) {
        if (newUser.password === user.password) {
          // delete newUser.password;
          var token = _jsonwebtoken["default"].sign({
            newUser: newUser
          }, 'secretKey', {
            expiresIn: '1min'
          });

          res.status(200).json({
            status: 200,
            data: {
              token: token,
              id: newUser.id,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email
            },
            newUser: newUser
          });
        } else {
          res.status(400).json({
            status: 400,
            error: 'Invalid password'
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          error: 'Invalid email'
        });
      }
    }
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;