import express  from "express";
import cors from "cors";
import "./config/db.js";
import { PORT } from "./config/globalKey.js";
const app = express();
import bodyParser from "body-parser";
import router from "./router/index.js";
app.use(cors());  
app.use(bodyParser.json({extended: true,limit: "500mb", parameterLimit: 500}));
app.use(bodyParser.urlencoded({extended: true,limit: "500mb", parameterLimit: 500}))
app.use("/api/v1.0", router)
app.listen(PORT, () => {
  console.log(`Server is runing on http://localhost:${PORT}`);
});
