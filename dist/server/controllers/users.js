"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = _interopRequireDefault(require("pg"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _config = _interopRequireDefault(require("../config"));

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = new _pg["default"].Pool(_config["default"]);

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
      var user = new _users["default"](email, firstName, lastName, password, sex, mobile);
      console.log(user);

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

      if (user.email === undefined || user.email.trim() === '') {
        res.status(400).json({
          status: 400,
          error: 'Email not supplied'
        });
        return;
      }

      if (user.password === undefined || user.password.trim() === '') {
        res.status(400).json({
          status: 400,
          error: 'Password not supplied'
        });
        return;
      }

      if (user.sex === undefined || user.sex.trim() === '') {
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


      if (user.mobile === undefined || user.mobile.trim() === '') {
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
        pool.connect(function (err, client, done) {
          if (err) {
            console.log(err);
          }

          client.query('SELECT email FROM users', function (err, result) {
            if (err) {
              console.log(err);
            }

            console.log(result.rows);
            var newArr = result.rows.map(function (val) {
              return val.email.trim();
            });
            console.log(newArr);

            if (newArr.includes(user.email)) {
              res.status(400).json({
                status: 400,
                error: 'Email already used'
              });
            } else {
              // Assign user ID
              user.id = newArr.length !== 0 ? newArr.length + 1 : 1; // save user in User Record

              var token = _jsonwebtoken["default"].sign({
                user: user
              }, 'secretKey', {
                expiresIn: '1min'
              });

              console.log('New email being registered'); // encrypt the valid password with BCRYPT

              _bcrypt["default"].hash(user.password, 10).then(function (hash) {
                // connect to the db and save credentials
                pool.connect(function (err, client, done) {
                  if (err) {
                    return console.error('error fetching ....', err);
                  }

                  client.query('INSERT INTO users (id, email, firstName, lastName, password, hash, type, isAdmin, sex, mobile, active, createdDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [user.id, user.email, user.firstName, user.lastName, user.password, hash, user.type, user.isAdmin, user.sex, user.mobile, user.active, user.createdDate], function (err, result) {
                    if (err) {
                      return console.error('error running query');
                    }

                    console.log(result.rows);
                    console.log('New User created');
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
                  });
                  done();
                });
              });
            }

            done();
          });
        }); // }
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
      var position = 0;

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


      pool.connect(function (err, client, done) {
        if (err) {
          console.log(err);
        }

        client.query('SELECT id, email, firstName, lastName, password, hash FROM users', function (err, result) {
          if (err) {
            console.log(err);
          }

          console.log(result.rows);
          var contain = result.rows.map(function (val) {
            return val.email;
          }).map(function (val) {
            return val.trim();
          });

          if (contain.includes(user.email)) {
            position = contain.indexOf(user.email);
          }

          console.log(position);
          console.log(result.rows[position].email);
          var newUser = result.rows[position];
          console.log(newUser);

          if (user.email === newUser.email.trim()) {
            if (user.password === newUser.password.trim()) {
              // bcrypt.compare(user.password, newUser.hash)
              // .then((result) => {
              // if (result) {
              delete newUser.password;

              var token = _jsonwebtoken["default"].sign({
                newUser: newUser
              }, 'secretKey', {
                expiresIn: '5min'
              });

              res.status(200).json({
                status: 200,
                data: {
                  token: token,
                  id: newUser.id,
                  firstName: newUser.firstname,
                  lastName: newUser.lastname,
                  email: newUser.email
                }
              }); // }
              // });
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

          done();
        });
      });
    }
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;