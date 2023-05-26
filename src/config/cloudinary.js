import cloudinary from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME,
} from "./globalKey.js";
import { UploadImageToServer,removeImage } from "../service/uploadImageServer.js";
import e from "express";

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const UploadImage = async (image, oldImage) => {
  try {
    ///--------------------- image to server -------------
    if (!image) return "";
    if (oldImage) {
      const spliturl = oldImage.split("/");
      const img_id = spliturl[spliturl.length - 1];
      const removed = await removeImage(img_id);
      console.log("remove image", removed);
    }
    const imgName = await UploadImageToServer(image);
   
    return imgName;

    ///--------------------- cloudinary -------------
    // if (!image) return "";
    // if (oldImage) {
    //   const spliturl = oldImage.split("/");
    //   const img_id = spliturl[spliturl.length - 1].split(".")[0];
    //   await cloudinary.uploader.destroy(img_id);
    // }
    // const res_upload = await cloudinary.uploader.upload(image, null, {
    //   public_id: `${Date.now()}`,
    //   resource_type: "auto",
    // });
    // return res_upload.url;
  } catch (error) {
    console.log(error);
    return "";
  }
};
export const UploadImageMulti = async (image) => {
  try {
    ///--------------------- image to server -------------
    if (!image) return "";
    // if (oldImage) {
    //   const spliturl = oldImage.split("/");
    //   const img_id = spliturl[spliturl.length - 1];
    //   const removed = await removeImage(img_id);
    //   console.log("remove image", removed);
    // }
    const imgName = await UploadImageToServer(image);
    console.log("imageName", imgName);
    return imgName;

    ///--------------------- cloudinary -------------
    // if (!image) return "";
    // if (oldImage) {
    //   const spliturl = oldImage.split("/");
    //   const img_id = spliturl[spliturl.length - 1].split(".")[0];
    //   await cloudinary.uploader.destroy(img_id);
    // }
    // const res_upload = await cloudinary.uploader.upload(image, null, {
    //   public_id: `${Date.now()}`,
    //   resource_type: "auto",
    // });
    // return res_upload.url;
  } catch (error) {
    console.log(`======>${error}`);
    return "";
  }
};
// export const MultiImage = (image) => {
//   try {
//     const imageList = [];
//     if (Array.isArray(image)) {
//       for (let a = 0; a < image.length; a++) {
//         imageList.push(image[a]);
//       }
//     } else {
//       imageList.push(image);
//     }
//     callbackFileUpload(imageList,0,)
//   } catch (error) {}
// };
// function callbackFileUpload(imageList, index, savePaths = [], success = null) {
//   const self = this;
//   if (imageList.length > index) {
//     UploadImage(imageList[a]);
//   }
// }
export default UploadImage;
