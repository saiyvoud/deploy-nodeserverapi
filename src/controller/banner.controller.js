import {
  SendCreate,
  SendError400,
  SendError404,
  SendError500,
  SendSuccess,
} from "../service/respones.js";
import { EMessage } from "../service/message.js";
import UploadImage from "../config/cloudinary.js";
import Models from "../model/index.js";
import {
  ValidateBanner,
  ValidateUpdateBanner,
  ValidateUpdateBannerImage,
} from "../service/validate.js";
import mongoose from "mongoose";
export default class BannerController {
  static async getAll(req, res) {
    try {
      const banner = await Models.Banner.find();
      return SendSuccess(res, "Get All Banner Successful", banner);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get All Banner");
    }
  }
  static async getOne(req, res) {
    try {
      const bannerId = req.params.bannerId;
      if (!mongoose.Types.ObjectId.isValid(bannerId)) {
        return SendError404(res, "Not Found Banner Id");
      }
      const banner = await Models.Banner.findOne({
        is_Active: true,
        _id: bannerId,
      });
      return SendSuccess(res, "Get One Banner Successful", banner);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get One Banner");
    }
  }
  static async insert(req, res) {
    try {
      const validate = ValidateBanner(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { name, detail, image } = req.body;
      const imageUrl = await UploadImage(image);
      if (!imageUrl) {
        return SendError400(res, "Error Base64");
      }
      const banner = await Models.Banner.create({
        name,
        detail,
        image: imageUrl,
      });
      return SendCreate(res, "Insert Banner Successful", banner);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Banner Insert", error);
    }
  }
  static async updateBanner(req, res) {
    try {
      const bannerId = req.params.bannerId;
      if (!mongoose.Types.ObjectId.isValid(bannerId)) {
        return SendError404(res, "Not Found Banner Id");
      }
      const { name, detail } = req.body;
      const validate = ValidateUpdateBanner(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const banner = await Models.Banner.findByIdAndUpdate(
        bannerId,
        {
          name,
          detail,
        },
        { new: true }
      );
      return SendSuccess(res, "Update Banner Successful", banner);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Update Banner", error);
    }
  }
  static async updateBannerImage(req, res) {
    try {
      const bannerId = req.params.bannerId;
      if (!mongoose.Types.ObjectId.isValid(bannerId)) {
        return SendError404(res, "Not Found Banner Id");
      }
      const { image, oldImage } = req.body;
      const validate = ValidateUpdateBannerImage(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const imageUrl = await UploadImage(image, oldImage);
      if (!imageUrl) {
        return SendError400(res, "Error Something");
      }
      const banner = await Models.Banner.findById(
        bannerId,
        {
          image: imageUrl,
        },
        { new: true }
      );
      return SendSuccess(res, "Update Banner Image Successful", banner);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Update Banner Image", error);
    }
  }
  static async deleteBannerStatus(req, res) {
    try {
      const bannerId = req.params.bannerId;
      if (!mongoose.Types.ObjectId.isValid(bannerId)) {
        return SendError404(res, "Not Found Banner Id");
      }
      const banner = await Models.Banner.findByIdAndUpdate(
        bannerId,
        {
          is_Active: false,
        },
        { new: true }
      );
      return SendSuccess(res, "Delete Banner Status Successful", banner);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Delete Banner Status", error);
    }
  }
  static async deleteBanner(req, res) {
    try {
      const bannerId = req.params.bannerId;
      if (!mongoose.Types.ObjectId.isValid(bannerId)) {
        return SendError404(res, "Not Found Banner Id");
      }
      const banner = await Models.Banner.findByIdAndDelete(bannerId);
      return SendSuccess(res, "Delete Banner Successful", banner);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Delete Banner", error);
    }
  }
}
