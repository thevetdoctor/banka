"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

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
  res.sendFile(_path["default"].join(__dirname.replace('dist', '\\index.html'))); // res.sendFile(path.join(__dirname, '\\index.html'));
});
var swaggerDefinition = {
  info: {
    title: 'REST API for Banka',
    // Title of the documentation
    version: '1.0.0',
    // Version of the app
    description: 'This is the REST API for Banka' // short description of the app

  },
  host: 'localhost:3000',
  // the host or url of the app
  basePath: '/api/v1/' // the basepath of your endpoint

}; // options for the swagger docs

var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./docs/**/*.yaml']
}; // initialize swagger-jsdoc

var swaggerSpec = (0, _swaggerJsdoc["default"])(options); // use swagger-Ui-express for your app documentation endpoint

app.use('/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerSpec)); // copywright:
// https://medium.com/the-andela-way/splitting-your-swagger-spec-into-multiple-files-in-a-node-project-2019575b0ced

app.listen(port, function () {
  console.log("server started now at port ".concat(port)); // console.log(path.join(__dirname.replace('src', '\\index.html')));
});
var _default = app;
exports["default"] = _default;