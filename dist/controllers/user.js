"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _index = _interopRequireDefault(require("../helper/index"));

var _appRootPath = _interopRequireDefault(require("app-root-path"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

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
      var _req$body, first_name, last_name, email, password, is_admin, users, id, newUser, payload;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, first_name = _req$body.first_name, last_name = _req$body.last_name, email = _req$body.email, password = _req$body.password;
              is_admin = req.body.secretCode === process.env.ADMIN_SECRET_CODE;
              _context.next = 5;
              return _index["default"].loadUsers(userDB);

            case 5:
              users = _context.sent;
              id = users.length === 0 ? 1 : users[users.length - 1].id + 1;
              _context.t0 = id;
              _context.t1 = first_name;
              _context.t2 = last_name;
              _context.t3 = email;
              _context.next = 13;
              return _bcrypt["default"].hash(password, 10);

            case 13:
              _context.t4 = _context.sent;
              _context.t5 = is_admin;
              newUser = {
                id: _context.t0,
                first_name: _context.t1,
                last_name: _context.t2,
                email: _context.t3,
                password: _context.t4,
                is_admin: _context.t5
              };
              // add it to the former ones
              users.push(newUser);
              _context.next = 19;
              return _index["default"].saveUser(users);

            case 19:
              //we will be adding this to the jwt payload using the secret
              payload = Object.assign({
                user_id: newUser.id,
                is_admin: newUser.admin,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email
              }); //create the token and cookie

              _context.next = 22;
              return _auth["default"].createToken(payload);

            case 22:
              newUser.token = _context.sent;

              _auth["default"].createCookie(res, newUser.token); // return the newly created user


              return _context.abrupt("return", res.status(201).json({
                status: "success",
                data: newUser
              }));

            case 27:
              _context.prev = 27;
              _context.t6 = _context["catch"](0);
              return _context.abrupt("return", res.status(400).json({
                status: "error",
                error: {
                  message: _context.t6.message
                }
              }));

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 27]]);
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
      var _req$body2, email, password, users, loggedInUser, payload;

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
              loggedInUser = users.find(function (user) {
                return email === user.email;
              });

              if (loggedInUser) {
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
              if (_bcrypt["default"].compareSync(password, loggedInUser.password)) {
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
              delete loggedInUser.password; //we will be adding this to the jwt payload using the secret

              payload = Object.assign({
                user_id: loggedInUser.id,
                is_admin: loggedInUser.admin,
                first_name: loggedInUser.first_name,
                last_name: loggedInUser.last_name,
                email: loggedInUser.email
              }); //create the token and cookie

              _context2.next = 14;
              return _auth["default"].createToken(payload);

            case 14:
              loggedInUser.token = _context2.sent;

              _auth["default"].createCookie(res, loggedInUser.token);

              return _context2.abrupt("return", res.status(200).json({
                status: "success",
                data: loggedInUser
              }));

            case 19:
              _context2.prev = 19;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(400).json({
                status: "error",
                error: {
                  message: _context2.t0.message
                }
              }));

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 19]]);
    }));

    function login(_x3, _x4) {
      return _login.apply(this, arguments);
    }

    return login;
  }()
};
exports["default"] = _default;