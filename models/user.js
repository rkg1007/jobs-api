import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide user name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide user email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide user password"],
    minlength: 6,
    maxlength: 12,
  },
});

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.generateJwtToken = function () {
  return jwt.sign(
    { sub: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

UserSchema.methods.comparePassword = async function (password) {
  const passwordHash = await bcrypt.hash(password, 10);
  return this.password === passwordHash;
};

export default mongoose.model("User", UserSchema);