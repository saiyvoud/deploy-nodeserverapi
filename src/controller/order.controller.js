import mongoose from "mongoose";
import Models from "../model/index.js";
import { EMessage, StatusType } from "../service/message.js";
import {
  SendCreate,
  SendError400,
  SendError404,
  SendError500,
  SendSuccess,
} from "../service/respones.js";
import { ValidateOrder } from "../service/validate.js";
import { CheckPriceRef } from "../service/service.js";
export default class OrderController {
  static async getAll(req, res) {
    try {
      const order = await Models.Order.find({ is_Active: true });
      return SendSuccess(res, "Get All Order Success", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get All Order", error);
    }
  }
  static async getOne(req, res) {
    try {
      const orderId = req.params.orderId;
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return SendError404(res, "Not Found Order ID");
      }
      const order = await Models.Order.findOne({
        _id: orderId,
        is_Active: true,
      }).populate({
        path: "userId partsId",
        select:
          "firstName lastName phoneNumber profile createdAt updatedAt name detail price image createdAt updatedAt",
      });
      return SendSuccess(res, "Get One Order Success", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get One Order", error);
    }
  }
  static async getStatusAwait(req, res) {
    try {
      const orderId = req.params.orderId;
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return SendError404(res, "Not Found Order ID");
      }
      const order = await Models.Order.findOne({
        _id: orderId,
        is_Active: true,
        status: StatusType.await,
      }).populate({
        path: "userId partsId",
        select:
          "firstName lastName phoneNumber profile createdAt updatedAt name detail price image createdAt updatedAt",
      });
      return SendSuccess(res, "Get Status Await Order Success", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get Status Await Order", error);
    }
  }
  static async getStatusPadding(req, res) {
    try {
      const orderId = req.params.orderId;
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return SendError404(res, "Not Found Order ID");
      }
      const order = await Models.Order.findOne({
        _id: orderId,
        is_Active: true,
        status: StatusType.padding,
      }).populate({
        path: "userId partsId",
        select:
          "firstName lastName phoneNumber profile createdAt updatedAt name detail price image createdAt updatedAt",
      });
      return SendSuccess(res, "Get Status Order Padding Success", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get Status Order Padding Order", error);
    }
  }
  static async getStatusSuccess(req, res) {
    try {
      const orderId = req.params.orderId;
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return SendError404(res, "Not Found Order ID");
      }
      const order = await Models.Order.findOne({
        _id: orderId,
        is_Active: true,
        status: StatusType.success,
      }).populate({
        path: "userId partsId",
        select:
          "firstName lastName phoneNumber profile createdAt updatedAt name detail price image createdAt updatedAt",
      });
      return SendSuccess(res, "Get Status Success Order", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get Status Success Order", error);
    }
  }
  static async getStatusCancel(req, res) {
    try {
      const orderId = req.params.orderId;
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return SendError404(res, "Not Found Order ID");
      }
      const order = await Models.Order.findOne({
        _id: orderId,
        is_Active: true,
        status: StatusType.cancel,
      }).populate({
        path: "userId partsId",
        select:
          "firstName lastName phoneNumber profile createdAt updatedAt name detail price image createdAt updatedAt",
      });
      return SendSuccess(res, "Get Status Order Cancel Success", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get Status Order Cancel", error);
    }
  }
  static async insert(req, res) {
    try {
      const validate = ValidateOrder(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { userId, partsId, priceTotal } = req.body;
      if (
        !mongoose.Types.ObjectId.isValid(userId) ||
        !mongoose.Types.ObjectId.isValid(partsId)
      ) {
        return SendError404(res, "Not Founde UserId Or PartsId");
      }

      let parts = await CheckPriceRef(partsId, priceTotal);
      if (!parts) {
        return SendError404(res, "Error Not Match priceTotal");
      }
      const order = await Models.Order.create({
        userId,
        partsId,
        priceTotal,
      });
      return SendCreate(res, "Insert Order Success", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Insert Order", error);
    }
  }
  static async updateStatusPadding(req, res) {
    try {
      const orderId = req.params.orderId;
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return SendError404(res, "Not Found Order ID");
      }
      const order = await Models.Order.findByIdAndUpdate(
        orderId,
        {
          status: StatusType.padding,
        },
        { new: true }
      );
      return SendSuccess(res, "Update Status Padding Success", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Update Status Padding", error);
    }
  }
  static async updateStatusSuccess(req, res) {
    try {
      const orderId = req.params.orderId;
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return SendError404(res, "Not Found Order ID");
      }
      const order = await Models.Order.findByIdAndUpdate(
        orderId,
        {
          status: StatusType.success,
        },
        { new: true }
      );
      return SendSuccess(res, "Update Status Success Success", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Update Status Success", error);
    }
  }
  static async updateStatusCancel(req, res) {
    try {
      const orderId = req.params.orderId;
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return SendError404(res, "Not Found Order ID");
      }
      const order = await Models.Order.findByIdAndUpdate(
        orderId,
        {
          status: StatusType.cancel,
        },
        { new: true }
      );
      return SendSuccess(res, "Update Status Cancel Success", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Update Status Cancel", error);
    }
  }
  static async deleteOrder(req, res) {
    try {
      const orderId = req.params.orderId;
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return SendError404(res, "Not Found Order ID");
      }
      const order = await Models.Order.findByIdAndDelete(orderId);
      return SendSuccess(res, "Delete Order Success", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Delete Order", error);
    }
  }
}
