import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    profile: {
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
userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next();
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next();
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model("user", userSchema);
export default User;
