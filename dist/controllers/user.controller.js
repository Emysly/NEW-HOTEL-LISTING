"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _index = _interopRequireDefault(require("../helper/index"));

var _appRootPath = _interopRequireDefault(require("app-root-path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _dotenv.config)();
var userDB = "".concat(_appRootPath["default"], "/src/database/user.json");
var _default = {
  create: function () {
    var _create = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var _req$body, firstname, lastname, email, password, is_admin, users, id, newUser;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, firstname = _req$body.firstname, lastname = _req$body.lastname, email = _req$body.email, password = _req$body.password;
              is_admin = req.body.secretCode === process.env.ADMIN_SECRET_CODE;
              _context.next = 5;
              return _index["default"].loadUsers(userDB);

            case 5:
              users = _context.sent;
              id = users.length === 0 ? 1 : users[users.length - 1].id + 1;
              _context.t0 = id;
              _context.t1 = firstname;
              _context.t2 = lastname;
              _context.t3 = email;
              _context.next = 13;
              return _bcrypt["default"].hash(password, 10);

            case 13:
              _context.t4 = _context.sent;
              _context.t5 = is_admin;
              newUser = {
                id: _context.t0,
                firstname: _context.t1,
                lastname: _context.t2,
                email: _context.t3,
                password: _context.t4,
                is_admin: _context.t5
              };
              // add it to the former ones
              users.push(newUser);
              _context.next = 19;
              return _index["default"].saveUser(users);

            case 19:
              return _context.abrupt("return", res.status(201).json({
                status: "success",
                data: newUser
              }));

            case 22:
              _context.prev = 22;
              _context.t6 = _context["catch"](0);
              return _context.abrupt("return", res.status(400).json({
                status: "error",
                error: {
                  message: _context.t6.message
                }
              }));

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 22]]);
    }));

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  login: function () {
    var _login = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var _req$body2, email, password, users, emailExist;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
              _context2.next = 4;
              return _index["default"].loadUsers(userDB);

            case 4:
              users = _context2.sent;
              emailExist = users.find(function (user) {
                return email === user.email;
              });

              if (emailExist) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                status: "error",
                data: {
                  message: "email not found!"
                }
              }));

            case 8:
              if (_bcrypt["default"].compareSync(password, emailExist.password)) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", res.status(401).json({
                status: "error",
                data: {
                  message: "password is incorrect!"
                }
              }));

            case 10:
              delete emailExist.password;
              return _context2.abrupt("return", res.status(200).json({
                status: "success",
                data: emailExist
              }));

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(400).json({
                status: "error",
                error: {
                  message: _context2.t0.message
                }
              }));

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 14]]);
    }));

    function login(_x3, _x4) {
      return _login.apply(this, arguments);
    }

    return login;
  }()
};
exports["default"] = _default;