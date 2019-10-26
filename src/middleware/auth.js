import jwt from "jsonwebtoken";
import fs from "fs";
import appRoot from "app-root-path";

let privateKey;
let publicKey;
const encryptionType = "RS256";

fs.readFile(`${appRoot}/src/keys/public.pem`, "utf8", (err, key) => {
  if (err) throw err;
  publicKey = key;

  fs.readFile(`${appRoot}/src/keys/private.pem`, "utf8", (err, data) => {
    if (err) throw err;
    privateKey = data;
  });
});

export default {
  createToken: payload =>
    jwt.sign(payload, privateKey, { algorithm: encryptionType }),

  createCookie: (res, token) =>
    res.cookie("token", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true
    }),

  isLoggedIn: (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      let token;

      if (
        typeof authorization !== "undefined" &&
        authorization.includes("Bearer")
      ) {
        token = authorization.replace("Bearer ", "");
      } else {
        token = req.cookies.token;
      }

      if (typeof token === "undefined") {
        return res.status(401).json({
          status: "error",
          error: "You must be logged in to proceed"
        });
      }

      /* verify the token and add the data into the request body
      along with original content
      */
      req.body = {
        ...req.body,
        ...jwt.verify(token, publicKey, { algorithm: encryptionType })
      };

      // remove the token creation time; it's not needed
      delete req.body.iat;

      return next();
    } catch (error) {
      return res.status(401).json({
        status: "error",
        error: `authentication failed! ${error.message.toUpperCase()}`
      });
    }
  },

  isAdmin: (req, res, next) =>
    req.body.is_admin !== true
      ? res.status(403).json({
          status: "error",
          error: "forbidden: only an admin can perform this operation"
        })
      : next()
};
