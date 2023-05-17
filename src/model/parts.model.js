import mongoose from "mongoose";
const partsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicle",
      require: true,
    },
    detail: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      default: "",
    },
    is_Active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const Parts = mongoose.model("parts", partsSchema);
export default Parts;
