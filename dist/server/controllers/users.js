"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _users = _interopRequireDefault(require("../models/users"));

var _connect = _interopRequireDefault(require("../db/connect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "signup",
    value: function signup(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          password = _req$body.password,
          sex = _req$body.sex,
          mobile = _req$body.mobile;
      var user = new _users["default"](email, firstName, lastName, password, sex, mobile);

      var token = _jsonwebtoken["default"].sign({
        user: user
      }, 'secretKey', {
        expiresIn: '1min'
      });

      var hashed = _bcrypt["default"].hashSync(password, 10);

      var text = 'INSERT INTO users (email, firstName, lastName, password, hash, type, isAdmin, sex, mobile, active, createdDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
      var values = [email, firstName, lastName, password, hashed, user.type, user.isAdmin, sex, mobile, user.active, user.createdDate];

      _connect["default"].query(text, values).then(function (result) {
        console.log(result.rows[0]);
        console.log('New User created');

        if (!result.rows[0]) {
          res.status(400).json({
            status: 400,
            error: 'Email already used'
          });
        }

        var _result$rows$ = result.rows[0],
            id = _result$rows$.id,
            firstname = _result$rows$.firstname,
            lastname = _result$rows$.lastname,
            email = _result$rows$.email;
        return res.status(201).json({
          status: 201,
          data: {
            token: token,
            id: id,
            firstname: firstname,
            lastname: lastname,
            email: email
          }
        });
      })["catch"](function (err) {
        console.log(err);

        if (err.routine === '_bt_check_unique') {
          var error = 'Email already used';
          res.status(400).json({
            status: 400,
            error: error
          });
        }
      });
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
      }; // let position = 0;

      var text = 'SELECT email, firstname, lastname, password, hash FROM users WHERE email = $1';
      var values = [email]; // Query User Record for credentials

      _connect["default"].query(text, values).then(function (result) {
        console.log(result.rows[0]);

        if (!result.rows[0]) {
          res.status(400).json({
            status: 400,
            error: 'Invalid Email'
          });
        }

        var newUser = result.rows[0];
        console.log(newUser);

        var compared = _bcrypt["default"].compareSync(user.password, newUser.hash);

        if (!compared) {
          res.status(400).json({
            status: 400,
            error: 'Invalid password'
          });
        }

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
        });
      })["catch"](function (err) {
        res.status(400).json({
          error: err
        });
      });
    }
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;