"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _fs = _interopRequireDefault(require("fs"));

var _appRootPath = _interopRequireDefault(require("app-root-path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var privateKey;
var publicKey;
var encryptionType = "RS256";

_fs["default"].readFile("".concat(_appRootPath["default"], "/src/keys/public.pem"), "utf8", function (err, key) {
  if (err) throw err;
  publicKey = key;

  _fs["default"].readFile("".concat(_appRootPath["default"], "/src/keys/private.pem"), "utf8", function (err, data) {
    if (err) throw err;
    privateKey = data;
  });
});

var _default = {
  createCookie: function createCookie(res, token) {
    return res.cookie("token", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true
    });
  },
  createToken: function createToken(payload) {
    return _jsonwebtoken["default"].sign(payload, privateKey, {
      algorithm: encryptionType
    });
  },
  isLoggedIn: function isLoggedIn(req, res, next) {
    try {
      var authorization = req.headers.authorization;
      var token;

      if (typeof authorization !== "undefined" && authorization.includes("Bearer")) {
        token = authorization.replace("Bearer ", "");
      } else {
        token = req.cookies.token;
      }

      if (typeof token === "undefined") {
        return res.status(401).json({
          status: "error",
          error: "You must be logged in to proceed"
        });
      }
      /* verify the token and add the data into the request body
      along with original content
      */


      req.body = _objectSpread({}, req.body, {}, _jsonwebtoken["default"].verify(token, publicKey, {
        algorithm: encryptionType
      })); // remove the token creation time; it's not needed

      delete req.body.iat;
      return next();
    } catch (error) {
      return res.status(401).json({
        status: "error",
        error: "authentication failed! ".concat(error.message.toUpperCase())
      });
    }
  },
  isAdmin: function isAdmin(req, res, next) {
    return req.body.is_admin !== true ? res.status(403).json({
      status: "error",
      error: "forbidden: only an admin can perform this operation"
    }) : next();
  }
};
exports["default"] = _default;