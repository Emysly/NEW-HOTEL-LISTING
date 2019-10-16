import { config } from "dotenv";
import bcrypt from "bcrypt";

import Helper from "../helper/index";
import appRoot from "app-root-path";

config();

const userDB = `${appRoot}/src/database/user.json`;

export default {
  create: async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;

      const is_admin = req.body.secretCode === process.env.ADMIN_SECRET_CODE;

      const users = await Helper.loadUsers(userDB);

      const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;

      const newUser = {
        id,
        first_name,
        last_name,
        email,
        password: await bcrypt.hash(password, 10),
        is_admin
      };

      // add it to the former ones
      users.push(newUser);
      await Helper.saveUser(users);

      // return the newly created user
      return res.status(201).json({
        status: "success",
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

      const emailExist = users.find(user => email === user.email);

      if (!emailExist)
        return res.status(404).json({
          status: "error",
          data: {
            message: "email not found!"
          }
        });

      if (!bcrypt.compareSync(password, emailExist.password)) {
        return res.status(401).json({
          status: "error",
          data: {
            message: "password is incorrect!"
          }
        });
      }

      delete emailExist.password;

      return res.status(200).json({
        status: "success",
        data: emailExist
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
