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
  ValidateVehicle,
  ValidateUpdateVehicle,
  ValidateUpdateVehicleImage,
} from "../service/validate.js";
export default class VehicleController {
  static async getAll(req, res) {
    try {
      const vehicle = await Models.Vehicle.find();
      return SendSuccess(res, "Get All Successful", vehicle);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get All", error);
    }
  }
  static async getOne(req, res) {
    try {
      const vehicleId = req.params.vehicleId;
      if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
        return SendError404(res, "Not Found Vehicle ID");
      }
      const vehicle = await Models.Vehicle.findOne({
        is_Active: true,
        _id: vehicleId,
      });
      return SendSuccess(res, "Get One Vehicle Successful", vehicle);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get One", error);
    }
  }
  static async insert(req, res) {
    try {
      const validate = ValidateVehicle(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { vehicleType, name, image } = req.body;
      const imageUrl = await UploadImage(image);
      if (!imageUrl) {
        return SendError400(res, "Error Image you must base64");
      }
      const vehicle = await Models.Vehicle.create({
        vehicleType,
        name,
        image: imageUrl,
      });
      return SendCreate(res, "Insert Vehicle Successful!", vehicle);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Insert Vehicle", error);
    }
  }
  static async updateVehicle(req, res) {
    try {
      const vehicleId = req.params.vehicleId;
      if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
        return SendError404(res, "Not Found Vehicle ID");
      }
      const validate = ValidateUpdateVehicle(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { vehicleType, name } = req.body;
      const vehicle = await Models.Vehicle.findByIdAndUpdate(
        vehicleId,
        {
          vehicleType,
          name,
        },
        { new: true }
      );
      return SendSuccess(res, "Update Vehicle Successful", vehicle);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Update Vehicle", error);
    }
  }
  static async updateVehicleImage(req, res) {
    try {
      const vehicleId = req.params.vehicleId;
      if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
        return SendError404(res, "Not Found Vehicle ID");
      }
      const validate = ValidateUpdateVehicleImage(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { image, oldImage } = req.body;
      const imageUrl = await UploadImage(image, oldImage);
      if (!imageUrl) {
        return SendError400(res, "Error Image you must base64");
      }
      const vehicle = await Models.Vehicle.findByIdAndUpdate(
        vehicleId,
        {
          image: imageUrl,
        },
        { new: true }
      );
      return SendSuccess(res, "Update Vehicle Image Successful", vehicle);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Update Vehicle Image", error);
    }
  }
  static async deleteVehicleStatus(req, res) {
    try {
      const vehicleId = req.params.vehicleId;
      if (!mongoose.Types.ObjectId.isValid(bannerId)) {
        return SendError404(res, "Not Found Vehicle Id");
      }
      const vehicle = await Models.Vehicle.findByIdAndUpdate(
        vehicleId,
        {
          is_Active: false,
        },
        { new: true }
      );
      return SendSuccess(res, "Delete Vehicle Status Successful", vehicle);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Delete Vehicle Status", error);
    }
  }
  static async deleteVehicle(req,res){
    try {
        const vehicleId = req.params.vehicleId;
        if (!mongoose.Types.ObjectId.isValid(bannerId)) {
          return SendError404(res, "Not Found Vehicle Id");
        }
        const vehicle = await Models.Vehicle.findByIdAndDelete(vehicleId);
        return SendSuccess(res,"Delete Vehicle Successful",vehicle);
    } catch (error) {
        console.log(error);
        return SendError500(res, "Error Delete Vehicle", error);
    }
  }
}
