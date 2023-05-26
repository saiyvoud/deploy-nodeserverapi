import Jimp from "jimp";
import fs from "fs";
import sharp from "sharp";


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
  return (
    new Promise() <
    boolean >
    ((resolve, rejects) => {
      try {
        fs.unlink(`${__dirname}/../../assets/images/${imgName}`, (error) => {
          if (!error) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      } catch (error) {
        resolve(false);
      }
    })
  );
};

// export const uploadImageMulti = (imgBase64) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const base64Data = imgBase64.replace(
//         /^data:image\/(png|jpeg|jpg|webp);base64,/,
//         ""
//       );
//       const imgBuffer = Buffer.from(base64Data, "base64");
//       const imgName = `IMG-${Date.now()}.jpg`;
//       const imgPath = `${__dirname}/../../assets/images/${imgName}`;

//       // Convert image to JPEG format using sharp
//       const jpegBuffer = await sharp(imgBuffer).jpeg().toBuffer();

//       const image = await Jimp.read(jpegBuffer);
//       if (!image) {
//         reject(new Error("upload Image Faild"));
//       }
//       image.write(imgPath);
//       resolve(imgName);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };
