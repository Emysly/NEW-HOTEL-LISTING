import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.post("/user/signup", UserController.create);

export default router;
