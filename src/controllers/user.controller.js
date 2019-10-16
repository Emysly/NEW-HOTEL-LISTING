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
  }
};
