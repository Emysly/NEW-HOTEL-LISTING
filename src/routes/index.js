import express from "express";
import UserController from "../controllers/user";
import HotelController from "../controllers/hotel";
import HomeController from "../controllers/home";
import Authenticator from "../middleware/auth";

const router = express.Router();

router.post("/user/signup", UserController.create);
router.post("/user/login", UserController.login);

router.get("/", HomeController.homePage);
router.get("/signup", HomeController.signupformPage);
router.get("/login", HomeController.loginformPage);
router.get("/reset", HomeController.resetPage);
router.get("/home", Authenticator.isLoggedIn, HomeController.loggedinPage);

router.get(
  "/allhotels",
  Authenticator.isLoggedIn,
  HotelController.getAllHotels
);
router.get("/hotels", HotelController.getAll);
router.get("/hotel/:id", Authenticator.isLoggedIn, HotelController.getOne);
router.post("/hotels", Authenticator.isLoggedIn, HotelController.create);
router.patch("/hotel/:id", Authenticator.isLoggedIn, HotelController.updateOne);
router.delete(
  "/hotel/:id",
  Authenticator.isLoggedIn,
  HotelController.deleteOne
);
router.delete("/hotels", Authenticator.isLoggedIn, HotelController.deleteAll);

export default router;
