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
        /^data:image\/(png|jpeg|jpg|webp);base64,"", " "/
      );

      const imageName = `IMG-${Date.now()}.jpeg`;
      const imagePath = `${__dirname}/../../assets/images/${imageName}`;
      const imageBuffer = Buffer.from(base64Data, "base64");
      console.log(imagePath);
      // jimp
      //   .read(base64Data)
      //   .then((image) => {
      //     const hash = `IMG-${image.hash()}.jpeg`;
      //     image.write(`${__dirname}/../../assets/images/${hash}`);
      //     resolve({ success: true, hash: hash });
      //   })
      //   .catch((err) => {
      //     reject({ err: err });
      //   });
      const jpegBuffer = await sharp(imageBuffer).resize(300, null)
      .max()
      .withMetadata()
      .toBuffer();

      const image = await jimp.read(jpegBuffer);
      // if (!image) {
      //   reject("Upload Image Faild");
      // }

      image.write(imagePath);

      resolve(imageName);
    } catch (error) {
      reject(error);
    }
  });
};

export const uploadImageServer = (imgBase64) => {
  return new Promise(async (resolve, reject) => {
    try {
      const base64Data = imgBase64.replace(
        /^data:image\/(png|jpeg|jpg|webp);base64,/,
        ""
      );
      const imgBuffer = Buffer.from(base64Data, "base64");
      const imgName = `IMG-${Date.now()}.jpg`;
      const imgPath = `${__dirname}/../../assets/images/${imgName}`;
      // Convert image to JPEG format using sharp
      const jpegBuffer = await sharp(imgBuffer).jpeg().toBuffer();
      const image = await Jimp.read(jpegBuffer);
      if (!image) {
        reject(new Error(EMessage.uploadImageFail));
      }
      image.write(imgPath);
      resolve(imgName);
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
