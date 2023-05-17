import mongoose from "mongoose";
import UploadImage from "../config/cloudinary.js";
import Models from "../model/index.js";
import { EMessage } from "../service/message.js";
import {
  SendCreate,
  SendError400,
  SendError404,
  SendError500,
  SendSuccess,
} from "../service/respones.js";
import {
  ValidateParts,
  ValidateUpdateParts,
  ValidateUpdatePartsImage,
} from "../service/validate.js";
export default class PartsController {
  static async getAll(req, res) {
    try {
      const parts = await Models.Parts.find().populate({
        path: "vehicleId",
        select: "vehicleType name is_Active createdAt updatedAt",
      });
      return SendSuccess(res, "Get All Parts Successful", parts);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get All Parts", error);
    }
  }
  static async getOne(req, res) {
    try {
      const partsId = req.params.partsId;
      if (!mongoose.Types.ObjectId.isValid(partsId)) {
        return SendError404(res, "Not Found Parts Id");
      }
      const parts = await Models.Parts.findOne({
        _id: partsId,
        is_Active: true,
      }).populate({
        path: "vehicleId",
        select: "vehicleType name is_Active createdAt updatedAt",
      });
      return SendSuccess(res, "Get One Successful", parts);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get One Parts", error);
    }
  }
  static async insert(req, res) {
    try {
      const validate = ValidateParts(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { name, vehicleId, detail, price, image } = req.body;
      if(!mongoose.Types.ObjectId.isValid(vehicleId)){
        return SendError404(res,"Not Found Vehicle ID");
      }
    //   price = parseFloat(price).replace(",", " ");
      const imageUrl = await UploadImage(image);
      if (!imageUrl) {
        return SendError400(res, "Error Base64");
      }
      const parts = await Models.Parts.create({
        name,
        vehicleId,
        detail,
        price,
        image: imageUrl,
      });
      return SendCreate(res, "Insert Parts Successful", parts);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Insert Parts", error);
    }
  }
  static async updateParts(req, res) {
    try {
      const partsId = req.params.partsId;
      if (!mongoose.Types.ObjectId.isValid(partsId)) {
        return SendError404(res, "Not Found Parts Id");
      }
      const validate = ValidateUpdateParts(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { vehicleId, name, detail, price } = req.body;
      const parts = await Models.Parts.findByIdAndUpdate(
        partsId,
        {
          vehicleId,
          name,
          detail,
          price,
        },
        { new: true }
      );
      return SendSuccess(res, "Update Parts Successful", parts);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Update Parts", error);
    }
  }
  static async updatePartsImage(req, res) {
    try {
      const partsId = req.params.partsId;
      if (!mongoose.Types.ObjectId.isValid(partsId)) {
        return SendError404(res, "Not Found Parts Id");
      }
      const validate = ValidateUpdatePartsImage(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { image, oldImage } = req.body;
      const imageUrl = await UploadImage(image, oldImage);
      if (!imageUrl) {
        return SendError400(res, "Error Base64");
      }
      const parts = await Models.Parts.findByIdAndUpdate(
        partsId,
        { image: imageUrl },
        { new: true }
      ).populate({
        path: "vehicle",
        select: "vehicleType name is_Active createdAt updatedAt",
      });
      return SendSuccess(res, "Update Parts Image Successful", parts);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Update Parts Image", error);
    }
  }
}
