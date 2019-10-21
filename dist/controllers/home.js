"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

var _index = _interopRequireDefault(require("../helper/index"));

var _appRootPath = _interopRequireDefault(require("app-root-path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _dotenv.config)();
var _default = {
  homePage: function () {
    var _homePage = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              res.sendFile("".concat(_appRootPath["default"], "/public/index.html"));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function homePage(_x, _x2) {
      return _homePage.apply(this, arguments);
    }

    return homePage;
  }(),
  signupformPage: function () {
    var _signupformPage = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              res.sendFile("".concat(_appRootPath["default"], "/public/signup.html"));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function signupformPage(_x3, _x4) {
      return _signupformPage.apply(this, arguments);
    }

    return signupformPage;
  }(),
  loginformPage: function () {
    var _loginformPage = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              res.sendFile("".concat(_appRootPath["default"], "/public/login.html"));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function loginformPage(_x5, _x6) {
      return _loginformPage.apply(this, arguments);
    }

    return loginformPage;
  }(),
  resetPage: function () {
    var _resetPage = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              res.sendFile("".concat(_appRootPath["default"], "/public/reset.html"));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function resetPage(_x7, _x8) {
      return _resetPage.apply(this, arguments);
    }

    return resetPage;
  }(),
  loggedinPage: function () {
    var _loggedinPage = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              res.sendFile("".concat(_appRootPath["default"], "/public/home.html"));

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function loggedinPage(_x9, _x10) {
      return _loggedinPage.apply(this, arguments);
    }

    return loggedinPage;
  }()
};
exports["default"] = _default;