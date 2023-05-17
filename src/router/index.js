import express from "express";
import AuthController from "../controller/auth.controller.js";
import BannerController from "../controller/banner.controller.js";
import OrderController from "../controller/order.controller.js";
import PartsController from "../controller/parts.controller.js";
import VehicleController from "../controller/vehicle.controller.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();
// ------- auth ------
router.get("/user/getOne/:userId",auth, AuthController.getProfile);
router.get("/user/getAll", auth, AuthController.getAll);
router.post("/user/register", AuthController.register);
router.post("/user/login", AuthController.login);
router.put("/user/updateUser/:userId",auth, AuthController.updateUser);
router.put("/user/updateProfile/:userId",auth, AuthController.updateUserProfile);
router.put("/user/deleteUser/:userId",auth, AuthController.deleteUser);
// ------- Banner ------
router.post("/banner/insert",auth,BannerController.insert);
router.get("/banner/getAll",auth,BannerController.getAll);
router.get("/banner/getOne/:bannerId",auth,BannerController.getOne);
router.put("/banner/updateBanner/:bannerId",auth,BannerController.updateBanner);
router.put("/banner/updateBannerImage/:bannerId",auth,BannerController.updateBannerImage);
router.put("/banner/deleteBannerStatus/:bannerId",auth,BannerController.deleteBannerStatus);
router.delete("/banner/deleteBanner/:bannerId",auth,BannerController.deleteBanner)
// ------- Vehicle ------
router.post("/vehicle/insert",auth,VehicleController.insert);
router.get("/vehicle/getAll",auth,VehicleController.getAll);
router.get("/vehicle/getOne/:vehicleId",auth,VehicleController.getOne);
router.put("/vehicle/updateVehicle/:vehicleId",auth,VehicleController.updateVehicle);
router.put("/vehicle/updateVehicleImage/:vehicleId",auth,VehicleController.updateVehicleImage);
router.put("/vehicle/deleteVehicleStatus/:vehicleId",auth,VehicleController.deleteVehicleStatus);
router.delete("/vehicle/deleteVehicle/:vehicleId",auth,VehicleController.deleteVehicle)
// --------- Parts -------
router.post("/parts/insert",auth,PartsController.insert);
router.get("/parts/getAll",auth, PartsController.getAll);
router.get("/parts/getOne/:partsId",auth,PartsController.getOne);
router.put("/parts/updateParts/:partsId",auth,PartsController.updateParts);
router.put("/parts/updatePartsImage/:partsId",auth,PartsController.updatePartsImage);
// -------- Order ------------
router.post("/order/insert",auth,OrderController.insert);
router.get("/order/getAll",auth,OrderController.getAll);
router.get("/order/getOne",auth,OrderController.getOne);
router.get("/order/getStatusAwait",auth,OrderController.getStatusAwait);
router.get("/order/getStatusPadding",auth,OrderController.getStatusPadding);
router.get("/order/getStatusSuccess",auth,OrderController.getStatusSuccess);
router.put("/order/getStatusCancel",auth,OrderController.getStatusCancel);
router.put("/order/updateStatusPadding/:orderId",auth,OrderController.updateStatusPadding);
router.put("/order/updateStatusSuccess/:orderId",auth,OrderController.updateStatusSuccess);
router.put("/order/updateStatusCancel/:orderId",auth,OrderController.updateStatusCancel);
router.delete("/order/delete/:orderId",auth,OrderController.deleteOrder);
export default router;
