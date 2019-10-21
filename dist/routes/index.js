"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../controllers/user"));

var _hotel = _interopRequireDefault(require("../controllers/hotel"));

var _home = _interopRequireDefault(require("../controllers/home"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/user/signup", _user["default"].create);
router.post("/user/login", _user["default"].login);
router.get("/", _home["default"].homePage);
router.get("/signup", _home["default"].signupformPage);
router.get("/login", _home["default"].loginformPage);
router.get("/reset", _home["default"].resetPage);
router.get("/home", _auth["default"].isLoggedIn, _home["default"].loggedinPage);
router.get("/allhotels", _auth["default"].isLoggedIn, _hotel["default"].getAllHotels);
router.get("/hotels", _hotel["default"].getAll);
router.get("/hotel/:id", _auth["default"].isLoggedIn, _hotel["default"].getOne);
router.post("/hotels", _auth["default"].isLoggedIn, _hotel["default"].create);
router.patch("/hotel/:id", _auth["default"].isLoggedIn, _hotel["default"].updateOne);
router["delete"]("/hotel/:id", _auth["default"].isLoggedIn, _hotel["default"].deleteOne);
router["delete"]("/hotels", _auth["default"].isLoggedIn, _hotel["default"].deleteAll);
var _default = router;
exports["default"] = _default;