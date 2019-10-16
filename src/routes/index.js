import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.post("/user/signup", UserController.create);
router.post("/user/login", UserController.login);

export default router;
