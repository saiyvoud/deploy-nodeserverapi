import jimp from "jimp";
import fs from "fs";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const UploadImageToServer = (imagebase64) => {
  return new Promise(async (resolve, reject) => {
    try {
      const base64Data = imagebase64.replace(
        /^data:image\/(png|jpeg|jpg|webp);base64,/," "
      );
      const imageName = `IMG-${Date.now()}.jpeg`;
      const imagePath = `${__dirname}/../../assets/images/${imageName}`;
      const imageBuffer = Buffer.from(base64Data, "base64");
      const jpegBuffer = await sharp(imageBuffer).jpeg().toBuffer()
      const image = await jimp.read(jpegBuffer);
      if (!image) {
        reject("Upload Image Faild");
      }
      image.write(imagePath);
      resolve(imageName);
    } catch (error) {
      reject(error);
    }
  });
};

export const removeImage = (imgName) => {
  return new Promise((resolve, rejects) => {
    try {
      
      fs.unlink(`${__dirname}/../../assets/images/${imgName}`, (error) => {
        if (error) {
        //  console.log(error);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    } catch (error) {
      resolve(false);
    }
  });
};
