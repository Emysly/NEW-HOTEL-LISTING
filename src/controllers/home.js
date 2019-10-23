import { config } from "dotenv";

import Helper from "../helper/index";
import appRoot from "app-root-path";

config();

export default {
  homePage: async (req, res) => {
    res.sendFile(`${appRoot}/public/index.html`);
  },
  signupformPage: async (req, res) => {
    res.sendFile(`${appRoot}/public/signup.html`);
  },
  loginformPage: async (req, res) => {
    res.sendFile(`${appRoot}/public/login.html`);
  },
  resetPage: async (req, res) => {
    res.sendFile(`${appRoot}/public/reset.html`);
  },
  loggedinPage: async (req, res) => {
    res.sendFile(`${appRoot}/public/home.html`);
  }
};
