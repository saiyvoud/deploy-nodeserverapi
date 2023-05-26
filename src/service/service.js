import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { SECRET_KEY } from "../config/globalKey.js";
import Models from "../model/index.js";
export const GenerateToken = (user) => {
  return new Promise(async (resovle, reject) => {
    try {
     // console.log(`user======>${user.phoneNumber}`);
      let token = jwt.sign(
        {
          _id: user._id,
          phoneNumber: user.phoneNumber,
        },
        `${SECRET_KEY}`,
        { expiresIn: "1d" }
      );
      let refreshToken = await GenerateRefreshToken(token, user);
      resovle({ token, refreshToken });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const GenerateRefreshToken = (token, user) => {
  return new Promise(async (resovle, reject) => {
    try {
      let refreshToken = jwt.sign(
        { _id: user._id, phoneNumber: user.phoneNumber, token },
        `${SECRET_KEY}`
      );
      refreshToken
        ? resovle(refreshToken)
        : reject("Error Generate RefreshToken");
    } catch (error) {
      reject(error);
    }
  });
};

export const VerifyRefreshToken = (token, refreshToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(refreshToken, `${SECRET_KEY}`, async (err, decode) => {
        if (err) return reject(err);
        console.log(`decode===>${decode.token}`);
        console.log(`token===>${token}`);
        if (decode.token == token) {
          const newToken = await GenerateToken(decode);
          resolve(newToken);
        } else {
          reject("Invalid RefreshToken");
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const ComparePassword = (password, userPassword) => {
  return new Promise(async (resovle, reject) => {
    try {
      bcrypt.compare(password, userPassword, (err, isMacth) => {
        if (err) return reject(err);
        resovle(isMacth);
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const VerifyToken = (token) => {
  return new Promise(async (resovle, reject) => {
    try {
      jwt.verify(token, SECRET_KEY, function (err, isMatch) {
        if (err) return reject(err);
        resovle({ isMatch });
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export const CheckPriceRef = (partsId, priceTotal) => {
  return new Promise(async (resovle, reject) => {
    try {
      const parts = await Models.Parts.findOne({
        _id: partsId,
        is_Active: true,
      });

      if (priceTotal != parts.price) {
        return reject("Error Not Match PricTotal");
      }
      return resovle(parts);
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
};
