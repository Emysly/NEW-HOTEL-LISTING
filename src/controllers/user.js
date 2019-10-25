import { config } from "dotenv";
import bcrypt from "bcrypt";

import Helper from "../helper/index";
import appRoot from "app-root-path";
import Authenticator from "../middleware/auth";

config();

const userDB = `${appRoot}/src/database/user.json`;

export default {
  create: async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;

      const is_admin = req.body.secretCode === process.env.ADMIN_SECRET_CODE;

      const users = await Helper.loadUsers(userDB);

      const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;

      const userEmail = users.find(user => email === user.email);

      //check if email alreay exist
      if (userEmail) {
        return res.status(404).json({
          status: "error",
          data: {
            message: "email already exist!"
          }
        });
      }

      //create new user
      const newUser = {
        id,
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: await bcrypt.hash(password, 10),
        is_admin
      };

      // add it to the former ones
      users.push(newUser);
      await Helper.saveUser(users);

      //we will be adding this to the jwt payload using the secret
      const payload = Object.assign({
        user_id: newUser.id,
        is_admin: newUser.admin,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email
      });

      //create the token and cookie
      newUser.token = await Authenticator.createToken(payload);
      Authenticator.createCookie(res, newUser.token);

      // return the newly created user
      return res.status(201).json({
        status: "success",
        message: "You have sign up successfully!",
        data: newUser
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        error: {
          message: err.message
        }
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const users = await Helper.loadUsers(userDB);

      const loggedInUser = users.find(user => email === user.email);

      if (!loggedInUser)
        return res.status(404).json({
          status: "error",
          data: {
            message: "email not found!"
          }
        });

      if (!bcrypt.compareSync(password, loggedInUser.password)) {
        return res.status(401).json({
          status: "error",
          data: {
            message: "password is incorrect!"
          }
        });
      }

      delete loggedInUser.password;

      //we will be adding this to the jwt payload using the secret
      const payload = Object.assign({
        user_id: loggedInUser.id,
        is_admin: loggedInUser.admin,
        first_name: loggedInUser.first_name,
        last_name: loggedInUser.last_name,
        email: loggedInUser.email
      });

      //create the token and cookie
      loggedInUser.token = await Authenticator.createToken(payload);
      Authenticator.createCookie(res, loggedInUser.token);

      return res.status(200).json({
        status: "success",
        message: "You have log in successfully!",
        data: loggedInUser
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        error: {
          message: err.message
        }
      });
    }
  }
};
