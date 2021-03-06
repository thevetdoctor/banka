"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _users = _interopRequireDefault(require("./server/routers/users"));

var _accounts = _interopRequireDefault(require("./server/routers/accounts"));

var _transactions = _interopRequireDefault(require("./server/routers/transactions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */
_dotenv["default"].config();

var app = (0, _express["default"])();
var port = process.env.PORT || 3000;
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use('/api/v1/auth/', _users["default"]);
app.use('/api/v1/accounts', _accounts["default"]);
app.use('/api/v1/transactions', _transactions["default"]);
app.get('/', function (req, res) {
  res.sendFile(_path["default"].join(__dirname.replace('src', '\\index.html'))); // res.sendFile(path.join(__dirname, '\\index.html'));
});
app.listen(port, function () {
  console.log("server started now at port ".concat(port)); // console.log(path.join(__dirname.replace('src', '\\index.html')));
});
var _default = app;
exports["default"] = _default;