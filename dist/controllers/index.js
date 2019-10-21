"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _index = _interopRequireDefault(require("../helper/index"));

var _appRootPath = _interopRequireDefault(require("app-root-path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var hotelDB = "".concat(_appRootPath["default"], "/src/database/hotel.json");

var HotelController =
/*#__PURE__*/
function () {
  function HotelController() {
    _classCallCheck(this, HotelController);
  }

  _createClass(HotelController, null, [{
    key: "home",
    value: function () {
      var _home = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                res.sendFile("../../public/html/dash.html");

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function home(_x, _x2) {
        return _home.apply(this, arguments);
      }

      return home;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var id, _req$body, name, website, city, state, rating, price, hotels, newHotel;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body = req.body, name = _req$body.name, website = _req$body.website, city = _req$body.city, state = _req$body.state, rating = _req$body.rating, price = _req$body.price; //load the hotels first

                _context2.next = 4;
                return _index["default"].loadHotels(hotelDB);

              case 4:
                hotels = _context2.sent;

                if (hotels.length === 0) {
                  id = 1;
                } else {
                  id = hotels[hotels.length - 1].id + 1;
                } // create the new hotel


                newHotel = {
                  id: id,
                  name: name,
                  website: website,
                  city: city,
                  state: state,
                  rating: rating,
                  price: price
                }; // add it to the former ones

                hotels.push(newHotel);
                _context2.next = 10;
                return _index["default"].saveHotel(hotels);

              case 10:
                return _context2.abrupt("return", res.status(201).json({
                  status: "success",
                  data: newHotel
                }));

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(400).json({
                  status: "error",
                  error: {
                    message: _context2.t0.message
                  }
                }));

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 13]]);
      }));

      function create(_x3, _x4) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var hotels;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _index["default"].loadHotels(hotelDB);

              case 3:
                hotels = _context3.sent;

                if (!(hotels.length === 0)) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", res.status(200).json({
                  status: "success",
                  data: "No hotels found"
                }));

              case 6:
                return _context3.abrupt("return", res.status(200).json({
                  status: "success",
                  data: hotels
                }));

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(400).json({
                  status: "error",
                  error: {
                    message: _context3.t0.message
                  }
                }));

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 9]]);
      }));

      function getAll(_x5, _x6) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "getOne",
    value: function () {
      var _getOne = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var id, hotelID, hotels, hotel;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = req.params.id;
                hotelID = Number(id); // load all hotels

                _context4.next = 5;
                return _index["default"].loadHotels(database);

              case 5:
                hotels = _context4.sent;
                // find one hotel by the id
                hotel = hotels.filter(function (hotel) {
                  return hotel.id === hotelID;
                });

                if (!(hotel.length === 0)) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json({
                  status: "error",
                  error: "Hotel with ".concat(id, " not found")
                }));

              case 9:
                return _context4.abrupt("return", res.status(200).json({
                  status: "success",
                  data: hotel
                }));

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(400).json({
                  status: "error",
                  error: {
                    message: _context4.t0.message
                  }
                }));

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 12]]);
      }));

      function getOne(_x7, _x8) {
        return _getOne.apply(this, arguments);
      }

      return getOne;
    }()
  }, {
    key: "deleteOne",
    value: function () {
      var _deleteOne = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var id, hotelID, hotels, exist, hotel;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                id = req.params.id;
                hotelID = Number(id); // load all hotels

                _context5.next = 5;
                return _index["default"].loadHotels(hotelDB);

              case 5:
                hotels = _context5.sent;
                exist = hotels.find(function (hotel) {
                  return hotel.id === hotelID;
                });

                if (!exist) {
                  _context5.next = 12;
                  break;
                }

                hotel = hotels.filter(function (hotel) {
                  return hotel.id !== hotelID;
                });
                _context5.next = 11;
                return _index["default"].saveHotel(hotel);

              case 11:
                return _context5.abrupt("return", res.status(200).json({
                  status: "success",
                  data: "Hotel #".concat(id, " has been deleted")
                }));

              case 12:
                return _context5.abrupt("return", res.status(404).json({
                  status: "error",
                  error: "Hotel with ".concat(id, " does not exist")
                }));

              case 15:
                _context5.prev = 15;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", res.status(400).json({
                  status: "error",
                  error: {
                    message: _context5.t0.message
                  }
                }));

              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 15]]);
      }));

      function deleteOne(_x9, _x10) {
        return _deleteOne.apply(this, arguments);
      }

      return deleteOne;
    }()
  }, {
    key: "deleteAll",
    value: function () {
      var _deleteAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var hotels;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return _index["default"].loadHotels(hotelDB);

              case 3:
                hotels = _context6.sent;

                while (hotels.length > 0) {
                  hotels.pop();
                }

                _index["default"].saveHotel(hotels);

                return _context6.abrupt("return", res.status(200).json({
                  status: "success",
                  data: "All hotels deleted."
                }));

              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6["catch"](0);
                return _context6.abrupt("return", res.status(400).json({
                  status: "error",
                  error: {
                    message: _context6.t0.message
                  }
                }));

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 9]]);
      }));

      function deleteAll(_x11, _x12) {
        return _deleteAll.apply(this, arguments);
      }

      return deleteAll;
    }()
  }, {
    key: "updateOne",
    value: function () {
      var _updateOne = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(req, res) {
        var _req$body2, name, website, city, state, rating, price, id, hotelID, hotels, index;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _req$body2 = req.body, name = _req$body2.name, website = _req$body2.website, city = _req$body2.city, state = _req$body2.state, rating = _req$body2.rating, price = _req$body2.price;
                id = req.params.id;
                hotelID = Number(id); // load this guy

                hotels = _index["default"].loadHotels(hotelDB);
                index = hotels.findIndex(function (hotel) {
                  return hotel.id === hotelID;
                });

                if (!(index > -1)) {
                  _context7.next = 16;
                  break;
                }

                hotels[index]["name"] = name || hotels[index]["name"];
                hotels[index]["website"] = website || hotels[index]["website"];
                hotels[index]["city"] = city || hotels[index]["city"];
                hotels[index]["state"] = state || hotels[index]["state"];
                hotels[index]["rating"] = rating || hotels[index]["rating"];
                hotels[index]["price"] = price || hotels[index]["price"];
                _context7.next = 15;
                return _index["default"].saveHotel(hotels);

              case 15:
                return _context7.abrupt("return", res.status(200).json({
                  status: "success",
                  data: hotels[index]
                }));

              case 16:
                return _context7.abrupt("return", res.status(404).json({
                  status: "error",
                  error: "The hotel you are trying to update does not exist"
                }));

              case 19:
                _context7.prev = 19;
                _context7.t0 = _context7["catch"](0);
                return _context7.abrupt("return", res.status(400).json({
                  status: "error",
                  error: {
                    message: _context7.t0.message
                  }
                }));

              case 22:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 19]]);
      }));

      function updateOne(_x13, _x14) {
        return _updateOne.apply(this, arguments);
      }

      return updateOne;
    }()
  }]);

  return HotelController;
}();

exports["default"] = HotelController;