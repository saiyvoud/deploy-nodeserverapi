import mongoose from "mongoose";
import { URL_DATABASE_DEV, URL_DATABASE_PRODUCT } from "./globalKey.js";

mongoose
  .connect(URL_DATABASE_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected Database`);
  })
  .catch((error) => {
    console.log(`Faild Connect Database ${error}`);
  });
