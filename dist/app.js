"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/stable");

require("regenerator-runtime/runtime");

var _dotenv = require("dotenv");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _routes = _interopRequireDefault(require("./routes"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _dotenv.config)();
var app = (0, _express["default"])();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _cookieParser["default"])());
app.use((0, _morgan["default"])("combined"));
app.use(_routes["default"]);
app.use(_express["default"]["static"]("public"));
app.use(function (req, res, next) {
  var err = new Error("No endpoint found");
  err.status = 404;
  next(err);
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.error("".concat(err.status || 500, " - ").concat(err.message, " - ").concat(req.originalUrl, " - ").concat(req.method, " - ").concat(req.ip));
  res.status(err.status || 500).json({
    status: "error",
    error: {
      message: err.message || "Internal server error"
    }
  });
  next();
});
var port = parseInt(process.env.PORT, 10) || 3000;
app.listen(port, function () {
  return console.log("Listening on port ".concat(port));
});
var _default = app;
exports["default"] = _default;