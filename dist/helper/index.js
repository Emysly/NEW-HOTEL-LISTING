"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _appRootPath = _interopRequireDefault(require("app-root-path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var hotelDB = "".concat(_appRootPath["default"], "/src/database/hotel.json");
var recycledhotelDB = "".concat(_appRootPath["default"], "/src/database/recycledhotel.json");
var userDB = "".concat(_appRootPath["default"], "/src/database/user.json");
var _default = {
  loadHotels: function loadHotels(hotelDB) {
    var dataBuffer = _fs["default"].readFileSync(hotelDB);

    var dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  },
  loadRecycledHotels: function loadRecycledHotels(recycledhotelDB) {
    var dataBuffer = _fs["default"].readFileSync(recycledhotelDB);

    var dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  },
  loadUsers: function loadUsers(userDB) {
    var dataBuffer = _fs["default"].readFileSync(userDB);

    var dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  },
  saveHotel: function saveHotel(newHotel) {
    var dataJSON = JSON.stringify(newHotel);

    _fs["default"].writeFileSync(hotelDB, dataJSON);
  },
  saveRecycledHotel: function saveRecycledHotel(newRecycledHotel) {
    var dataJSON = JSON.stringify(newRecycledHotel);

    _fs["default"].writeFileSync(recycledhotelDB, dataJSON);
  },
  saveUser: function saveUser(newUser) {
    var dataJSON = JSON.stringify(newUser);

    _fs["default"].writeFileSync(userDB, dataJSON);
  }
};
exports["default"] = _default;