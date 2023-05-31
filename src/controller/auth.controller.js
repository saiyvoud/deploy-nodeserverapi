import Models from "../model/index.js";
import {
  SendCreate,
  SendError400,
  SendError401,
  SendError404,
  SendError500,
  SendSuccess,
} from "../service/respones.js";
import {
  ValidateRegister,
  ValidateLogin,
  ValidateUpdateUser,
  ValidateUpdateUserProfile,
} from "../service/validate.js";
import { GenerateToken, ComparePassword,VerifyRefreshToken } from "../service/service.js";
import { EMessage, SMessage } from "../service/message.js";
import mongoose from "mongoose";
import UploadImage, { UploadImageMulti } from "../config/cloudinary.js";
export default class AuthController {
  static async getProfile(req, res) {
    try {
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError404(res, EMessage.NotFoundUserID);
      }
      // const user = await Models.User.findOne({firstName})
      const user = await Models.User.findOne({ _id: userId, is_Active: true });
      return SendSuccess(res, "Get One User Successful", user);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Get One User Faild!");
    }
  }
  static async getAll(req, res) {
    try {
      const user = await Models.User.find();
      return SendSuccess(res, "Get All User Successful", user);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Get All User Faild!");
    }
  }
  static async deleteUser(req, res) {
    try {
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError404(res, EMessage.NotFoundUserID);
      }
      const user = await Models.User.findByIdAndUpdate(
        userId,
        {
          is_Active: false,
        },
        { new: true }
      );
      return SendSuccess(res, "Delete User Successful", user);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Delete User Faild!");
    }
  }
  static async login(req, res) {
    try {
      const validate = ValidateLogin(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { phoneNumber, password } = req.body;
      const user = await Models.User.findOne({ phoneNumber });
      if (!user) {
        return SendError400(res, "PhoneNumber is not match");
      }
      const isMatch = await ComparePassword(password, user.password);
      if (!isMatch) {
        return SendError400(res, "Password is not Match");
      }
      const token = await GenerateToken(user);
      const data = Object.assign(
        JSON.parse(JSON.stringify(user)),
        JSON.parse(JSON.stringify(token))
      );
      return SendSuccess(res, SMessage.Logined, data);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Login Faild!");
    }
  }
  static async RefreshToken(req, res) {
    try {
      const { token, refreshToken } = req.body;
      if(!token || !refreshToken){
       return SendError400(res,"token and refreshToken is required!")
      }
      const result = await VerifyRefreshToken(token,refreshToken); 
      if(!result){
      return SendError404(res,"Error Generate RefreshToken")
      }
     return SendSuccess(res,EMessage.refreshToken,result);
    } catch (error) {
      console.log("error refresh token", error);
      SendError500(res, "Error Refresh Token", error);
    }
  }
  static async register(req, res) {
    try {
      const validate = ValidateRegister(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { firstName, lastName, phoneNumber, password } = req.body;
      const checkPhoneNumber = await Models.User.findOne({
        phoneNumber: phoneNumber,
      });

      if (checkPhoneNumber) {
        return SendError400(res, EMessage.AlreadyPhoneNumber, phoneNumber);
      }
      const user = new Models.User({
        firstName,
        lastName,
        phoneNumber,
        password,
      });
      await user.save();
      const token = await GenerateToken(user);
      const data = Object.assign(
        JSON.parse(JSON.stringify(user)),
        JSON.parse(JSON.stringify(token))
      );

      return SendSuccess(res, SMessage.Register, data);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.RegisterFaild, error);
    }
  }

  static async updateUser(req, res) {
    try {
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError404(res, EMessage.NotFoundUserID);
      }
      const validate = ValidateUpdateUser(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { firstName, lastName } = req.body;
      const user = await Models.User.findByIdAndUpdate(
        userId,
        {
          firstName,
          lastName,
        },
        { new: true }
      );
      return SendSuccess(res, "Update User Successful", user);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Update User Faild", error);
    }
  }
  static async updateUserProfile(req, res) {
    try {
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError404(res, EMessage.NotFoundUserID);
      }
      const { image, oldImage } = req.body;
      const validate = ValidateUpdateUserProfile(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const imageUrl = await UploadImage(image, oldImage);
      if (!imageUrl) {
        return SendError400(res, "Base64");
      }
      const user = await Models.User.findByIdAndUpdate(
        userId,
        {
          profile: imageUrl,
        },
        { new: true }
      );
      return SendSuccess(res, "Update Profile Successful", user);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Update Profile", error);
    }
  }
  static async updateUserProfileMulti(req, res) {
    try {
      
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError404(res, EMessage.NotFoundUserID);
      }
      const { image, oldImage } = req.body;
      const validate = ValidateUpdateUserProfile(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      // Multi
      const images = [];
      if (req.body.image) {
        const imagePaths = req.body.image.split(",");
        for (let i = 0; i < imagePaths.length; i++) {
          const imgUrl = await UploadImage(imagePaths[i]);
          images.push(imgUrl);
        }
      }
      // const imageUrl = await UploadImage(image)

      let data = { profile: images };
      const user = await Models.User.findByIdAndUpdate(
        userId,
        { $set: data },
        { new: true }
      );

      return SendSuccess(res, "Update Profile Successful", user);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Update Profile", error);
    }
  }
  static async updateUserProfileMulti(req, res) {
    try {
      let images = [];
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError404(res, EMessage.NotFoundUserID);
      }
      const { image, oldImage } = req.body;
      const validate = ValidateUpdateUserProfile(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      // Multi
      if (image) {
        let imagePaths = await image.split(",");
        for (let i = 0; i < imagePaths.length; i++) {
          const imgUrl = await UploadImage(imagePaths[i]);
          console.log(imgUrl);
          images.push(imgUrl);
        }
      }
   
      const user = await Models.User.findByIdAndUpdate(
        userId,
        {
          profile: images,
        },
        { new: true }
      );
      return SendSuccess(res, "Update Profile Successful", user);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Update Profile", error);
    }
  }
}
